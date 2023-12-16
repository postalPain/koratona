import Button from "@stryberventures/gaia-react-native.button"
import Form from "@stryberventures/gaia-react-native.form"
import PasswordInput from "@stryberventures/gaia-react-native.password-input"

import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Screen, Text } from "app/components"
import { AppStackScreenProps } from "app/navigators"
import { passwordRestoreService } from "app/services/api/auth/auth"
import { spacing } from "app/theme"
import { useHeader } from "app/utils/useHeader"
import i18n from "i18n-js"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { ActivityIndicator, Alert, View, ViewStyle } from "react-native"
import * as yup from "yup"
import { passwordRegEx, signUpPasswordHintMessage } from "./helpers/validation"

interface RestorePasswordScreenProps extends AppStackScreenProps<"restorePassword"> {}

const validationSchema = yup.object().shape({
  password: yup.string().matches(passwordRegEx, signUpPasswordHintMessage).required(),
  repeatPassword: yup.string().oneOf([yup.ref("password")], "Passwords don't match"),
})

export const RestorePasswordScreen: FC<RestorePasswordScreenProps> = observer(
  function RestorePasswordScreen({ navigation }) {
    const [disabled, setDisabled] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const styles = useStyles()

    useHeader({
      leftIcon: "back",
      onLeftPress: () => navigation.navigate("Welcome"),
    })

    const handleSendPasswordInstructions = async (values: { email: string }) => {
      setIsLoading(true)
      const result = await passwordRestoreService({ username: values.email })
      setIsLoading(false)
      if (result.kind === "ok") {
        Alert.alert(
          "Success",
          "Your password has been successfully changed. Please log in with your new password",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("Welcome")
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
        <View style={styles.titleWrapper}>
          <Text tx="resetPassword.slogan" preset="heading" style={styles.title} />
        </View>
        <View style={styles.formView}>
          <Form
            validationSchema={validationSchema}
            onChange={(_, { isValid }) => setDisabled(!isValid)}
            onSubmit={handleSendPasswordInstructions}
          >
            <View style={styles.formContent}>
              <View style={styles.fieldsContainer}>
                <PasswordInput
                  name="password"
                  label={i18n.t("resetPassword.passwordFieldLabel")}
                  placeholder="Create Password"
                  autoComplete="password-new"
                  textContentType="newPassword"
                />
                <PasswordInput
                  name="repeatPassword"
                  label="Repeat Password"
                  placeholder="Repeat Password"
                  autoComplete="password-new"
                  textContentType="newPassword"
                />
              </View>
              <View>
                <Button
                  type="submit"
                  style={{
                    ...styles.submitButton,
                    ...(isLoading || disabled
                      ? {}
                      : {
                          backgroundColor: "#333865",
                          borderColor: "#333865",
                        }),
                  }}
                  disabled={disabled || isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator />
                  ) : (
                    <Text
                      tx="resetPassword.savePassword"
                      style={styles.savePassword}
                      weight="bold"
                    />
                  )}
                </Button>
              </View>
            </View>
          </Form>
        </View>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.lg,
  paddingHorizontal: spacing.lg,
  height: "100%",
}

const useStyles = createUseStyles((theme) => ({
  title: {
    textAlign: "center",
    width: 230,
  },
  titleWrapper: {
    alignItems: "center",
    width: "100%",
  },
  submitButton: {
    marginTop: theme.spacing["48"],
  },
  formView: {
    flexGrow: 1,
  },
  formContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  fieldsContainer: {
    paddingTop: theme.spacing["48"],
    gap: 13,
  },
  savePassword: {
    color: "#fff",
  },
}))
