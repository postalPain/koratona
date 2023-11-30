import Button from "@stryberventures/gaia-react-native.button"
import Form from "@stryberventures/gaia-react-native.form"
import Input from "@stryberventures/gaia-react-native.input"
import PasswordInput from "@stryberventures/gaia-react-native.password-input"
import TextLink from "@stryberventures/gaia-react-native.text-link"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { loginService } from "app/services/api/auth/auth"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { Alert, TextStyle, View, ViewStyle } from "react-native"
import * as yup from "yup"
import { Text as IgniteText, Screen } from "../../components"
import { useStores } from "../../models"
import { AppStackScreenProps } from "../../navigators"
import { colors, spacing } from "../../theme"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const { navigation } = _props
  const styles = useStyles()
  const [disabled, setDisabled] = useState(true)

  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { setAuthToken, distributeAuthToken },
  } = useStores()

  async function login(values: { email: string; password: string }) {
    setAttemptsCount((prev) => prev + 1)

    const result = await loginService({ username: values.email, password: values.password })
    if (result.kind !== "ok") {
      Alert.alert("Error", result.kind)
      return
    }

    const token = result.token
    setAuthToken(token)
    distributeAuthToken(token)
  }

  return (
    <Screen
      preset="scroll"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <IgniteText testID="login-heading" tx="loginScreen.signIn" preset="heading" style={$signIn} />
      {attemptsCount > 2 && (
        <IgniteText tx="loginScreen.hint" size="sm" weight="light" style={$hint} />
      )}

      <View style={styles.formView}>
        <Form
          validationSchema={validationSchema}
          onChange={(_, { isValid }) => setDisabled(!isValid)}
          onSubmit={login}
          initialValues={{
            email: "vladyslav.levchenko+us1@stryber.com",
            password: "strictPass12345",
          }}
        >
          <View style={styles.formContent}>
            <View>
              <Input
                name="email"
                label="Email"
                placeholder="olivia@example.com"
                autoComplete="email"
                keyboardType="email-address"
                textContentType="emailAddress"
                errorStyle={styles.hintsStyles}
                hintStyle={styles.hintsStyles}
              />
              <PasswordInput
                name="password"
                label="Password"
                placeholder="Insert your password"
                autoComplete="password"
                textContentType="password"
                style={styles.inputPassword}
                errorStyle={styles.hintsStyles}
                hintStyle={styles.hintsStyles}
              />
            </View>
            <View>
              <Button type="submit" shape="circle" style={styles.button} disabled={disabled}>
                Login
              </Button>
              <TextLink
                style={styles.forgotPassword}
                onPress={() => navigation.push("RestorePassword")}
              >
                Forgot Password?
              </TextLink>
              <TextLink style={styles.newUser} onPress={() => navigation.push("SignUp")}>
                New user? Register here
              </TextLink>
              <TextLink
                style={styles.newUser}
                onPress={() => navigation.navigate('Welcome')}
              >
                Go to welcome
              </TextLink>
            </View>
          </View>
        </Form>
      </View>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
}

const useStyles = createUseStyles((theme) => ({
  scrollContainer: {
    minHeight: "100%",
    paddingHorizontal: theme.spacing["24"],
  },
  viewContainer: {
    minHeight: "100%",
  },
  logoWrapper: {
    alignItems: "center",
    marginTop: theme.spacing["48"],
    marginBottom: theme.spacing["64"],
  },
  title: {
    marginBottom: theme.spacing["32"],
  },
  inputPassword: {
    marginTop: theme.spacing["48"],
  },
  button: {
    marginTop: theme.spacing["48"],
  },
  checkbox: {
    marginTop: theme.spacing["48"],
  },
  forgotPassword: {
    marginTop: theme.spacing["16"],
    alignSelf: "center",
  },
  newUser: {
    marginTop: theme.spacing["24"],
    marginBottom: theme.spacing["8"],
    alignSelf: "center",
  },
  hintsStyles: {
    position: "absolute",
    width: "100%",
  },
  formView: {
    flexGrow: 1,
  },
  formContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
}))

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
})
