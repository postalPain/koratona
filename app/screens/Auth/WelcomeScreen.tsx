import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Screen, Text } from "app/components"
import { isRTL } from "app/i18n"
import { LinearGradient } from "expo-linear-gradient"
import { observer } from "mobx-react-lite"
import React from "react"
import { Image, Keyboard, TouchableWithoutFeedback, View } from "react-native"
import { AppStackScreenProps } from "../../navigators"
import { getTypographyPresets } from "../../theme"
import { LoginOTP } from "./LoginOTP"

const welcomeLogo = require("assets/images/logo.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = observer(function WelcomeScreen(_props) {
  const styles = useStyles()

  const navigateToOTPConfirmation = (phoneNumber: string) => {
    _props.navigation.replace("OTPConfirmation", { phoneNumber })
  }

  return (
    <Screen
      preset="fixed"
      style={styles.container}
      safeAreaEdges={["bottom"]}
      KeyboardAvoidingViewProps={{
        behavior: "position",
        contentContainerStyle: {
          flex: 1,
        },
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <View style={styles.centered}>
            <LinearGradient colors={["transparent", "rgba(0, 0, 0, 0.8)"]} style={styles.gradient}>
              <View style={styles.sloganWrapper}>
                <Image style={styles.logoImage} source={welcomeLogo} resizeMode="contain" />
                <Text style={styles.slogan} tx="welcomeScreen.slogan" />
              </View>
            </LinearGradient>
          </View>
          <LoginOTP goToOTPConfirmation={navigateToOTPConfirmation} />
        </View>
      </TouchableWithoutFeedback>
    </Screen>
  )
})

const useStyles = createUseStyles((theme) => ({
  container: {
    flex: 1,
  },
  content: {
    alignItems: "flex-start",
    height: "100%",
  },
  logoImage: {
    height: 35,
    aspectRatio: 4.31,
  },
  slogan: {
    ...getTypographyPresets()["h3-bold"],
    fontSize: 40,
    lineHeight: isRTL() ? 68 : 40,
    color: "#fff",
    marginTop: 20,
  },
  sloganWrapper: {
    paddingHorizontal: theme.spacing["24"],
    paddingBottom: theme.spacing["24"],
  },
  centered: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: theme.colors.primary.main500,
    width: "100%",
  },
  gradient: {
    height: "100%",
    justifyContent: "flex-end",
  },
}))
