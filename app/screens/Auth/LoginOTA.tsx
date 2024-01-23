import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Button, Text } from "app/components"
import { useStores } from "app/models"
import { typography } from "app/theme"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { observer } from "mobx-react-lite"
import React, { useRef, useState } from "react"
import { ActivityIndicator, InputAccessoryView, Keyboard, Platform, View } from "react-native"
import PhoneInput from "react-native-phone-number-input"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { AuthPolicies } from "./AuthPolicies"

type Props = {
  goToOTAConfirmation: (phoneNumber: string) => void
}

export const LoginOTA: React.FC<Props> = observer(function ({ goToOTAConfirmation }) {
  const styles = useStyles()
  const { authenticationStore } = useStores()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [value, setValue] = useState("")
  const [formattedPhoneValue, setFormattedPhoneValue] = useState<string>("")
  const [valid, setValid] = useState<boolean>(true)
  const phoneInput = useRef<PhoneInput>(null)

  const bottomInsets = useSafeAreaInsetsStyle(["bottom"])

  const goToOTALoginScreen = async () => {
    if (isLoading) return
    setIsLoading(true)
    const checkValid = phoneInput.current?.isValidNumber(value)
    setValid(checkValid || false)
    if (!checkValid) {
      return
    }
    await authenticationStore.getOTACode(formattedPhoneValue, () => {
      goToOTAConfirmation(formattedPhoneValue)
      setIsLoading(false)
    })
  }

  return (
    <View style={styles.container}>
      <Text tx="welcomeScreen.letsGetStarted" style={styles.formTitleText} weight="bold" />
      {Platform.OS === "ios" && (
        <InputAccessoryView nativeID="phoneNumberInput">
          <View style={styles.inputAccessoryBox}>
            <Text
              onPress={() => {
                Keyboard.dismiss()
              }}
              style={styles.inputAccessoryText}
              tx="common.done"
              weight="semiBold"
            />
          </View>
        </InputAccessoryView>
      )}
      <PhoneInput
        ref={phoneInput}
        defaultValue={value}
        defaultCode="UA"
        layout="first"
        textInputProps={{
          inputAccessoryViewID: "phoneNumberInput",
        }}
        onChangeText={(text) => {
          setValue(text)
          setValid(true)
        }}
        placeholder="Enter phone number"
        onChangeFormattedText={(text) => {
          setFormattedPhoneValue(text)
        }}
        countryPickerProps={{ withAlphaFilter: true }}
        disableArrowIcon
        withShadow
        autoFocus
        textContainerStyle={styles.phoneInputTextStyleContainer}
        containerStyle={[
          styles.phoneInputContainer,
          valid ? {} : styles.phoneInputContainerInvalid,
        ]}
      />
      <Button style={styles.button} onPress={goToOTALoginScreen} pressedStyle={styles.button}>
        {!isLoading && <Text style={styles.buttonText} tx="common.continue" />}
        {isLoading && <ActivityIndicator />}
      </Button>
      <View style={bottomInsets}>
        <AuthPolicies />
      </View>
    </View>
  )
})

const useStyles = createUseStyles(() => ({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 26,
    paddingTop: 39,
  },
  inputAccessoryBox: {
    borderTopColor: "#D0D5DD",
    borderTopWidth: 0.5,
    backgroundColor: "#F2F3F5",
    paddingVertical: 12,
    justifyContent: "center",
  },
  inputAccessoryText: {
    textAlign: "right",
    fontWeight: "bold",
    color: "#1375FE",
    marginRight: 12,
  },
  formTitleText: {
    fontSize: 22,
    color: Colors.black,
    marginBottom: 26,
  },
  phoneInputContainer: {
    borderWidth: 1,
    borderColor: "#D0D5DD",
    backgroundColor: "#fff",
    borderRadius: 4,
    width: "100%",
  },
  phoneInputTextStyleContainer: {
    backgroundColor: "#fff",
    borderLeftColor: "#D0D5DD",
    borderLeftWidth: 1,
  },
  button: {
    backgroundColor: "#333865",
    borderColor: "#333865",
    marginTop: 16,
    width: "100%",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    lineHeight: 24,
    fontFamily: typography.fonts.instrumentSans.bold,
  },
  phoneInputContainerInvalid: { borderColor: "#FF0000" },
}))
