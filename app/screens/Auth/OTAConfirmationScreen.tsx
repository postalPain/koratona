import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Button, Text, TextField } from "app/components"
import { GoBackComponent } from "app/components/GoBack"
import { AppStackScreenProps } from "app/navigators"
import { typography } from "app/theme"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { t } from "i18n-js"
import { observer } from "mobx-react-lite"
import React from "react"
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import { OtpInput, OtpInputRef } from "react-native-otp-entry"
import { Colors } from "react-native/Libraries/NewAppScreen"
import EnvelopeIconSmall from "assets/icons/svgs/EnvelopeIconSmall"

import useApp from "./hooks/useSMSApp"
import { showToast } from "app/utils/showToast"

interface ScreenProps extends AppStackScreenProps<"OTAConfirmation"> {}

const RESEND_CODE_IN_SECONDS = 60

const CORRECT_CODE = "1234"
const WRONG_CODE = "4321"

export const OTAConfirmation: React.FC<ScreenProps> = observer(function (_props) {
  const styles = useStyles()
  const [disabledResendCode, setDisabledResendCode] = React.useState<boolean>(false)
  const [resendCodeIn, setResendCodeIn] = React.useState<number>(0)
  const [otpCodeInvalid, setOtpCodeInvalid] = React.useState<boolean>(false)
  const { buttonClickHandler, smsMessageBody } = useApp()
  const [otpCode, setOtpCode] = React.useState<string>("")

  const phoneNumber = _props.route.params.phoneNumber

  const bottomInset = useSafeAreaInsetsStyle(["bottom"])
  const topInset = useSafeAreaInsetsStyle(["top"])

  const OTPInputRef = React.useRef<OtpInputRef>(null)

  const requestCode = () => {
    if (!disabledResendCode) {
      setDisabledResendCode(true)
      setResendCodeIn(RESEND_CODE_IN_SECONDS)
    }
  }

  const updateResendCodeIn = () => {
    setResendCodeIn((prevState) => prevState - 1)
  }

  React.useEffect(() => {
    if (Platform.OS !== "android") return
    // launch the sms reading for the android
    buttonClickHandler()
  }, [])

  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (disabledResendCode) {
      interval = setInterval(updateResendCodeIn, 1000)
    }
    if (!!interval && !disabledResendCode) {
      clearInterval(interval)
    }
    return () => {
      !!interval && clearInterval(interval)
    }
  }, [disabledResendCode])

  React.useEffect(() => {
    if (resendCodeIn === 0) {
      setDisabledResendCode(false)
    }
  }, [resendCodeIn])

  React.useEffect(() => {
    if (!smsMessageBody) return
    const regex = /\b\d{4}\b/
    const match = `${smsMessageBody}`.match(regex)

    if (match) {
      OTPInputRef.current?.setValue(match[0])
    }
  }, [smsMessageBody])

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.contentContainer, bottomInset, topInset]}>
          <View>
            <GoBackComponent
              onPress={() => {
                _props.navigation.goBack()
              }}
            />
            <Text tx="signIn.enterLoginCode" style={styles.formTitleText} weight="bold" />
            <Text
              text={`${t("signIn.weHaveSentCodeTo")}\n${phoneNumber}`}
              style={styles.formSubTitleText}
            />
            <OtpInput
              ref={OTPInputRef}
              autoFocus
              numberOfDigits={4}
              focusStickBlinkingDuration={500}
              onTextChange={(value) => {
                setOtpCodeInvalid(false)
                setOtpCode(value)
              }}
              onFilled={(value) => {
                setOtpCode(value)
              }}
              theme={{
                containerStyle: styles.otpInputContainer,
                pinCodeContainerStyle: otpCodeInvalid
                  ? styles.pinCodeContainerInvalid
                  : styles.pinCodeContainer,
                pinCodeTextStyle: styles.pinCodeText,
                focusStickStyle: styles.focusStick,
                focusedPinCodeContainerStyle: otpCodeInvalid
                  ? styles.activePinCodeContainerInvalid
                  : styles.activePinCodeContainer,
              }}
            />
            <View style={styles.resendActionsInfo}>
              <EnvelopeIconSmall color={disabledResendCode ? "#B3B8C2" : "#333865"} />
              <Pressable onPress={requestCode}>
                <Text
                  tx="signIn.resendCode"
                  style={[
                    styles.resendActionsInfoText,
                    !!resendCodeIn && styles.resendActionsInfoTextDisabled,
                  ]}
                />
              </Pressable>
              {!!resendCodeIn && (
                <Text
                  text={`${t("common.in")} ${resendCodeIn}s`}
                  style={styles.resendActionsInfoCounterText}
                />
              )}
            </View>
          </View>

          <Button
            style={styles.goToPurchasesButton}
            tx="common.continue"
            textStyle={styles.goToPurchasesButtonText}
            pressedStyle={styles.goToPurchasesButton}
            onPress={() => {
              if (otpCode === CORRECT_CODE) {
                // _props.navigation.navigate("Main")
              } else if (otpCode && otpCode !== CORRECT_CODE) {
                setOtpCodeInvalid(true)
                showToast(t("signIn.wrongCode"))
              } else {
                setOtpCodeInvalid(true)
                showToast(t("signIn.enterCode"))
              }
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
})

const useStyles = createUseStyles(() => ({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 26,
  },
  contentContainer: {
    height: "100%",
    justifyContent: "space-between",
  },
  formTitleText: {
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.56,
    color: Colors.black,
    marginBottom: 26,
    marginTop: 46,
    textAlign: "center",
  },
  formSubTitleText: {
    fontSize: 14,
    lineHeight: 16.8,
    color: "#475467",
    textAlign: "center",
  },
  goToPurchasesButton: {
    backgroundColor: "#333865",
    borderColor: "#333865",
    marginTop: 16,
    width: "100%",
  },
  goToPurchasesButtonText: {
    color: "#FFF",
    fontSize: 16,
    lineHeight: 24,
    fontFamily: typography.fonts.instrumentSans.bold,
  },
  otpInputContainer: {
    justifyContent: "center",
    paddingVertical: 32,
    gap: 8,
  },
  pinCodeContainer: {
    width: 64,
    borderColor: "#D0D5DD",
  },
  pinCodeContainerInvalid: {
    width: 64,
    borderColor: "#FF0000",
  },
  activePinCodeContainer: {
    width: 64,
    borderColor: "#333865",
  },
  activePinCodeContainerInvalid: {
    width: 64,
    borderColor: "#FF0000",
  },
  focusStick: {
    backgroundColor: "#333865",
  },
  pinCodeText: {
    color: "#101828",
  },
  resendActionsInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  resendActionsInfoText: {
    fontFamily: typography.fonts.instrumentSans.semiBold,
    fontSize: 14,
    lineHeight: 16.8,
    marginLeft: 8,
    color: "#333865",
  },
  resendActionsInfoTextDisabled: {
    color: "#B3B8C2",
  },
  resendActionsInfoCounterText: {
    fontSize: 14,
    lineHeight: 16.8,
    color: "#475467",
    marginLeft: 8,
  },
}))
