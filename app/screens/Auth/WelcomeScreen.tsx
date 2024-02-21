import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Screen, Text } from "app/components"
import { LinearGradient } from "expo-linear-gradient"
import { observer } from "mobx-react-lite"
import React from "react"
import { Image, ImageBackground, Keyboard, TouchableWithoutFeedback, View } from "react-native"
import { AppStackScreenProps } from "../../navigators"
import { typographyPresets } from "../../theme"
import { LoginOTP } from "./LoginOTP"

const welcomeLogo = require("assets/images/logo.png")
const welcomeBackGround = require("assets/backgrounds/welcome-screen.png")

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
      <ImageBackground source={welcomeBackGround}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <LinearGradient
            colors={["rgba(26, 31, 81, 0.9)", "rgba(0, 6, 62, 0.4)", "transparent", "transparent"]}
            style={styles.gradient}
            start={{ x: 0.1, y: 0.1 }}
            end={{ x: 0.1, y: 0.5 }}
          >
            <View style={styles.centered}>
              <View style={styles.sloganWrapper}>
                <Image style={styles.logoImage} source={welcomeLogo} resizeMode="contain" />
                <Text style={styles.slogan} tx="welcomeScreen.slogan" />
              </View>
            </View>
            <LoginOTP goToOTPConfirmation={navigateToOTPConfirmation} />
          </LinearGradient>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </Screen>
  )
})

const useStyles = createUseStyles(() => ({
  container: {
    flex: 1,
  },
  gradient: {
    justifyContent: "space-between",
    height: "100%",
  },
  logoImage: {
    width: "100%",
    height: 26,
  },
  slogan: {
    ...typographyPresets["h4-bold"],
    color: "#fff",
    textAlign: "center",
    marginTop: 47,
  },
  sloganWrapper: {
    width: 282,
    alignSelf: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
  },
}))
