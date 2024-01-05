import { useNavigation } from "@react-navigation/native"
import { FlashList } from "@shopify/flash-list"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text } from "app/components"
import { useStores } from "app/models"
import { typography } from "app/theme"
import { observer } from "mobx-react-lite"
import React from "react"
import { Pressable, View, useWindowDimensions } from "react-native"
import { Player } from "../../models/Player/Player"
import { PlayerCard } from "../Profile/components/PlayerCard"
import useFetchFavoritePlayerList from "../hooks/useGetFavoritePlayerList"
import useFetchPlayerList from "../hooks/useGetPlayerList"

export const TeamPlayersTab = observer(function (_props) {
  const styles = useStyles()
  const navigation = useNavigation()
  const { playerStore } = useStores()

  useFetchPlayerList()
  useFetchFavoritePlayerList()

  const { height, width } = useWindowDimensions()

  return (
    <View
      style={{
        width,
        height: height - 250,
      }}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title} tx="teams.meetTeam" />
      </View>
      <FlashList<Player>
        contentContainerStyle={styles.list}
        data={[...playerStore.playerList]}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        numColumns={2}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item, index }) => (
          <View
            style={
              index % 2 === 0
                ? // eslint-disable-next-line react-native/no-inline-styles
                  {
                    paddingRight: 10,
                  }
                : // eslint-disable-next-line react-native/no-inline-styles
                  {
                    paddingLeft: 10,
                  }
            }
          >
            <Pressable
              onPress={() => {
                // navigation.navigate("player", { id: item.id })
              }}
            >
              <PlayerCard
                addedToFavorite={playerStore.isPlayerFavorited(item.id)}
                player={item}
                handleToggleFavorite={() => {
                  playerStore.togglePlayerFavorite(item.id)
                }}
              />
            </Pressable>
          </View>
        )}
        estimatedItemSize={220}
        extraData={JSON.stringify(playerStore.favoritePlayerList)}
      />
    </View>
  )
})

const useStyles = createUseStyles((theme) => ({
  title: {
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    letterSpacing: -0.64,
    fontSize: 32,
    lineHeight: 40,
    marginBottom: theme.spacing[24],
  },
  titleContainer: {
    paddingHorizontal: theme.spacing[24],
    paddingTop: theme.spacing[24],
  },
  separator: {
    height: theme.spacing[16],
  },
  list: {
    paddingHorizontal: 24,
  },
}))
