import { useBottomSheetInternal } from "@gorhom/bottom-sheet"
import Button from "@stryberventures/gaia-react-native.button"
import Form, { IFormRef } from "@stryberventures/gaia-react-native.form"
import Input from "@stryberventures/gaia-react-native.input"
import TextLink from "@stryberventures/gaia-react-native.text-link"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { passwordRestoreService } from "app/services/api/auth/auth"
import React, { FC, useRef, useState } from "react"
import { ActivityIndicator, Alert, TextStyle, View } from "react-native"
import { Text } from "../../../components"
import { spacing } from "../../../theme"
import { forgotPasswordValidationSchema } from "../helpers/validation"

type ForgotPasswordProps = {
  setContentKey: (key: any) => () => void
}

export const ForgotPasswordContent: FC<ForgotPasswordProps> = ({ setContentKey }) => {
  const formRef = useRef<IFormRef>(null)
  const styles = useStyles()
  const [disabled, setDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { shouldHandleKeyboardEvents } = useBottomSheetInternal()

  React.useEffect(() => {
    return () => {
      // Reset the flag on unmount
      shouldHandleKeyboardEvents.value = false
    }
  }, [shouldHandleKeyboardEvents])

  async function sendResetLing(values: { email: string }) {
    setIsLoading(true)
    const result = await passwordRestoreService({ username: values.email })
    if (result.kind !== "ok") {
      Alert.alert("Error", result.kind)
    } else {
      Alert.alert("Success", "Check your email")
      formRef.current?.reset()
    }
    setIsLoading(false)
  }

  return (
    <View style={styles.container}>
      <Text testID="login-heading" tx="forgotPassword.slogan" preset="heading" style={$signIn} />
      <Form
        validationSchema={forgotPasswordValidationSchema}
        onChange={(_, { isValid }) => setDisabled(!isValid)}
        onSubmit={sendResetLing}
        ref={formRef}
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
          </View>
          <Button
            type="submit"
            style={{
              ...styles.button,
              ...(disabled
                ? {}
                : {
                    backgroundColor: "#333865",
                    borderColor: "#333865",
                  }),
            }}
            disabled={disabled}
          >
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Text tx="forgotPassword.hint" weight="bold" style={styles.buttonText} />
            )}
          </Button>
          <TextLink style={styles.forgotPassword} onPress={setContentKey("login")}>
            <Text weight="bold" style={styles.forgotPasswordText} tx="common.backToLogin" />
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
    marginTop: theme.spacing["24"],
  },
  buttonText: {
    color: "#fff",
  },
  forgotPassword: {
    marginTop: theme.spacing["16"],
    alignSelf: "center",
  },
  hintsStyles: {
    position: "absolute",
    top: -10,
    width: "100%",
  },
  formContent: {
    justifyContent: "space-between",
    marginTop: theme.spacing["24"],
  },
  inputContainer: {
    gap: 12,
  },
  forgotPasswordText: {
    color: "#333865",
    fontWeight: "bold",
    lineHeight: 24,
  },
}))
