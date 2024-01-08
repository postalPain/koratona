import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Screen } from "app/components"
import { GoBackComponent } from "app/components/GoBack"
import { useStores } from "app/models"
import { typography } from "app/theme"
import HeartIconIcon from "assets/icons/svgs/HeartIcon"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Pressable, View } from "react-native"
import { Text } from "../../components/Text"
import { HomeFeedStackScreenProps } from "../../navigators/HomeStackNavigator"
import AchievementList from "./components/AchievementList"
import TopContentContainer from "./components/TopContentContainer"

interface PlayerScreenProps extends HomeFeedStackScreenProps<"player"> {}

export const PlayerScreen: FC<PlayerScreenProps> = observer(function (_props) {
  const styles = useStyles()
  const playerId = _props.route.params.id
  const { playerStore } = useStores()
  const player = playerStore.getPlayerById(playerId)

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} style={styles.screenContainer}>
      <View style={styles.topContentContainer}>
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
            <HeartIconIcon focused={playerStore.isPlayerFavorited(playerId)} />
          </Pressable>
        </View>
        <TopContentContainer playerId={playerId} />
      </View>

      <View style={styles.mainContent}>
        <View style={styles.birthInfo}>
          <View style={styles.birthInfoBox}>
            <Text tx="teams.player.dateOfBirth" style={styles.birthInfoBoxTitle} />
            <Text text="October 11, 1994" style={styles.birthInfoBoxValue} />
          </View>
          <View style={styles.birthInfoBox}>
            <Text tx="teams.player.birthplace" style={styles.birthInfoBoxTitle} />
            <Text text="Funchal" style={styles.birthInfoBoxValue} />
          </View>
        </View>
        <View style={styles.playerDescription}>
          <Text
            text="Abdulelah Al-Malki was born on 11 October 1994 in Ta'if, Saudi Arabia."
            style={styles.playerDescriptionText}
          />
        </View>
        <AchievementList />
        <View style={styles.overViewSection}>
          <Text tx="teams.player.overview" style={styles.overViewSectionTitle} />
          <View style={styles.overviewStats}>
            <View style={styles.overviewStatsItem}>
              <Text style={styles.overviewStatsItemValue} text="8.05" />
              <Text style={styles.overviewStatsItemTitle} tx="teams.player.rating" />
            </View>
            <View style={[styles.overviewStatsItem,styles.overviewStatsItemMiddle]}>
              <Text style={styles.overviewStatsItemValue} text="15" />
              <Text style={styles.overviewStatsItemTitle} tx="teams.player.appearances" />
            </View>
            <View style={styles.overviewStatsItem}>
              <Text style={styles.overviewStatsItemValue} text="3342" />
              <Text style={styles.overviewStatsItemTitle} tx="teams.player.minutes" />
            </View>
          </View>
        </View>
      </View>
    </Screen>
  )
})

const useStyles = createUseStyles(() => ({
  screenContainer: {
    height: "100%",
    flex: 1,
  },
  topContentContainer: {
    backgroundColor: "#1A1F51",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    paddingHorizontal: 24,
  },
  birthInfo: {
    flexDirection: "row",
  },
  mainContent: {
    paddingHorizontal: 24,
  },
  birthInfoBox: { paddingVertical: 24, marginRight: 36 },
  birthInfoBoxTitle: {
    fontSize: 14,
    lineHeight: 20,
    color: "#475467",
  },
  birthInfoBoxValue: {
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    fontSize: 20,
    letterSpacing: -0.4,
    color: "#101828",
  },
  playerDescription: {
    marginBottom: 48,
  },
  playerDescriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#475467",
  },
  overViewSection: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 50,
  },
  overViewSectionTitle: {
    textAlign: "center",
    marginBottom: 24,
    fontFamily: typography.fonts.instrumentSansSemiCondensed.regularItalic,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 1.64,
    textTransform: "uppercase",
    color: "#98A2B3",
  },
  overviewStats: {
    flexDirection: "row",
  },
  overviewStatsItem: {
    alignItems: "center",
    width: "33%",
  },
  overviewStatsItemMiddle:{

  },
  overviewStatsItemValue: {
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    fontSize: 28,
    lineHeight: 28,
    letterSpacing: -0.56,
    color: "#101828",
  },
  overviewStatsItemTitle: {
    fontFamily: typography.fonts.instrumentSansCondensed.medium,
    fontSize: 16,
    lineHeight: 20,
    color: "#98A2B3",
    textTransform: "uppercase",
    marginTop: 2,
  },
}))
