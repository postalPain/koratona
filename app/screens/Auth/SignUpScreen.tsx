import React, { FC, useState } from "react"
import { Alert, TextStyle, View, ViewStyle } from "react-native"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import Text from "@stryberventures/gaia-react-native.text"
import Input from "@stryberventures/gaia-react-native.input"
import PasswordInput from "@stryberventures/gaia-react-native.password-input"
import Form from "@stryberventures/gaia-react-native.form"
import Button from "@stryberventures/gaia-react-native.button"
import { Screen, Text as IgniteText } from "app/components"
import { AppStackScreenProps } from "app/navigators"
import { observer } from "mobx-react-lite"
import { spacing } from "app/theme"
import { signUpService } from "app/services/api/auth/auth"
import {
  SignUpValues,
  signUpPasswordHintMessage,
  signUpValidationSchema,
} from "./helpers/validation"
import TextLink from "@stryberventures/gaia-react-native.text-link"

interface SignUpScreenProps extends AppStackScreenProps<"SignUp"> {}

export const SignUpScreen: FC<SignUpScreenProps> = observer(function SignUpScreen(_props) {
  const [disabled, setDisabled] = useState(true)
  const styles = useStyles()

  const handleSignUp = async (values: SignUpValues) => {
    const result = await signUpService({
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      username: values.email,
      password: values.password,
    })
    if (result.kind === "ok") {
      Alert.alert("Success", "You have successfully signed up, check your email box to verify it", [
        {
          text: "OK",
          onPress: () => {
            _props.navigation.navigate("Login")
          },
        },
      ])
    } else {
      if (result.kind === "conflict") {
        Alert.alert("Error", "User with this email already exists")
      } else {
        Alert.alert("Error", result.kind)
      }
    }
  }

  return (
    <Screen
      style={$root}
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <View>
        <IgniteText
          testID="login-heading"
          text="Sign Up"
          preset="heading"
          style={$signIn}
        />
        <Text variant="body2" color="secondary" style={styles.description}>
          Add your email and create a secure password, following the criteria:
        </Text>
        <View style={styles.formView}>
          <Form
            validationSchema={signUpValidationSchema}
            onChange={(_, { isValid }) => setDisabled(!isValid)}
            onSubmit={handleSignUp}
            initialValues={{
              firstName: "Vlev",
              lastName: "Lev",
              phone: "12345678655",
              email: "vladyslav.levchenko@stryber.com",
              password: "Password12345!",
              repeatPassword: "Password12345!",
            }}
          >
            <View style={styles.formContent}>
              <View style={$fieldsContainer}>
                <Input
                  name="firstName"
                  label="First Name"
                  placeholder="Type your First Name"
                  autoComplete="name"
                  textContentType="givenName"
                  hintStyle={styles.hintsStyles}
                  errorStyle={styles.hintsStyles}
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  placeholder="Type your Last Name"
                  autoComplete="name"
                  textContentType="familyName"
                  hintStyle={styles.hintsStyles}
                  errorStyle={styles.hintsStyles}
                />
                <Input
                  name="phone"
                  label="Phone Number"
                  mask="+X(XXX) XX-XX-XXX"
                  placeholder="+X(XXX) XX-XX-XXX"
                  autoComplete="tel"
                  textContentType="telephoneNumber"
                  keyboardType="phone-pad"
                  hintStyle={styles.hintsStyles}
                  errorStyle={styles.hintsStyles}
                />
                <Input
                  name="email"
                  label="Email"
                  placeholder="Type your Email"
                  autoComplete="email"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  hintStyle={styles.hintsStyles}
                  errorStyle={styles.hintsStyles}
                />
                <PasswordInput
                  name="password"
                  label="Create Password"
                  placeholder="Create Password"
                  autoComplete="password-new"
                  textContentType="newPassword"
                  hint={signUpPasswordHintMessage}
                  hintStyle={styles.hintsStyles}
                  errorStyle={styles.hintsStyles}
                />
                <PasswordInput
                  name="repeatPassword"
                  label="Repeat Password"
                  placeholder="Repeat Password"
                  autoComplete="password-new"
                  textContentType="newPassword"
                  hintStyle={styles.hintsStyles}
                  errorStyle={styles.hintsStyles}
                  style={styles.inputRepeatPassword}
                />
              </View>
              <View>
                <Button
                  type="submit"
                  shape="circle"
                  style={styles.createAccountButton}
                  disabled={disabled}
                >
                  Create Account
                </Button>
                <TextLink
                  style={styles.newUser}
                  onPress={() => _props.navigation.navigate("Login")}
                >
                  Already have account? Login here
                </TextLink>
              </View>
            </View>
          </Form>
        </View>
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
}

const $fieldsContainer: ViewStyle = {
  gap: 10,
}

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.lg,
  paddingHorizontal: spacing.lg,
}

const useStyles = createUseStyles((theme) => ({
  scrollContainer: {
    minHeight: "100%",
    paddingHorizontal: theme.spacing["12"],
  },
  title: {
    marginBottom: theme.spacing["12"],
  },
  description: {
    marginBottom: theme.spacing["32"],
  },
  inputRepeatPassword: {
    marginTop: theme.spacing["48"],
  },
  createAccountButton: {
    marginTop: theme.spacing["48"],
  },
  loginButton: {
    marginTop: theme.spacing["16"],
  },
  formView: {
    flexGrow: 1,
  },
  formContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  hintsStyles: {
    position: "absolute",
    width: "100%",
  },
  newUser: {
    marginTop: theme.spacing['16'],
    marginBottom: theme.spacing["8"],
    alignSelf: "center",
  },
}))
