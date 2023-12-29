import { FlashList } from "@shopify/flash-list"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Screen, Text } from "app/components"
import { useStores } from "app/models"
import { spacing, typography } from "app/theme"
import { observer } from "mobx-react-lite"
import React from "react"
import { View } from "react-native"
import { Player } from "../../models/Player/Player"
import useFetchFavoritePlayerList from "../hooks/useGetFavoritePlayerList"
import useFetchPlayerList from "../hooks/useGetPlayerList"
import { ProfileStackScreenProps } from "./ProfileStackNavigator"
import { PlayerCard } from "./components/PlayerCard"

export const FavoritePlayersScreen: React.FC<ProfileStackScreenProps<"favoritePlayersScreen">> =
  observer(function (_props) {
    const styles = useStyles()
    const { playerStore } = useStores()

    useFetchPlayerList()
    useFetchFavoritePlayerList()


    return (
      <Screen preset="fixed" contentContainerStyle={styles.container}>
        {playerStore.isPlayerListErrored && (
          <Text text="Something went wrong, please try again..." />
        )}
        <Text style={styles.title} tx="profile.editFavoritePlayers" />
        <FlashList<Player>
          contentContainerStyle={styles.list}
          data={[...playerStore.playerList]}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          numColumns={2}
          keyExtractor={(item) => item?.id?.toString()}
          renderItem={({ item }) => (
            <PlayerCard
              addedToFavorite={playerStore.isPlayerFavorited(item.id)}
              player={item}
              handleToggleFavorite={() => {
                playerStore.togglePlayerFavorite(item.id)
              }}
            />
          )}
          estimatedItemSize={220}
          extraData={JSON.stringify(playerStore.playerList)}
        />
      </Screen>
    )
  })

const useStyles = createUseStyles((theme) => ({
  container: {
    paddingTop: spacing.xxl,
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    letterSpacing: -0.64,
    fontSize: 32,
    lineHeight: 40,
    marginBottom: theme.spacing[24],
  },
  separator: {
    height: theme.spacing[12],
  },
  fetchingMoreProducts: {
    paddingVertical: spacing.xl,
    textAlign: "center",
    justifyContent: "center",
  },
  fetchingMoreProductsText: {
    textAlign: "center",
    color: "#333865",
    marginTop: spacing.sm,
    fontFamily: typography.fonts.instrumentSans.medium,
  },
  noMoreProductsText: {
    textAlign: "center",
    color: "#333865",
    marginTop: spacing.sm,
    fontFamily: typography.fonts.instrumentSans.medium,
  },
  list: {
    paddingHorizontal: 24,
  },
}))
