import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Screen } from "app/components"
import { GoBackComponent } from "app/components/GoBack"
import { useStores } from "app/models"
import { typography } from "app/theme"
import DefenseIcon from "assets/icons/svgs/DefenseIcon"
import FootballIconAreaIconSvg from "assets/icons/svgs/FootballAreaIcon"
import FoulCardIcon from "assets/icons/svgs/FoulCard"
import FoulsIcon from "assets/icons/svgs/FoulsIcon"
import HeartIconIcon from "assets/icons/svgs/HeartIcon"
import { t } from "i18n-js"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Pressable, View } from "react-native"
import { Text } from "../../components/Text"
import { HomeFeedStackScreenProps } from "../../navigators/HomeStackNavigator"
import AchievementList from "./components/AchievementList"
import { CircularProgressComposition } from "./components/CircularProgressComposition"
import { LinearProgressComposition } from "./components/LinearProgressComposition"
import { StatsSection } from "./components/StatsSection"
import TopContentContainer from "./components/TopContentContainer"

interface PlayerScreenProps extends HomeFeedStackScreenProps<"player"> {}

export const PlayerScreen: FC<PlayerScreenProps> = observer(function (_props) {
  const styles = useStyles()
  const playerId = _props.route.params.id
  const { playerStore } = useStores()
  // const player = playerStore.getPlayerById(playerId)
  // console.log("player", player)

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]}>
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
        <StatsSection
          title={t("teams.player.overview")}
          data={[
            { title: t("teams.player.rating"), value: "8.05" },
            { title: t("teams.player.appearances"), value: "15" },
            { title: t("teams.player.minutes"), value: "3342" },
          ]}
        />
      </View>
      <View style={styles.highlights}>
        <View style={styles.sectionTitleContainer}>
          <FootballIconAreaIconSvg />
          <Text tx="teams.player.offense" style={styles.sectionTitle} />
        </View>

        <StatsSection
          style={styles.statsSectionWrapper}
          title={t("teams.player.performance")}
          data={[
            { title: t("teams.player.shots"), value: "66" },
            { title: t("teams.player.onTarget"), value: "36" },
            { title: t("teams.player.goals"), value: "15" },
          ]}
        />
        <View style={styles.accuracyProgressContainer}>
          <CircularProgressComposition value={98} title={t("teams.player.shotAccuracy")} />
          <CircularProgressComposition value={27} title={t("teams.player.passAccuracy")} />
        </View>
        <StatsSection
          style={styles.statsSectionWrapper}
          data={[
            { title: t("teams.player.assists"), value: "7" },
            { title: t("teams.player.passes"), value: "436" },
          ]}
        />
        <LinearProgressComposition
          value={76}
          textContent={{
            left: t("teams.player.successfulDribbles"),
            right: {
              currentNumber: 9,
              totalNumber: 22,
            },
          }}
        />
        <LinearProgressComposition
          value={4}
          textContent={{
            left: t("teams.player.keyPasses"),
            right: {
              currentNumber: 16,
              totalNumber: 475,
            },
          }}
        />
      </View>
      <View style={[styles.sectionTitleContainer, styles.sectionTitleOffsets]}>
        <DefenseIcon />
        <Text tx="teams.player.defense" style={styles.sectionTitle} />
      </View>
      <StatsSection
        title={t("teams.player.tackles")}
        data={[
          { title: t("teams.player.total"), value: "5" },
          { title: t("teams.player.interceptions"), value: "1" },
          { title: t("teams.player.blocks"), value: "0" },
        ]}
      />
      <LinearProgressComposition
        value={31}
        textContent={{
          left: t("teams.player.duelsWon"),
          right: {
            currentNumber: 35,
            totalNumber: 81,
          },
        }}
      />
      <View style={[styles.sectionTitleContainer, styles.sectionTitleOffsets]}>
        <FoulsIcon />
        <Text tx="teams.player.fouls" style={styles.sectionTitle} />
      </View>
      <View style={[styles.centered, styles.bottomSpace]}>
        <CircularProgressComposition
          value={2}
          total={6}
          title={t("teams.player.foulCards")}
          emptyColor="#ECCF21"
          filledColor="#BB2C2C"
          avoidPercentage
        />
      </View>
      <View style={styles.foulsDetails}>
        <View style={styles.foulsDetailsItem}>
          <FoulCardIcon color="#ECCF21" />
          <Text text="4" style={styles.foulsDetailsItemValue} />
          <Text tx="teams.player.yellow" style={styles.foulsDetailsItemTitle} />
        </View>
        <View style={styles.foulsDetailsItem}>
          <FoulCardIcon color="#BB2C2C" />
          <Text text="2" style={styles.foulsDetailsItemValue} />
          <Text tx="teams.player.red" style={styles.foulsDetailsItemTitle} />
        </View>
      </View>
      <StatsSection
        data={[
          { title: t("teams.player.drawn"), value: "14" },
          { title: t("teams.player.committed"), value: "11" },
        ]}
      />
    </Screen>
  )
})

const useStyles = createUseStyles(() => ({
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
  sectionTitleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontFamily: typography.fonts.instrumentSansCondensed.boldItalic,
    fontSize: 24,
    textTransform: "uppercase",
    color: "#101828",
  },
  highlights: {
    paddingTop: 72,
    borderTopColor: "rgba(0, 0, 0, 0.10)",
    borderTopWidth: 0.5,
    borderBottomColor: "rgba(0, 0, 0, 0.10)",
    borderBottomWidth: 0.5,
    backgroundColor: "#FBFBFB",
  },
  statsSectionWrapper: {
    marginVertical: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  accuracyProgressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 36,
    paddingHorizontal: 24,
  },
  sectionTitleOffsets: {
    marginTop: 72,
    marginBottom: 48,
  },
  centered: {
    alignItems: "center",
  },
  bottomSpace: {
    marginBottom: 24,
  },
  foulsDetails: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 18,
  },
  foulsDetailsItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
  },
  foulsDetailsItemValue: {
    fontFamily: typography.fonts.instrumentSansCondensed.semiBold,
    fontSize: 16,
    textTransform: "uppercase",
    color: "#101828",
  },
  foulsDetailsItemTitle: {
    fontFamily: typography.fonts.instrumentSansCondensed.medium,
    fontSize: 16,
    textTransform: "uppercase",
    color: "#98A2B3",
  },
}))
