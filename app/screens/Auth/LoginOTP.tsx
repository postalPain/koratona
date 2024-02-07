import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Button, Text } from "app/components"
import { getWritingDirection, translate } from "app/i18n"
import { useStores } from "app/models"
import { typography } from "app/theme"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { observer } from "mobx-react-lite"
import React, { useRef, useState } from "react"
import { ActivityIndicator, Keyboard, Platform, TouchableWithoutFeedback, View } from "react-native"
import PhoneInput from "react-native-phone-number-input"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { AuthPolicies } from "./AuthPolicies"

type Props = {
  goToOTPConfirmation: (phoneNumber: string) => void
}

export const LoginOTP: React.FC<Props> = observer(function ({ goToOTPConfirmation }) {
  const styles = useStyles()
  const { authenticationStore } = useStores()

  const [isFetchOTPCodeLoading, setIsFetchOTPCodeLoading] = useState<boolean>(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState<string>("")
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState<boolean>(true)

  const phoneInputRef = useRef<PhoneInput>(null)

  const bottomInsets = useSafeAreaInsetsStyle(["bottom"])

  const checkIsNumberValid = (number: string) => phoneInputRef.current?.isValidNumber(number)

  const requestOTPCode = async () => {
    const checkValid = checkIsNumberValid(phoneNumber)
    setIsPhoneNumberValid(!!checkValid)

    if (!checkValid || isFetchOTPCodeLoading) {
      return
    }
    setIsFetchOTPCodeLoading(true)
    await authenticationStore.getOTPCode(formattedPhoneNumber, () => {
      goToOTPConfirmation(formattedPhoneNumber)
      setIsFetchOTPCodeLoading(false)
    })
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text tx="welcomeScreen.letsGetStarted" style={styles.formTitleText} weight="bold" />
        <PhoneInput
          ref={phoneInputRef}
          defaultValue={phoneNumber}
          defaultCode="SA"
          textInputProps={{
            onBlur() {
              const checkValid = checkIsNumberValid(phoneNumber)
              setIsPhoneNumberValid(!!checkValid)
            },
          }}
          onChangeText={(text) => {
            const checkValid = checkIsNumberValid(text)
            setPhoneNumber(text)
            setIsPhoneNumberValid(!!checkValid)
          }}
          placeholder={translate("signIn.enterPhoneNumber")}
          onChangeFormattedText={(text) => {
            setFormattedPhoneNumber(text)
          }}
          countryPickerProps={{
            withAlphaFilter: true,
            withCallingCodeButton: true,
            withCallingCode: true,
            filterProps: {
              placeholder: translate("signIn.phoneFilterPlaceholder"),
              style: {
                writingDirection: getWritingDirection(),
                direction: "ltr",
              },
            },
          }}
          disableArrowIcon
          withShadow
          textContainerStyle={[
            styles.phoneInputTextStyleContainer,
            Platform.OS === "android" ? styles.borderRightForAndroid : {},
          ]}
          containerStyle={[
            styles.phoneInputContainer,
            isPhoneNumberValid ? {} : styles.phoneInputContainerInvalid,
            Platform.OS === "android" ? styles.reversedDirectionForAndroid : {},
          ]}
          layout={Platform.OS === "android" ? "second" : "first"}
        />
        <Button
          style={[
            styles.button,
            phoneNumber && isPhoneNumberValid ? {} : styles.fieldInvalidStyles,
          ]}
          disabled={!phoneNumber || !isPhoneNumberValid || isFetchOTPCodeLoading}
          onPress={requestOTPCode}
          pressedStyle={styles.button}
        >
          {!isFetchOTPCodeLoading && <Text style={styles.buttonText} tx="common.continue" />}
          {isFetchOTPCodeLoading && <ActivityIndicator />}
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
  fieldInvalidStyles: {
    backgroundColor: "#D0D5DD",
    borderColor: "#D0D5DD",
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
    direction: "ltr",
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
  borderRightForAndroid: {
    borderRightColor: "#D0D5DD",
    borderRightWidth: 1,
  },
  reversedDirectionForAndroid: {
    flexDirection: "row-reverse",
  },
}))
