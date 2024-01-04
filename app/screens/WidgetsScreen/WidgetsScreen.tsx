import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Screen } from "app/components"
import { GoBackComponent } from "app/components/GoBack"
import LogoSmallIcon from "assets/icons/svgs/logo/LogoSmallIcon"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View } from "react-native"
import { HomeFeedStackScreenProps } from "../../navigators/HomeStackNavigator"
import { TeamPlayersTab } from "./TeamTab"
import WidgetsScreenTabs from "./components/WidgetTabs"
import { ScheduleWidget } from "./widgetsContent/ScheduleWidget"
import { TeamStandingsWidget } from "./widgetsContent/TeamStandingsWidget"

interface WidgetsScreenProps extends HomeFeedStackScreenProps<"widgets"> {}
export type WidgetTabVariants = "fixtures" | "standings" | "team"

export const WidgetsScreen: FC<WidgetsScreenProps> = observer(function WidgetsScreen(_props) {
  const styles = useStyles()
  const [activeTab, setActiveTab] = React.useState<WidgetTabVariants>("fixtures")

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} style={styles.screenContainer}>
      <View style={styles.headerWrapper}>
        <GoBackComponent
          style={styles.goBackComponent}
          onPress={() => {
            _props.navigation.goBack()
          }}
        />
        <LogoSmallIcon />
      </View>
      <WidgetsScreenTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <View style={styles.webViewWrapper}>
        {activeTab === "fixtures" && (
          <ScheduleWidget
            onMatchPress={(fixtureId) => {
              _props.navigation.navigate("matchCenter", { fixtureId })
            }}
          />
        )}
        {activeTab === "standings" && <TeamStandingsWidget />}
        {activeTab === "team" && <TeamPlayersTab />}
      </View>
    </Screen>
  )
})

const useStyles = createUseStyles(() => ({
  screenContainer: {
    height: "100%",
    flex: 1,
  },
  headerWrapper: {
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "center",
  },
  goBackComponent: {
    position: "absolute",
    left: 24,
    bottom: 0,
  },
  webViewWrapper: {
    paddingHorizontal: 24,
    alignSelf: "center",
    paddingBottom: 140,
  },
}))
