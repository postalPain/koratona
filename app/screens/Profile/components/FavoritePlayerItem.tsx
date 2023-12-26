import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text } from "app/components"
import { typography } from "app/theme"
import { LinearGradient } from "expo-linear-gradient"
import React from "react"
import { View } from "react-native"

export const FavoritePlayerItem = () => {
  const styles = useStyles()

  return (
    <LinearGradient
      colors={["rgba(0, 0, 0, 0.5)", "#333865"]}
      end={{ x: 0.1, y: 0.1 }}
      start={{ x: 0.1, y: 0.9 }}
      style={styles.container}
    >
      <View style={styles.textWrapper}>
        <Text text="Nasser Al Dawesari" style={styles.playerName} />
      </View>
    </LinearGradient>
  )
}

const useStyles = createUseStyles((theme) => ({
  container: {
    width: 114,
    height: 114,
    borderRadius: 114 / 2,
    backgroundColor: "#333865",
    position: "relative",
  },
  playerName: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 14.5,
    fontFamily: typography.fonts.instrumentSans.bold,
  },
  textWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: theme.spacing[16],
  },
}))
