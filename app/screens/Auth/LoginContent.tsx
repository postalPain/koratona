import Button from "@stryberventures/gaia-react-native.button"
import Form from "@stryberventures/gaia-react-native.form"
import Input from "@stryberventures/gaia-react-native.input"
import PasswordInput from "@stryberventures/gaia-react-native.password-input"
import TextLink from "@stryberventures/gaia-react-native.text-link"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { loginService } from "app/services/api/auth/auth"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { Alert, TextStyle, View } from "react-native"
import * as yup from "yup"
import { Text as IgniteText } from "../../components"
import { useStores } from "../../models"
import { AppStackScreenProps } from "../../navigators"
import { colors, spacing } from "../../theme"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginContent: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
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
    <View style={styles.container}>
      <IgniteText testID="login-heading" tx="signIn.slogan" preset="heading" style={$signIn} />
      {attemptsCount > 2 && (
        <IgniteText tx="loginScreen.hint" size="sm" weight="light" style={$hint} />
      )}
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
          <View style={styles.inputContainer}>
            <Input
              name="email"
              label="Your email"
              placeholder="olivia@example.com"
              autoComplete="email"
              keyboardType="email-address"
              textContentType="emailAddress"
              errorStyle={styles.hintsStyles}
              hintStyle={styles.hintsStyles}
            />
            <PasswordInput
              name="password"
              label="Enter password"
              placeholder="Insert your password"
              autoComplete="password"
              textContentType="password"
              errorStyle={styles.hintsStyles}
              hintStyle={styles.hintsStyles}
            />
          </View>

          <Button type="submit" style={styles.button} disabled={disabled}>
            Login
          </Button>
          <TextLink
            style={styles.forgotPassword}
            textStyle={styles.forgotPasswordText}
            onPress={() => navigation.push("RestorePassword")}
          >
            Reset password
          </TextLink>

          <TextLink onPress={() => navigation.navigate("Welcome")}>Go to welcome</TextLink>
        </View>
      </Form>
    </View>
  )
})

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
}

const useStyles = createUseStyles((theme) => ({
  container: {
    paddingTop: theme.spacing["32"],
    paddingHorizontal: theme.spacing["24"],
  },
  button: {
    marginTop: theme.spacing["24"],
    backgroundColor: "#333865",
    borderColor: "#333865",
  },
  forgotPassword: {
    marginTop: theme.spacing["16"],
    alignSelf: "center",
  },
  forgotPasswordText:{
    color: "#333865",
    fontWeight: "bold",
    lineHeight: 24
  },
  hintsStyles: {
    position: "absolute",
    width: "100%",
  },
  formContent: {
    justifyContent: "space-between",
    marginTop: theme.spacing["24"],
  },
  inputContainer: {
    gap: 12,
  },
}))

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
})
