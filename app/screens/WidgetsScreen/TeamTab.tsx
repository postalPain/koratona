import { useNavigation } from "@react-navigation/native"
import { FlashList } from "@shopify/flash-list"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text } from "app/components"
import { useStores } from "app/models"
import { spacing, typography } from "app/theme"
import { observer } from "mobx-react-lite"
import React from "react"
import {
  ActivityIndicator,
  DimensionValue,
  Pressable,
  View,
  useWindowDimensions,
} from "react-native"
import { Player } from "../../models/Player/Player"
import { PlayerCard } from "../Profile/components/PlayerCard"
import useFetchFavoritePlayerList from "../hooks/useGetFavoritePlayerList"
import useFetchPlayerList from "../hooks/useGetPlayerList"
import { NoMoreContent } from "app/components/NoMoreContent"

type Props = {
  height?: DimensionValue
}

export const TeamPlayersTab = observer(function (_props: Props) {
  const styles = useStyles()
  const navigation = useNavigation()
  const { playerStore } = useStores()

  useFetchPlayerList()
  useFetchFavoritePlayerList()

  const { width } = useWindowDimensions()

  return (
    <View
      style={{
        width,
        height: _props.height || "100%",
      }}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title} tx="teams.meetTeam" />
      </View>
      {playerStore.isPlayerListLoading && <Text style={styles.loadingText} tx="common.loading" />}
      {!playerStore.isPlayerListLoading && (
        <FlashList<Player>
          contentContainerStyle={styles.list}
          data={[...playerStore.playerList]}
          onRefresh={playerStore.fetchPlayerList}
          refreshing={playerStore.isPlayerListLoading}
          onEndReached={playerStore.fetchMorePlayers}
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
                  // @ts-ignore
                  navigation.navigate("player", { id: item.id })
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
          estimatedItemSize={228}
          extraData={JSON.stringify(playerStore.favoritePlayerList)}
          ListFooterComponent={
            <>
              {playerStore.isFetchingMorePlayers && (
                <View style={styles.fetchingMorePlayers}>
                  <ActivityIndicator color="#333865" />
                  <Text style={styles.fetchingMorePlayersText} tx="teams.loadingMorePlayers" />
                </View>
              )}
              {playerStore.paginationMeta.itemCount > 0 &&
                !playerStore.paginationMeta.hasNextPage &&
                !playerStore.isFetchingMorePlayers && <NoMoreContent />}
            </>
          }
        />
      )}
    </View>
  )
})

const useStyles = createUseStyles((theme) => ({
  fetchingMorePlayers: {
    paddingVertical: spacing.xl,
    textAlign: "center",
    justifyContent: "center",
  },
  fetchingMorePlayersText: {
    textAlign: "center",
    color: "#333865",
    marginTop: spacing.sm,
    fontFamily: typography.fonts.instrumentSans.medium,
  },
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
  loadingText: {
    marginLeft: 24,
    color: "#333865",
    fontFamily: typography.fonts.instrumentSans.medium,
  },
}))
