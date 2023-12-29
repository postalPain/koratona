import { FlashList } from "@shopify/flash-list"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Screen, Text } from "app/components"
import { spacing, typography } from "app/theme"
import { observer } from "mobx-react-lite"
import React, { useCallback } from "react"
import { View } from "react-native"
import { ProfileStackScreenProps } from "./ProfileStackNavigator"
import { PlayerCard } from "./components/PlayerCard"

export const FavoritePlayersScreen: React.FC<ProfileStackScreenProps<"favoritePlayersScreen">> =
  observer(function (_props) {
    const styles = useStyles()

    const renderItem = useCallback(({ item }) => {
      return <PlayerCard player={item} />
    }, [])

    return (
      <Screen preset="fixed" contentContainerStyle={styles.container}>
        {/* {productsStore.isFetchingProductsErrored && (
          <Text text="Something went wrong, please try again..." />
        )} */}
        <Text style={styles.title} tx="profile.editFavoritePlayers" />
        <FlashList
          contentContainerStyle={styles.list}
          data={[
            {
              id: 1,
              name: "Nasser Al-Dawsari",
              number: 19,
            },
            {
              id: 2,
              name: "Saud Abdulhamid",
              number: 87,
            },
            {
              id: 3,
              name: "Abdullah Al-Mayouf",
              number: 14,
            },
            {
              id: 4,
              name: "Abdullah Al-Hamdan",
              number: 12,
            },
            {
              id: 5,
              name: "Abdullah Al-Hamdan",
              number: 11,
            },
          ]}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          // onRefresh={productsStore.fetchProducts}
          // refreshing={productsStore.isFetchingProducts}
          // onEndReached={productsStore.fetchMoreProducts}
          // ListEmptyComponent={() =>
          //   !productsStore.fetchProducts && <Text preset="subheading" text="No products yet..." />
          // }
          numColumns={2}
          keyExtractor={(item) => item?.id?.toString()}
          onEndReachedThreshold={0.3}
          renderItem={renderItem}
          estimatedItemSize={220}
          // ListFooterComponent={
          //   <>
          //     {productsStore.isFetchingMoreProducts && (
          //       <View style={styles.fetchingMoreProducts}>
          //         <ActivityIndicator color="#333865" />
          //         <Text style={styles.fetchingMoreProductsText} text="Loading more posts..." />
          //       </View>
          //     )}
          //     {productsStore.productPaginationMeta.itemCount > 0 &&
          //       !productsStore.productPaginationMeta.hasNextPage &&
          //       !productsStore.isFetchingMoreProducts && (
          //         <Text weight="medium" style={styles.noMoreProductsText} text="No more posts" />
          //       )}
          //   </>
          // }
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
