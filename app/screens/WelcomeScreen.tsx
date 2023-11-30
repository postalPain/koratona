import { Button, Text } from "app/components"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { Image, ImageBackground, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { SwipeablePanel } from "rn-swipeable-panel"
import { AuthController } from "./Auth/AuthController"

const welcomeLogo = require("../../assets/images/logo.png")
const welcomeBackGround = require("../../assets/backgrounds/welcome-screen.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(_props) {
  const [activeAuthContent, setActiveAuthContent] = useState<
    "login" | "signUp" | "restorePassword"
  >("login")
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const $topContainerInsets = useSafeAreaInsetsStyle(["top"])

  const closePanel = () => {
    setIsPanelActive(false)
  }
  const [isPanelActive, setIsPanelActive] = useState(false)

  const openPanel =
    (contentKey: "login" | "signUp" | "restorePassword" = "login") =>
    () => {
      setActiveAuthContent(contentKey)
      setIsPanelActive(true)
    }

  return (
    <View style={$container}>
      <ImageBackground style={$aspectRatioBox} source={welcomeBackGround}>
        <View style={[$topContainer, $topContainerInsets]}>
          <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="center" />
        </View>

        <View style={$sloganWrapper}>
          <Text
            style={$slogan}
            text="Engage with your team like never before."
            size="xl"
            preset="bold"
          />
        </View>

        <View style={[$bottomContainer, $bottomContainerInsets]}>
          <Button
            testID="next-screen-button"
            preset="filled"
            tx="welcomeScreen.joinApp"
            style={buttonSignUp}
            textStyle={buttonSignUpText}
            onPress={openPanel("signUp")}
          />
          <Button
            testID="next-screen-button"
            preset="reversed"
            style={buttonLogin}
            tx="welcomeScreen.login"
            onPress={openPanel("login")}
          />
        </View>
      </ImageBackground>
      <SwipeablePanel
        fullWidth
        openLarge={false}
        showCloseButton={false}
        onClose={closePanel}
        smallPanelHeight={
          activeAuthContent === "restorePassword" || activeAuthContent === "login" ? 550 : 650
        }
        isActive={isPanelActive}
        closeOnTouchOutside
        scrollViewProps={{ automaticallyAdjustKeyboardInsets: true }}
      >
        <AuthController contentKey={activeAuthContent} />
      </SwipeablePanel>
    </View>
  )
})

const $aspectRatioBox: ViewStyle & ImageStyle = {
  flex: 1,
  justifyContent: "space-between",
  paddingBottom: spacing.xl,
}

const $container: ViewStyle = {
  flex: 1,
}

const $topContainer: ViewStyle = {
  justifyContent: "center",
}

const $bottomContainer: ViewStyle = {
  gap: spacing.sm,
  paddingHorizontal: spacing.lg,
}
const $welcomeLogo: ImageStyle = {
  paddingTop: 130,
  width: "100%",
}

const $slogan: TextStyle = {
  color: colors.textInverted,
  textAlign: "center",
}

const $sloganWrapper: ViewStyle = {
  paddingHorizontal: spacing.lg,
}

const buttonSignUp: ViewStyle = {
  backgroundColor: "#FADFD7",
}

const buttonLogin: ViewStyle = {
  backgroundColor: "#333865",
}

const buttonSignUpText: TextStyle = {
  color: "#333865",
}
