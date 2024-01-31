import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import * as React from "react"
import { View } from "react-native"

export interface BannerProps {
  /**
   * Children components of your component (e.g. <Text />, <View />, etc.)
   */

  children: React.ReactNode
}

/**
 * The banner component is used to display a banner with a background color and padding.
 * It is used to display a message to the user.
 */
export const Banner = (props: BannerProps) => {
  const styles = useStyles()

  return <View style={styles.container}>{props.children}</View>
}

const useStyles = createUseStyles(() => ({
  container: {
    padding: 10,
    backgroundColor: "#FADFD7",
    borderRadius: 4,
  },
}))
