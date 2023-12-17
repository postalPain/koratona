import BottomSheet from "@gorhom/bottom-sheet"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Button, Text } from "app/components"
import { observer } from "mobx-react-lite"
import React from "react"
import { Image, ImageBackground, View } from "react-native"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { AuthContentKey } from "./Auth/AuthController"
import AuthPanel from "./Auth/AuthPanel"
import * as Linking from "expo-linking"

const welcomeLogo = require("../../assets/images/logo.png")
const welcomeBackGround = require("../../assets/backgrounds/welcome-screen.png")

interface WelcomeScreenProps extends AppStackScreenProps<"welcome"> {}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = observer(function WelcomeScreen(_props) {
  const [panelContentKey, setPanelContentKey] = React.useState<AuthContentKey>("login")
  const sheetRef = React.useRef<BottomSheet>(null)

  const styles = useStyles()
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const $topContainerInsets = useSafeAreaInsetsStyle(["top"])

  const openPanel =
    (contentKey: AuthContentKey = "login") =>
    () => {
      setPanelContentKey(contentKey)
      sheetRef.current?.expand()
    }

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.aspectRatioBox} source={welcomeBackGround}>
        <View style={[styles.topContainer, $topContainerInsets]}>
          <Image style={styles.welcomeLogo} source={welcomeLogo} resizeMode="center" />
        </View>
        <View style={styles.sloganWrapper}>
          <Text style={styles.slogan} tx="welcomeScreen.slogan" size="xl" preset="bold" />
        </View>
        <View style={[styles.bottomContainer, $bottomContainerInsets]}>
          <Button
            testID="next-screen-button"
            preset="filled"
            tx="welcomeScreen.joinApp"
            style={styles.buttonSignUp}
            textStyle={styles.buttonSignUpText}
            onPress={openPanel("signUp")}
          />
          <Button
            testID="next-screen-button"
            preset="reversed"
            style={styles.buttonLogin}
            tx="common.login"
            onPress={openPanel("login")}
          />
        </View>
      </ImageBackground>
      <AuthPanel
        ref={sheetRef}
        contentKey={panelContentKey}
        openPanel={openPanel}
        onClose={() => sheetRef.current?.close()}
      />
    </View>
  )
})

const useStyles = createUseStyles(() => ({
  container: {
    flex: 1,
  },

  aspectRatioBox: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: spacing.xl,
  },

  topContainer: {
    justifyContent: "center",
  },

  bottomContainer: {
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  welcomeLogo: {
    paddingTop: 130,
    width: "100%",
  },

  slogan: {
    color: colors.textInverted,
    textAlign: "center",
  },

  sloganWrapper: {
    paddingHorizontal: spacing.lg,
  },

  buttonSignUp: {
    backgroundColor: "#FADFD7",
  },

  buttonLogin: {
    backgroundColor: "#333865",
  },

  buttonSignUpText: {
    color: "#333865",
  },
}))
