import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Icon, Text } from "app/components"
import { typography } from "app/theme"
import PentagonPlayerCardIcon from "assets/icons/svgs/PegtagonPlayerCard"
import { LinearGradient } from "expo-linear-gradient"
import React from "react"
import { Image, Pressable, View } from "react-native"

const playerPhoto = require("assets/temp/player_photo.png")

type Props = {
  player: any
  addedToFavorite?: boolean
  onFavoritePress?: () => void
}

export const PlayerCard: React.FC<Props> = ({
  player,
  addedToFavorite = false,
  onFavoritePress,
}) => {
  const styles = useStyles()

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <LinearGradient
          colors={["#1A1F51", "#1A1F51", "#1A1F51", "#080A18"]}
          style={styles.gradient}
        >
          <Pressable onPress={onFavoritePress} style={styles.favoriteIcon}>
            <Icon icon={addedToFavorite ? "heardIconFilled" : "heartIcon"} />
          </Pressable>
          <View style={styles.pentagonContainer}>
            <PentagonPlayerCardIcon />
          </View>
          <View style={styles.imageContainer}>
            <Image source={playerPhoto} />
          </View>
          <Text style={styles.number} text={player.number} />
          <Text style={styles.name} text={player.name} />
        </LinearGradient>
      </View>
    </View>
  )
}

const useStyles = createUseStyles(() => ({
  wrapper: {
    width: "100%",
    alignItems: "center",
  },
  container: {
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: "#E6E6EC",
    width: 165,
    height: 218,
  },
  gradient: {
    justifyContent: "flex-end",
    position: "relative",
    height: "100%",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  name: {
    color: "#fff",
    fontSize: 24,
    fontFamily: typography.fonts.instrumentSansCondensed.semiBoldItalic,
    letterSpacing: -0.48,
    textTransform: "uppercase",
  },
  number: {
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    fontSize: 40,
    lineHeight: 40,
    letterSpacing: -0.8,
    color: "#FADFD7",
    textTransform: "uppercase",
  },
  pentagonContainer: {
    position: "absolute",
    bottom: 10,
    left: "50%",
    transform: [{ translateX: -43 }],
  },
  favoriteIcon: {
    position: "absolute",
    top: 9,
    right: 9,
    zIndex: 2,
  },
  imageContainer:{
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  }
}))
