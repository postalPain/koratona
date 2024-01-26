import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Button, Text } from "app/components"
import { useStores } from "app/models"
import { typography } from "app/theme"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { observer } from "mobx-react-lite"
import React, { useRef, useState } from "react"
import { ActivityIndicator, Keyboard, TouchableWithoutFeedback, View } from "react-native"
import PhoneInput from "react-native-phone-number-input"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { AuthPolicies } from "./AuthPolicies"
import { getDeviceCountryCode } from "app/utils/getCounrtyCode"
import { CountryCode } from "react-native-country-picker-modal"

type Props = {
  goToOTPConfirmation: (phoneNumber: string) => void
}

export const LoginOTP: React.FC<Props> = observer(function ({ goToOTPConfirmation }) {
  const styles = useStyles()
  const { authenticationStore } = useStores()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [value, setValue] = useState("")
  const [formattedPhoneValue, setFormattedPhoneValue] = useState<string>("")
  const [valid, setValid] = useState<boolean>(true)
  const phoneInput = useRef<PhoneInput>(null)

  const bottomInsets = useSafeAreaInsetsStyle(["bottom"])

  const checkIsNumberValid = (number: string) => phoneInput.current?.isValidNumber(number)

  const requestOTPCode = async () => {
    const checkValid = checkIsNumberValid(value)
    setValid(!!checkValid)

    if (!checkValid || isLoading) {
      return
    }
    setIsLoading(true)
    await authenticationStore.getOTPCode(formattedPhoneValue, () => {
      goToOTPConfirmation(formattedPhoneValue)
      setIsLoading(false)
    })
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text tx="welcomeScreen.letsGetStarted" style={styles.formTitleText} weight="bold" />
        <PhoneInput
          ref={phoneInput}
          defaultValue={value}
          defaultCode={getDeviceCountryCode() as CountryCode}
          textInputProps={{
            onBlur() {
              const checkValid = checkIsNumberValid(value)
              setValid(checkValid || false)
            },
          }}
          onChangeText={(text) => {
            const checkValid = checkIsNumberValid(text)
            setValue(text)
            if (checkValid) {
              setValid(true)
            }
          }}
          placeholder="Enter phone number"
          onChangeFormattedText={(text) => {
            setFormattedPhoneValue(text)
          }}
          countryPickerProps={{ withAlphaFilter: true, withCallingCodeButton: true }}
          disableArrowIcon
          withShadow
          textContainerStyle={styles.phoneInputTextStyleContainer}
          containerStyle={[
            styles.phoneInputContainer,
            valid ? {} : styles.phoneInputContainerInvalid,
          ]}
        />
        <Button style={styles.button} onPress={requestOTPCode} pressedStyle={styles.button}>
          {!isLoading && <Text style={styles.buttonText} tx="common.continue" />}
          {isLoading && <ActivityIndicator />}
        </Button>
        <View style={bottomInsets}>
          <AuthPolicies />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
})

const useStyles = createUseStyles(() => ({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 26,
    paddingVertical: 39,
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
    overflow: "hidden",
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
  phoneInputContainerInvalid: { borderColor: "#FF0000", borderWidth: 1 },
}))
