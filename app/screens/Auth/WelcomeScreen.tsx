import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text } from "app/components"
import { LinearGradient } from "expo-linear-gradient"
import { observer } from "mobx-react-lite"
import React from "react"
import { Image, ImageBackground, View } from "react-native"
import { AppStackScreenProps } from "../../navigators"
import { typography } from "../../theme"
import { LoginOTA } from "./LoginOTA"

const welcomeLogo = require("assets/images/logo.png")
const welcomeBackGround = require("assets/backgrounds/welcome-screen.png")

interface WelcomeScreenProps extends AppStackScreenProps<"welcome"> {}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = observer(function WelcomeScreen(_props) {
  const styles = useStyles()

  const navigateToOTAConfirmation = (phoneNumber: string) => {
    _props.navigation.navigate("OTAConfirmation", { phoneNumber })
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={welcomeBackGround}>
        <LinearGradient
          colors={["rgba(26, 31, 81, 0.9)", "rgba(0, 6, 62, 0.4)", "transparent", "transparent"]}
          style={styles.gradient}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 0.1, y: 0.5 }}
        >
          <View style={styles.sloganWrapper}>
            <Image style={styles.logoImage} source={welcomeLogo} resizeMode="contain" />
            <Text style={styles.slogan} tx="welcomeScreen.slogan" />
          </View>
          <LoginOTA goToOTAConfirmation={navigateToOTAConfirmation} />
        </LinearGradient>
      </ImageBackground>
    </View>
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
    color: "#fff",
    textAlign: "center",
    fontSize: 22,
    letterSpacing: -0.44,
    fontFamily: typography.fonts.instrumentSans.bold,
    marginTop: 47,
  },
  sloganWrapper: {
    paddingTop: 160,
    width: 220,
    alignSelf: "center",
  },
}))
