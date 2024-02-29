import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Screen, Text } from "app/components"
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
      <ImageBackground source={welcomeBackGround} resizeMode="stretch">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.centered}>
              <View style={styles.sloganWrapper}>
                <Image style={styles.logoImage} source={welcomeLogo} resizeMode="contain" />
                <Text style={styles.slogan} tx="welcomeScreen.slogan" />
              </View>
            </View>
            <LoginOTP goToOTPConfirmation={navigateToOTPConfirmation} />
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </Screen>
  )
})

const useStyles = createUseStyles((theme) => ({
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'flex-start',
    height: "100%",
  },
  logoImage: {
    height: 35,
    aspectRatio: 4.31,
  },
  slogan: {
    ...typographyPresets["h3-bold"],
    fontSize: 40,
    lineHeight: 58,
    color: "#fff",
    marginTop: 16,
  },
  sloganWrapper: {
    paddingHorizontal: theme.spacing["24"],
    paddingBottom: theme.spacing["24"],
  },
  centered: {
    flex: 1,
    justifyContent: "flex-end",
  },
}))
