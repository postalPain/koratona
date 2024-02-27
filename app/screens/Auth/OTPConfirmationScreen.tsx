import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Screen, Text } from "app/components"
import { GoBackComponent } from "app/components/GoBack"
import { isRTL } from "app/i18n"
import { useStores } from "app/models"
import { AppStackScreenProps, getActiveRoute } from "app/navigators"
import { typographyPresets } from "app/theme"
import { showToast } from "app/utils/showToast"
import EnvelopeIconSmall from "assets/icons/svgs/EnvelopeIconSmall"
import { t } from "i18n-js"
import { observer } from "mobx-react-lite"
import React from "react"
import { ActivityIndicator, Keyboard, Platform, Pressable, View } from "react-native"
import { OtpInput, OtpInputRef } from "react-native-otp-entry"
import { Colors } from "react-native/Libraries/NewAppScreen"
import useApp from "./hooks/useSMSApp"

interface ScreenProps extends AppStackScreenProps<"OTPConfirmation"> {}

const RESEND_CODE_IN_SECONDS = 60
const OTP_CODE_LENGTH = 4

export const OTPConfirmation: React.FC<ScreenProps> = observer(function (_props) {
  const styles = useStyles()
  const { authenticationStore, authUserStore } = useStores()
  const isPageActive = getActiveRoute(_props.navigation.getState()).name === "OTPConfirmation"

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
    OTPInputRef.current?.focus()
  }, [isPageActive])

  React.useEffect(() => {
    if (!phoneNumber) {
      _props.navigation.navigate("Welcome")
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
    Keyboard.dismiss()
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
        _props.navigation.navigate("Welcome")
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
              _props.navigation.navigate("Welcome")
            }}
          />
          <Text tx="signIn.enterLoginCode" style={styles.formTitleText} weight="bold" />
          <Text tx="signIn.weHaveSentCodeTo" style={styles.formSubTitleText} />
          <Text
            text={`${phoneNumber}`}
            style={[styles.formSubTitleText, styles.formSubTitleTextPhoneNumber]}
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
              inputsContainerStyle:
                Platform.OS === "android" && isRTL()
                  ? {
                      flexDirection: "row-reverse",
                    }
                  : {},
            }}
          />
          {isLoading && (
            <ActivityIndicator color="#333865" size="large" style={styles.activityIndicator} />
          )}
          <View style={styles.resendActionsInfo}>
            <View>
              <EnvelopeIconSmall color={disabledResendCode ? "#B3B8C2" : "#333865"} />
            </View>
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
  invalidFieldButton: {
    backgroundColor: "#E4E7EC",
    borderColor: "#E4E7EC",
  },
  contentCentered: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
  },
  formTitleText: {
    ...typographyPresets["h4-bold"],
    color: Colors.black,
    marginBottom: 26,
    marginTop: 46,
    textAlign: "center",
  },
  formSubTitleText: {
    ...typographyPresets["p2-regular"],
    color: "#475467",
    textAlign: "center",
  },
  formSubTitleTextPhoneNumber: {
    writingDirection: "ltr",
    direction: "ltr",
  },
  otpInputContainer: {
    justifyContent: "center",
    paddingVertical: 32,
    paddingHorizontal: 16,
    direction: "ltr",
    writingDirection: "ltr",
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
    ...typographyPresets["p2-semibold"],
    marginLeft: 8,
    color: "#333865",
    lineHeight: 30,
  },
  resendActionsInfoTextDisabled: {
    color: "#B3B8C2",
  },
  resendActionsInfoCounterText: {
    ...typographyPresets["p2-regular"],
    color: "#475467",
    marginLeft: 8,
    lineHeight: 28,
  },
  activityIndicator: {
    marginBottom: 16,
  },
}))
