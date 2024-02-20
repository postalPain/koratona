import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text } from "app/components/Text"
import { typographyPresets } from "app/theme"
import { LinearGradient } from "expo-linear-gradient"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import StarIconSvg from "../../assets/icons/svgs/Star"

export interface ExclusiveBadgeProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const ExclusiveBadge = observer(function ExclusiveBadge() {
  const styles = useStyles()

  return (
    <LinearGradient
      style={styles.container}
      colors={["rgba(250, 223, 215, 0)", "rgba(250, 223, 215, 0.2)"]}
      start={{ x: 0.4, y: 0.4 }}
      end={{ x: 0.4, y: 0.9 }}
    >
      <StarIconSvg />
      <Text style={styles.text} tx="productsScreen.exclusive" />
      <StarIconSvg />
    </LinearGradient>
  )
})
const useStyles = createUseStyles(() => ({
  container: {
    backgroundColor: "#1A1F51",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
  },
  text: {
    ...typographyPresets["p2-semibold"],
    color: "#FADFD7",
    marginLeft: 4,
    marginRight: 4,
  },
}))
