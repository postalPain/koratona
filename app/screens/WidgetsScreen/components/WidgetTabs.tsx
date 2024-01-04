import React from "react"
import FixturesIconSvg from "assets/icons/svgs/widgetTabs/FixturesIcon"
import TeamIconSvg from "assets/icons/svgs/widgetTabs/TeamIcon"
import StandingsIconSvg from "assets/icons/svgs/widgetTabs/StandingsIcon"
import { Pressable, View } from "react-native"
import { Text } from "app/components"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { typography } from "app/theme"
import { WidgetTabVariants } from "../WidgetsScreen"

type Props = {
  activeTab: WidgetTabVariants
  setActiveTab: (tab: WidgetTabVariants) => void
}

const WidgetsScreenTabs: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const styles = useStyles()

  const isTabActive = (tab: "fixtures" | "standings" | "team") => {
    return activeTab === tab
  }

  return (
    <View style={styles.tabs}>
      <Pressable
        style={styles.tab}
        onPress={() => {
          setActiveTab("fixtures")
        }}
      >
        <FixturesIconSvg focused={isTabActive("fixtures")} />
        <Text
          style={[styles.tabTitle, isTabActive("fixtures") && styles.tabTitleActive]}
          tx="widgets.tabs.fixtures"
        />
        {isTabActive("fixtures") && <View style={styles.borderBottom} />}
      </Pressable>
      <Pressable
        style={styles.tab}
        onPress={() => {
          setActiveTab("standings")
        }}
      >
        <StandingsIconSvg focused={isTabActive("standings")} />
        <Text
          style={[styles.tabTitle, isTabActive("standings") && styles.tabTitleActive]}
          tx="widgets.tabs.standings"
        />
        {isTabActive("standings") && <View style={styles.borderBottom} />}
      </Pressable>
      <Pressable
        style={styles.tab}
        onPress={() => {
          setActiveTab("team")
        }}
      >
        <TeamIconSvg focused={isTabActive("team")} />
        <Text
          style={[styles.tabTitle, isTabActive("team") && styles.tabTitleActive]}
          tx="widgets.tabs.team"
        />
        {isTabActive("team") && <View style={styles.borderBottom} />}
      </Pressable>
    </View>
  )
}

const useStyles = createUseStyles(() => ({
  goBackComponent: {
    position: "absolute",
    left: 24,
    bottom: 0,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "33.3%",
  },
  tabTitle: {
    fontFamily: typography.fonts.instrumentSans.medium,
    fontSize: 14,
    lineHeight: 16.8,
    color: "#98A2B3",
    marginLeft: 8,
  },
  tabTitleActive: {
    color: "#1A1F51",
  },
  borderBottom: {
    height: 2,
    backgroundColor: "#1A1F51",
    position: "absolute",
    bottom: -8,
    width: "100%",
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
}))

export default WidgetsScreenTabs
