import Button from "@stryberventures/gaia-react-native.button"
import Form from "@stryberventures/gaia-react-native.form"
import Input from "@stryberventures/gaia-react-native.input"
import Text from "@stryberventures/gaia-react-native.text"
import TextLink from "@stryberventures/gaia-react-native.text-link"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Screen, Text as IgniteText } from "app/components"
import { AppStackScreenProps } from "app/navigators"
import { passwordRestoreService } from "app/services/api/auth/auth"
import { spacing } from "app/theme"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { Alert, TextStyle, View, ViewStyle } from "react-native"
import * as yup from "yup"

interface RestorePasswordScreenProps extends AppStackScreenProps<"RestorePassword"> {}

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
})

export const RestorePasswordScreen: FC<RestorePasswordScreenProps> = observer(
  function RestorePasswordScreen({ navigation }) {
    const [disabled, setDisabled] = useState(true)
    const [isSending, setIsSending] = useState(false)
    const styles = useStyles()

    const handleSendPasswordInstructions = async (values: { email: string }) => {
      setIsSending(true)
      const result = await passwordRestoreService({ username: values.email })
      setIsSending(false)
      if (result.kind === "ok") {
        Alert.alert(
          "Success",
          "We have sent you an email with instructions on how to reset your password",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("Login")
              },
            },
          ],
        )
      } else {
        Alert.alert("Error", result.kind)
      }
    }

    return (
      <Screen
        style={$root}
        preset="auto"
        contentContainerStyle={$screenContentContainer}
        safeAreaEdges={["top", "bottom"]}
      >
        <View style={styles.viewContainer}>
          <IgniteText
            testID="login-heading"
            text="Reset Password"
            preset="heading"
            style={$signIn}
          />
          <Text variant="body2" color="secondary" style={styles.description}>
            Enter the email associated with your account and we’ll send an sms message with
            instructions to reset your password in no time!
          </Text>
          <View style={styles.formView}>
            <Form
              validationSchema={validationSchema}
              onChange={(_, { isValid }) => setDisabled(!isValid)}
              onSubmit={handleSendPasswordInstructions}
            >
              <View style={styles.formContent}>
                <View>
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
                </View>
                <View>
                  <Button
                    type="submit"
                    shape="circle"
                    style={styles.submitButton}
                    disabled={disabled || isSending}
                  >
                    Send password instructions
                  </Button>
                  <Button
                    shape="circle"
                    variant="ghost"
                    style={styles.loginButton}
                    onPress={() => navigation.pop()}
                  >
                    Login
                  </Button>
                  <TextLink style={styles.newUser} onPress={() => navigation.navigate("SignUp")}>
                    New user? Register here
                  </TextLink>
                </View>
              </View>
            </Form>
          </View>
        </View>
      </Screen>
    )
  },
)

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
}

const $root: ViewStyle = {
  flex: 1,
}

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.lg,
  paddingHorizontal: spacing.lg,
}

const useStyles = createUseStyles((theme) => ({
  viewContainer: {
    minHeight: "100%",
  },
  logoWrapper: {
    alignItems: "center",
    marginTop: theme.spacing["48"],
    marginBottom: theme.spacing["64"],
  },
  title: {
    marginBottom: theme.spacing["12"],
  },
  description: {
    marginBottom: theme.spacing["32"],
  },
  submitButton: {
    marginTop: theme.spacing["48"],
  },
  loginButton: {
    marginTop: theme.spacing["16"],
  },
  formView: {
    flexGrow: 1,
  },
  formContent: {
    justifyContent: "space-between",
  },
  newUser: {
    marginTop: theme.spacing["40"],
    marginBottom: theme.spacing["8"],
    alignSelf: "center",
  },
  hintsStyles: {
    position: "absolute",
    width: "100%",
  },
}))
