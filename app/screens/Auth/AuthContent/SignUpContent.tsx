import { useBottomSheetInternal } from "@gorhom/bottom-sheet"
import Button from "@stryberventures/gaia-react-native.button"
import Form, { IFormActions } from "@stryberventures/gaia-react-native.form"
import Input from "@stryberventures/gaia-react-native.input"
import PasswordInput from "@stryberventures/gaia-react-native.password-input"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text } from "app/components"
import { signUpService } from "app/services/api/auth/auth"
import { spacing } from "app/theme"
import React, { FC, useState } from "react"
import { ActivityIndicator, Alert, TextStyle, View, ViewStyle } from "react-native"
import { AuthPolicies } from "../AuthPolicies"
import {
  SignUpValues,
  signUpPasswordHintMessage,
  signUpValidationSchema,
} from "../helpers/validation"
import { getUserNameFromEmail } from "../utils/getUserNameFromEmail"

type SignUpProps = {
  onClose: () => void
}

export const SignUpContent: FC<SignUpProps> = ({ onClose }) => {
  const [disabled, setDisabled] = useState(true)
  const [isLoading, setIsSignUpLoading] = useState(false)
  const styles = useStyles()
  const { shouldHandleKeyboardEvents } = useBottomSheetInternal()

  React.useEffect(() => {
    return () => {
      // Reset the flag on unmount
      shouldHandleKeyboardEvents.value = false
    }
  }, [shouldHandleKeyboardEvents])

  const handleSignUp: (formData: any, formActions: IFormActions) => void = async (
    values: SignUpValues,
    { reset },
  ) => {
    setIsSignUpLoading(true)
    const result = await signUpService({
      lastName: getUserNameFromEmail(values.email),
      username: values.email,
      password: values.password,
    })

    setIsSignUpLoading(false)

    if (result.kind === "ok") {
      reset()
      Alert.alert("Success", "You have successfully signed up, check your email box to verify it", [
        {
          text: "OK",
          onPress: onClose,
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
        <Text testID="login-heading" tx="signUp.slogan" preset="heading" style={$signIn} />
      </View>
      <View style={styles.formView}>
        <Form
          validationSchema={signUpValidationSchema}
          onChange={(_, { isValid }) => setDisabled(!isValid)}
          onSubmit={handleSignUp}
        >
          <View style={styles.formContent}>
            <View style={$fieldsContainer}>
              <Input
                name="email"
                label="Your email"
                placeholder="Type your Email"
                autoComplete="email"
                keyboardType="email-address"
                textContentType="emailAddress"
                hintStyle={styles.hintsStyles}
                errorStyle={styles.hintsStyles}
                onFocus={() => {
                  shouldHandleKeyboardEvents.value = true
                }}
                onBlur={() => {
                  shouldHandleKeyboardEvents.value = false
                }}
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
                onFocus={() => {
                  shouldHandleKeyboardEvents.value = true
                }}
                onBlur={() => {
                  shouldHandleKeyboardEvents.value = false
                }}
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
                ...styles.createAccountButton,
                ...(isLoading || disabled
                  ? {}
                  : {
                      backgroundColor: "#333865",
                      borderColor: "#333865",
                    }),
              }}
              disabled={isLoading || disabled}
            >
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <Text weight="bold" style={styles.signUpButtonText} tx="signUp.signUp" />
              )}
            </Button>
          </View>
        </Form>
      </View>
      <AuthPolicies />
    </View>
  )
}

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
    marginTop: theme.spacing["24"],
  },
  hintsStyles: {
    position: "absolute",
    width: "100%",
  },
  sloganContainer: {
    width: 250,
  },
  signUpButtonText: {
    color: "#fff",
  },
}))
