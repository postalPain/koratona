import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text } from "app/components"
import { typography } from "app/theme"
import { LinearGradient } from "expo-linear-gradient"
import React from "react"
import { Image, View } from "react-native"

type Props = {
  name: string
  pictureURL: string | null
}

export const FavoritePlayerItem: React.FC<Props> = ({ name, pictureURL }) => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      {pictureURL && (
        <View style={styles.pictureWrapper}>
          <Image resizeMode="contain" source={{ uri: pictureURL, width: 100, height: 100 }} />
        </View>
      )}
      <LinearGradient colors={["transparent", "rgba(0, 0, 0, 0.5)"]} style={styles.gradient}>
        <View style={styles.textWrapper}>
          <Text text={name} style={styles.playerName} />
        </View>
      </LinearGradient>
    </View>
  )
}

const useStyles = createUseStyles((theme) => ({
  container: {
    width: 114,
    height: 114,
    borderRadius: 114 / 2,
    backgroundColor: "#333865",
    overflow: "hidden",
  },
  gradient: {
    height: "100%",
  },
  playerName: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 14.5,
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    width: 80,
  },
  textWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: theme.spacing[16],
    justifyContent: "center",
    alignItems: "center",
  },
  pictureWrapper: {
    position: "absolute",
    alignItems: "center",
    bottom: 0,
    left: 0,
    right: 0,
  },
}))
