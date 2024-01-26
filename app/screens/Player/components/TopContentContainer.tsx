import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text } from "app/components"
import { useStores } from "app/models"
import { typography } from "app/theme"
import PentagonIcon from "assets/icons/svgs/Pegtagon"
import { LinearGradient } from "expo-linear-gradient"
import React from "react"
import { Image, View } from "react-native"
import { formatPlayerInfoValue } from "../utils/playerDataFallback"

type Props = {
  playerId: number
}

const TopContentContainer: React.FC<Props> = ({ playerId }) => {
  const styles = useStyles()
  const { playerStore } = useStores()
  const player = playerStore.getPlayerById(playerId)

  return (
    <>
      <View style={styles.bgLayoutContainer}>
        <PentagonIcon />
        <View style={styles.bgLayoutImageContainer}>
          <Image
            source={player?.pictureUrl ? { uri: player?.pictureUrl } : require("")}
            style={styles.bgLayoutImage}
            resizeMode="contain"
          />
        </View>
      </View>
      <LinearGradient colors={["transparent", "transparent", "#080A18"]} style={styles.gradient}>
        <View />
        <View style={styles.generalPlayerInfo}>
          <Text text={formatPlayerInfoValue(player?.jerseyNumber)} style={styles.playerNumber} />
          <Text text={player?.fullName} style={styles.playerName} />
          <View style={styles.generalPlayerStats}>
            <Text tx="teams.player.country" style={styles.generalPlayerStatsTitle} />
            <Image source={require("assets/images/flags/ar.png")} style={styles.flagIcon} />
            <Text
              text={formatPlayerInfoValue(player?.country)}
              style={styles.generalPlayerStatsValue}
            />
            <Text tx="teams.player.position" style={styles.generalPlayerStatsTitle} />
            <Text
              text={formatPlayerInfoValue(player?.position)}
              style={styles.generalPlayerStatsValue}
            />
          </View>
          <View style={styles.personalPlayerStats}>
            <Text tx="teams.player.age" style={styles.personalPlayerStatsTitle} />
            <Text
              text={formatPlayerInfoValue(player?.age)}
              style={styles.personalPlayerStatsValue}
            />
            <Text tx="teams.player.height" style={styles.personalPlayerStatsTitle} />
            <Text
              text={
                player?.height
                  ? formatPlayerInfoValue(player?.height) + "m"
                  : formatPlayerInfoValue(player?.height)
              }
              style={styles.personalPlayerStatsValue}
            />
            <Text tx="teams.player.weight" style={styles.personalPlayerStatsTitle} />
            <Text text={player?.weight
                  ? formatPlayerInfoValue(player?.weight) + "kg"
                  : formatPlayerInfoValue(player?.weight)} style={styles.personalPlayerStatsValue} />
          </View>
        </View>
      </LinearGradient>
    </>
  )
}

const useStyles = createUseStyles(() => ({
  gradient: {
    justifyContent: "space-between",
    position: "relative",
    paddingVertical: 12,
    height: 600,
  },
  generalPlayerInfo: {
    paddingHorizontal: 24,
    paddingBottom: 12,
  },
  playerNumber: {
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    fontSize: 96,
    lineHeight: 96,
    letterSpacing: -1.92,
    color: "#FADFD7",
    textTransform: "uppercase",
    opacity: 0.8,
  },
  playerName: {
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    fontSize: 48,
    lineHeight: 48,
    letterSpacing: -0.92,
    color: "#fff",
    textTransform: "uppercase",
  },
  generalPlayerStats: {
    backgroundColor: "#344054",
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 12,
  },
  generalPlayerStatsTitle: {
    fontFamily: typography.fonts.instrumentSansSemiCondensed.regular,
    color: "#98A2B3",
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 10,
  },
  generalPlayerStatsValue: {
    fontFamily: typography.fonts.instrumentSansCondensed.semiBold,
    color: "#fff",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.32,
    marginLeft: 4,
  },
  personalPlayerStats: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  personalPlayerStatsTitle: {
    fontFamily: typography.fonts.instrumentSansSemiCondensed.regular,
    color: "#98A2B3",
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 10,
  },
  personalPlayerStatsValue: {
    fontFamily: typography.fonts.instrumentSansCondensed.semiBold,
    color: "#fff",
    fontSize: 16,
    letterSpacing: -0.32,
    marginLeft: 4,
  },
  bgLayoutContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 50,
    alignItems: "center",
  },
  bgLayoutImageContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
  },
  bgLayoutImage: {
    width: "auto",
    height: 550,
  },
  flagIcon: {
    marginLeft: 3,
  },
}))

export default TopContentContainer
