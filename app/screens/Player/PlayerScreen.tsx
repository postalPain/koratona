import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Screen } from "app/components"
import { useStores } from "app/models"
import { typography } from "app/theme"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { HomeFeedStackScreenProps } from "../../navigators/HomeStackNavigator"
import TopContentContainer from "./components/TopContentContainer"
import { Pressable, View } from "react-native"
import { GoBackComponent } from "app/components/GoBack"
import HeartIconIcon from "assets/icons/svgs/HeartIcon"

interface PlayerScreenProps extends HomeFeedStackScreenProps<"player"> {}

export const PlayerScreen: FC<PlayerScreenProps> = observer(function (_props) {
  const styles = useStyles()
  const playerId = _props.route.params.id
  const { playerStore } = useStores()
  const player = playerStore.getPlayerById(playerId)

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} style={styles.screenContainer}>
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
}))
