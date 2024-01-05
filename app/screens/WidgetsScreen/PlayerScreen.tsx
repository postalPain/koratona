import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Icon, Screen, Text } from "app/components"
import { GoBackComponent } from "app/components/GoBack"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, Pressable, View } from "react-native"
import { HomeFeedStackScreenProps } from "../../navigators/HomeStackNavigator"
import { LinearGradient } from "expo-linear-gradient"
import { typography } from "app/theme"

interface PlayerScreenProps extends HomeFeedStackScreenProps<"player"> {}

export const PlayerScreen: FC<PlayerScreenProps> = observer(function (_props) {
  const styles = useStyles()
  const playerId = _props.route.params.id
  const { playerStore } = useStores()
  const player = playerStore.getPlayerById(playerId)

  const playerName = player ? `${player.firstName} ${player.lastName}` : "Unknown"

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} style={styles.screenContainer}>
      <LinearGradient colors={["#1A1F51", "#1A1F51", "#1A1F51", "#080A18"]} style={styles.gradient}>
        <View style={styles.header}>
          <GoBackComponent
            onPress={() => {
              _props.navigation.goBack()
            }}
          />
          <Pressable
            onPress={() => {
              playerStore.togglePlayerFavorite(playerId)
            }}
          >
            <Icon
              icon={playerStore.isPlayerFavorited(playerId) ? "heardIconFilled" : "heartIcon"}
            />
          </Pressable>
        </View>
        <View style={styles.generalPlayerInfo}>
          <Text text="09" style={styles.playerNumber} />
          <Text text={playerName} style={styles.playerName} />
          <View style={styles.generalPlayerStats}>
            <Text tx="teams.player.country" style={styles.generalPlayerStatsTitle} />
            <Image source={require("assets/images/flags/ar.png")} />
            <Text text="Saudi Arabia" style={styles.generalPlayerStatsValue} />
            <Text tx="teams.player.position" style={styles.generalPlayerStatsTitle} />
            <Text text="Attacker" style={styles.generalPlayerStatsValue} />
          </View>
          <View style={styles.personalPlayerStats}>
            <Text tx="teams.player.age" style={styles.personalPlayerStatsTitle} />
            <Text text="29" style={styles.personalPlayerStatsValue} />
            <Text tx="teams.player.height" style={styles.personalPlayerStatsTitle} />
            <Text text="1.77m" style={styles.personalPlayerStatsValue} />
            <Text tx="teams.player.weight" style={styles.personalPlayerStatsTitle} />
            <Text text="78kg" style={styles.personalPlayerStatsValue} />
          </View>
        </View>
      </LinearGradient>
    </Screen>
  )
})

const useStyles = createUseStyles(() => ({
  screenContainer: {
    height: "100%",
    flex: 1,
  },
  goBackComponent: {
    position: "absolute",
    left: 24,
    bottom: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    paddingHorizontal: 24,
  },
  gradient: {
    justifyContent: "space-between",
    position: "relative",
    paddingVertical: 12,
    height: 600,
  },
  generalPlayerInfo: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  playerNumber: {
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    fontSize: 96,
    lineHeight: 96,
    letterSpacing: -1.92,
    color: "#FADFD7",
    textTransform: "uppercase",
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
    marginRight: 4,
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
    marginRight: 4,
  },
  personalPlayerStatsValue: {
    fontFamily: typography.fonts.instrumentSansCondensed.semiBold,
    color: "#fff",
    fontSize: 16,
    letterSpacing: -0.32,
    marginLeft: 4,
  },
}))
