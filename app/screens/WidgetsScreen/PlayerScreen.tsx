import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Icon, Screen } from "app/components"
import { GoBackComponent } from "app/components/GoBack"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Pressable, View } from "react-native"
import { HomeFeedStackScreenProps } from "../../navigators/HomeStackNavigator"

interface PlayerScreenProps extends HomeFeedStackScreenProps<"player"> {}

export const PlayerScreen: FC<PlayerScreenProps> = observer(function (_props) {
  const styles = useStyles()
  const playerId = _props.route.params.id
  const { playerStore } = useStores()

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} style={styles.screenContainer}>
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
          <Icon icon={playerStore.isPlayerFavorited(playerId) ? "heardIconFilled" : "heartIcon"} />
        </Pressable>
      </View>
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
  },
}))
