import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Button, Screen, Text } from "app/components"
import { GoBackComponent } from "app/components/GoBack"
import { AppStackScreenProps, getActiveRouteName } from "app/navigators"
import { typography } from "app/theme"
import EnvelopeIconSmall from "assets/icons/svgs/EnvelopeIconSmall"
import { t } from "i18n-js"
import { observer } from "mobx-react-lite"
import React from "react"
import { ActivityIndicator, Keyboard, Platform, Pressable, View } from "react-native"
import { OtpInput, OtpInputRef } from "react-native-otp-entry"
import { Colors } from "react-native/Libraries/NewAppScreen"

import { useStores } from "app/models"
import { showToast } from "app/utils/showToast"
import useApp from "./hooks/useSMSApp"

interface ScreenProps extends AppStackScreenProps<"OTPConfirmation"> {}

const RESEND_CODE_IN_SECONDS = 60
const OTP_CODE_LENGTH = 4

export const OTPConfirmation: React.FC<ScreenProps> = observer(function (_props) {
  const styles = useStyles()
  const { authenticationStore, authUserStore } = useStores()
  const isPageActive = getActiveRouteName(_props.navigation.getState()) === "OTPConfirmation"

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [disabledResendCode, setDisabledResendCode] = React.useState<boolean>(true)
  const [resendCodeIn, setResendCodeIn] = React.useState<number>(RESEND_CODE_IN_SECONDS)
  const [otpCodeInvalid, setOtpCodeInvalid] = React.useState<boolean>(false)
  const { buttonClickHandler, smsMessageBody } = useApp()
  const [otpCode, setOtpCode] = React.useState<string>("")

  const phoneNumber = _props.route?.params?.phoneNumber

  const OTPInputRef = React.useRef<OtpInputRef>(null)

  const requestCode = () => {
    if (disabledResendCode || !phoneNumber) return
    setDisabledResendCode(true)
    setResendCodeIn(RESEND_CODE_IN_SECONDS)
    authenticationStore.getOTPCode(phoneNumber, () => {
      showToast(t("signIn.codeSent"))
    })
  }

  React.useEffect(() => {
    setResendCodeIn(RESEND_CODE_IN_SECONDS)
  }, [isPageActive])

  React.useEffect(() => {
    if (!phoneNumber) {
      _props.navigation.navigate("welcome")
    }
  }, [phoneNumber])

  React.useEffect(() => {
    if (Platform.OS !== "android") return
    // launch the sms reading for the android only
    buttonClickHandler()
  }, [])

  React.useEffect(() => {
    if (!isPageActive) return
    let interval: NodeJS.Timeout | null = null
    if (disabledResendCode) {
      interval = setInterval(() => {
        setResendCodeIn((prevState) => {
          if (prevState === 0) {
            setDisabledResendCode(false)
            interval && clearInterval(interval)
            return 0
          }
          return prevState - 1
        })
      }, 1000)
    }

    if (!!interval && !disabledResendCode) {
      clearInterval(interval)
    }

    return () => {
      !!interval && clearInterval(interval)
    }
  }, [disabledResendCode, isPageActive])

  React.useEffect(() => {
    if (!smsMessageBody) return
    const regex = new RegExp(`\\b\\d{${OTP_CODE_LENGTH}}\\b`)
    const match = `${smsMessageBody}`.match(regex)

    if (match) {
      OTPInputRef.current?.setValue(match[0])
    }
  }, [smsMessageBody])

  const handleConfirmOTPCode = async (customValue?: string) => {
    if (isLoading) return
    const code = customValue || otpCode

    if (!code || code.length !== OTP_CODE_LENGTH) {
      setOtpCodeInvalid(true)
      showToast(t("signIn.enterCode"))
      return
    }
    setIsLoading(true)
    const deviceId = authUserStore.notificationToken

    await authenticationStore.confirmOTPCode(
      {
        phone: phoneNumber,
        code,
        deviceId,
      },
      (user) => {
        authUserStore.setUserData(user)
        setIsLoading(false)
      },
      () => {
        setOtpCodeInvalid(true)
        setIsLoading(false)
        OTPInputRef.current?.clear()
      },
    )
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top", "bottom"]}>
      <Pressable style={styles.contentContainer} onPress={Keyboard.dismiss}>
        <View>
          <GoBackComponent
            onPress={() => {
              _props.navigation.navigate("welcome")
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
            numberOfDigits={OTP_CODE_LENGTH}
            focusStickBlinkingDuration={500}
            onTextChange={(value) => {
              setOtpCodeInvalid(false)
              setOtpCode(value)
            }}
            onFilled={(value) => {
              setOtpCode(value)
              handleConfirmOTPCode(value)
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
          style={[
            styles.goToPurchasesButton,
            otpCode.length !== OTP_CODE_LENGTH
              ? {
                  backgroundColor: "#E4E7EC",
                  borderColor: "#E4E7EC",
                }
              : {},
          ]}
          pressedStyle={styles.goToPurchasesButton}
          onPress={() => handleConfirmOTPCode()}
          disabled={!otpCode}
        >
          {!isLoading && <Text style={styles.goToPurchasesButtonText} tx="common.continue" />}
          {isLoading && <ActivityIndicator />}
        </Button>
      </Pressable>
    </Screen>
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
    padding: 24,
  },
  contentCentered: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
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
    paddingHorizontal: 16,
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
