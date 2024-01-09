import { useBottomSheetInternal } from "@gorhom/bottom-sheet"
import Button from "@stryberventures/gaia-react-native.button"
import Form from "@stryberventures/gaia-react-native.form"
import Input from "@stryberventures/gaia-react-native.input"
import PasswordInput from "@stryberventures/gaia-react-native.password-input"
import TextLink from "@stryberventures/gaia-react-native.text-link"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { loginService } from "app/services/api/auth/auth"
import React, { FC, useState } from "react"
import { ActivityIndicator, TextStyle, View } from "react-native"
import { Text } from "../../../components"
import { useStores } from "../../../models"
import { spacing } from "../../../theme"
import { loginValidationSchema } from "../helpers/validation"
import { getButtonStyle } from "../helpers/buttonStyles"

type LoginProps = {
  setContentKey: (key: any) => () => void
}

export const LoginContent: FC<LoginProps> = ({ setContentKey }) => {
  const styles = useStyles()
  const [disabled, setDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const { shouldHandleKeyboardEvents } = useBottomSheetInternal()

  const {
    authenticationStore: { setAuthToken, setAuthEmail, distributeAuthToken },
  } = useStores()

  React.useEffect(() => {
    return () => {
      // Reset the flag on unmount
      shouldHandleKeyboardEvents.value = false
    }
  }, [shouldHandleKeyboardEvents])

  async function login(values: { email: string; password: string }) {
    if (isLoading || disabled) {
      return
    }
    setIsLoading(true)
    const result = await loginService({ username: values.email, password: values.password })
    setIsLoading(false)
    if (result.kind !== "ok") {
      if (result.kind === "bad-data") {
        setError("Invalid email or password")
      }
      return
    }

    const token = result.token
    setAuthToken(token)
    setAuthEmail(values.email)
    distributeAuthToken(token)
  }

  return (
    <View style={styles.container}>
      <Text testID="login-heading" tx="signIn.slogan" preset="heading" style={$signIn} />
      <Form
        validationSchema={loginValidationSchema}
        onChange={(_, { isValid }) => {
          setDisabled(!isValid)
          setError(undefined)
        }}
        onSubmit={login}
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
              onFocus={() => {
                shouldHandleKeyboardEvents.value = true
              }}
              onBlur={() => {
                shouldHandleKeyboardEvents.value = false
              }}
            />
            <PasswordInput
              name="password"
              label="Enter password"
              placeholder="Insert your password"
              autoComplete="password"
              textContentType="password"
              errorStyle={styles.hintsStyles}
              hintStyle={styles.hintsStyles}
              error={error}
              onFocus={() => {
                shouldHandleKeyboardEvents.value = true
              }}
              onBlur={() => {
                shouldHandleKeyboardEvents.value = false
              }}
            />
          </View>
          <Button
            type="submit"
            style={{ ...styles.button, ...getButtonStyle(disabled) }}
            disabled={disabled}
          >
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Text weight="bold" style={styles.loginButtonText} tx="common.login" />
            )}
          </Button>
          <TextLink style={styles.forgotPassword} onPress={setContentKey("restorePassword")}>
            <Text weight="bold" style={styles.forgotPasswordText} tx="signIn.forgotPassword" />
          </TextLink>
        </View>
      </Form>
    </View>
  )
}

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
}

const useStyles = createUseStyles((theme) => ({
  container: {
    paddingTop: theme.spacing["24"],
    paddingHorizontal: theme.spacing["24"],
  },
  button: {
    marginTop: theme.spacing["32"],
    minHeight: 59,
  },
  loginButtonText: {
    color: "#fff",
  },
  forgotPassword: {
    marginTop: theme.spacing["16"],
    alignSelf: "center",
  },
  forgotPasswordText: {
    color: "#333865",
    fontWeight: "bold",
    lineHeight: 24,
  },
  hintsStyles: {
    position: "absolute",
    top: -20,
    width: "100%",
  },
  formContent: {
    justifyContent: "space-between",
    marginTop: theme.spacing["24"],
  },
  inputContainer: {
    gap: 15,
  },
}))
