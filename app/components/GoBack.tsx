import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { typography } from "app/theme"
import BackIconSvg from "assets/icons/svgs/BackIcon"
import React from "react"
import { Pressable, StyleProp, View, ViewStyle } from "react-native"
import { Text } from "./Text"

type Props = {
  onPress: () => void
  /**
   * Optional inner header wrapper style override.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Optional color override.
   */
  color: string
}

export const GoBackComponent: React.FC<Props> = ({
  onPress,
  style: $styleOverride,
  color = "#98A2B3",
}) => {
  const styles = useStyles()

  return (
    <View style={[styles.header, $styleOverride]}>
      <Pressable style={styles.leftHeaderComponent} onPress={onPress}>
        <BackIconSvg color={color} />
        <Text tx='common.goBack' style={[styles.leftHeaderComponentText, { color }]} />
      </Pressable>
    </View>
  )
}

const useStyles = createUseStyles(() => ({
  leftHeaderComponent: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftHeaderComponentText: {
    paddingLeft: 8,
    color: "#667085",
    fontFamily: typography.fonts.instrumentSansSemiCondensed.medium,
    fontSize: 16,
    lineHeight: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
}))
