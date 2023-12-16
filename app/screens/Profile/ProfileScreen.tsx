import React, { FC } from "react"
import { TextStyle, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { AppTabScreenProps } from "../../navigators/HomeNavigator"
import { spacing } from "../../theme"

export const ProfileScreen: FC<AppTabScreenProps<"userProfile">> = function DemoDebugScreen(
  _props,
) {
  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <Text style={$title} preset="heading" tx='appHomeNavigator.userProfile' />
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $title: TextStyle = {
  marginBottom: spacing.xxl,
}
