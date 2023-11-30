import Button from "@stryberventures/gaia-react-native.button"
import Form from "@stryberventures/gaia-react-native.form"
import Input from "@stryberventures/gaia-react-native.input"
import PasswordInput from "@stryberventures/gaia-react-native.password-input"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text as IgniteText } from "app/components"
import { signUpService } from "app/services/api/auth/auth"
import { spacing } from "app/theme"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { Alert, TextStyle, View, ViewStyle } from "react-native"
import {
  SignUpValues,
  signUpPasswordHintMessage,
  signUpValidationSchema,
} from "./helpers/validation"

export const SignUpContent: FC<any> = observer(function SignUpContent(_props) {
  const [disabled, setDisabled] = useState(true)
  const styles = useStyles()

  const handleSignUp = async (values: SignUpValues) => {
    const result = await signUpService({
      lastName: values.lastName,
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
    <View style={styles.container}>
      <View style={styles.sloganContainer}>
        <IgniteText testID="login-heading" tx="signUp.slogan" preset="heading" style={$signIn} />
      </View>
      <View style={styles.formView}>
        <Form
          validationSchema={signUpValidationSchema}
          onChange={(_, { isValid }) => setDisabled(!isValid)}
          onSubmit={handleSignUp}
          initialValues={{
            lastName: "Lev",
            email: "vladyslav.levchenko@stryber.com",
            password: "Password12345!",
            repeatPassword: "Password12345!",
          }}
        >
          <View style={styles.formContent}>
            <View style={$fieldsContainer}>
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
                name="email"
                label="Your email"
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
            <Button type="submit" style={styles.createAccountButton} disabled={disabled}>
              Create Account
            </Button>
          </View>
        </Form>
      </View>
    </View>
  )
})

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
  textAlign: "left",
}

const $fieldsContainer: ViewStyle = {
  gap: 10,
}

const useStyles = createUseStyles((theme) => ({
  container: {
    paddingHorizontal: theme.spacing["24"],
    paddingTop: theme.spacing["8"],
  },
  inputRepeatPassword: {
    marginTop: 52,
  },
  createAccountButton: {
    marginTop: theme.spacing["32"],
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
  sloganContainer: {
    width: 250,
  },
}))
