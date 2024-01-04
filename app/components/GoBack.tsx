import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import React from "react"
import { Pressable, StyleProp, View, ViewStyle } from "react-native"
import { Icon } from "./Icon"
import { Text } from "./Text"
import { typography } from "app/theme"

type Props = {
  onPress: () => void
  /**
   * Optional inner header wrapper style override.
   */
  style?: StyleProp<ViewStyle>
}

export const GoBackComponent: React.FC<Props> = ({ onPress, style: $styleOverride }) => {
  const styles = useStyles()

  return (
    <View style={[styles.header, $styleOverride]}>
      <Pressable style={styles.leftHeaderComponent} onPress={onPress}>
        <Icon icon="back" color="#667085" />
        <Text text="Go back" style={styles.leftHeaderComponentText} />
      </Pressable>
    </View>
  )
}

const useStyles = createUseStyles(() => ({
  leftHeaderComponent: {
    flexDirection: "row",
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
