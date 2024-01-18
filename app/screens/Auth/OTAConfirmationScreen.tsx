import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Button, Text } from "app/components"
import { GoBackComponent } from "app/components/GoBack"
import { AppStackScreenProps } from "app/navigators"
import { typography } from "app/theme"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { t } from "i18n-js"
import { observer } from "mobx-react-lite"
import React from "react"
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View } from "react-native"
import { OtpInput } from "react-native-otp-entry"
import { Colors } from "react-native/Libraries/NewAppScreen"
import EnvelopeIconSmall from "assets/icons/svgs/EnvelopeIconSmall"

interface ScreenProps extends AppStackScreenProps<"OTAConfirmation"> {}

const RESEND_CODE_IN_SECONDS = 60

export const OTAConfirmation: React.FC<ScreenProps> = observer(function (_props) {
  const styles = useStyles()
  const [disabledResendCode, setDisabledResendCode] = React.useState<boolean>(false)
  const [resendCodeIn, setResendCodeIn] = React.useState<number>(0)

  const phoneNumber = _props.route.params.phoneNumber

  const bottomInset = useSafeAreaInsetsStyle(["bottom"])
  const topInset = useSafeAreaInsetsStyle(["top"])

  const requestCode = () => {
    setDisabledResendCode(true)
    setResendCodeIn(RESEND_CODE_IN_SECONDS)
  }

  const updateResendCodeIn = () => {
    setResendCodeIn((prevState) => prevState - 1)
  }

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
              autoFocus
              numberOfDigits={4}
              focusStickBlinkingDuration={500}
              onTextChange={(text) => console.log(text)}
              onFilled={(text) => console.log(`OTP is ${text}`)}
              theme={{
                containerStyle: styles.otpInputContainer,
                pinCodeContainerStyle: styles.pinCodeContainer,
                pinCodeTextStyle: styles.pinCodeText,
                focusStickStyle: styles.focusStick,
                focusedPinCodeContainerStyle: styles.activePinCodeContainer,
              }}
            />
            <View style={styles.resendActionsInfo}>
              <EnvelopeIconSmall />
              <Text
                onPress={requestCode}
                tx="signIn.resendCode"
                style={styles.resendActionsInfoText}
              />
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
  activePinCodeContainer: {
    width: 64,
    borderColor: "#333865",
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
    color: "#B3B8C2",
    marginLeft: 8,
  },
  resendActionsInfoCounterText: {
    fontSize: 14,
    lineHeight: 16.8,
    color: "#475467",
    marginLeft: 8,
  },
}))
