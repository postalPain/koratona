import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { useStores } from "app/models"
import { useHeader } from "app/utils/useHeader"
import { observer } from "mobx-react-lite"
import React from "react"
import { ActivityIndicator, Image, View, ViewStyle } from "react-native"
import { FeedCard, Screen, Text } from "../../components"

import { FlashList } from "@shopify/flash-list"
import { Post } from "app/models/Posts/Post"
import { HomeFeedStackScreenProps } from "../../navigators/HomeStackNavigator"
import { spacing, typography } from "../../theme"
import useFetchPosts from "./hooks/posts"

const YouTubeIcon = require("assets/images/youtube.png")
const circleLogo = require("assets/images/circleLogo.png")

export const FeedScreen: React.FC<HomeFeedStackScreenProps<"feed">> = observer(function (_props) {
  const styles = useStyles()
  const { postsStore, authUser } = useStores()
  useFetchPosts()

  useHeader({
    rightIcon: "teamsIcon",
    LeftActionComponent: <View style={styles.headerLeftContentPlaceholder} />,
    rightIconSize: 32,
    children: <Image source={circleLogo} />,
    backgroundColor: "#fff",
  })

  const renderItem = React.useCallback(
    ({ item }: { item: Post }) => (
      <FeedCard
        onPress={() => _props.navigation.navigate("postDetails", { id: item.id })}
        bgImage={item.coverImageUrl}
        post={item}
        underTitleIcon={item.video ? YouTubeIcon : undefined}
        favoriteCount={item.favoriteCount}
        addedToFavorite={item.usersToFavoritePosts.some(
          (user) => user.userId === authUser.authUser.id,
        )}
        onFavoritePress={() => postsStore.toggleFavorite(item.id)}
      />
    ),
    [],
  )

  return (
    <Screen backgroundColor="#fff" preset="fixed" contentContainerStyle={$container}>
      {postsStore.isFetchingPostsErrored && (
        <Text text="Something went wrong, please try again..." />
      )}

      <FlashList
        data={[...postsStore.posts]}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onRefresh={postsStore.fetchPosts}
        refreshing={postsStore.isFetchingPosts}
        onEndReached={postsStore.fetchMorePosts}
        ListEmptyComponent={() => <Text preset="subheading" text="No posts yet..." />}
        extraData={JSON.stringify(postsStore.posts)}
        keyExtractor={(item) => item?.id?.toString()}
        onEndReachedThreshold={0.3}
        renderItem={renderItem}
        estimatedItemSize={448}
        ListFooterComponent={
          <>
            {postsStore.isFetchingMorePosts && (
              <View style={styles.fetchingMorePosts}>
                <ActivityIndicator color="#333865" />
                <Text style={styles.fetchingMorePostsText} text="Loading more posts..." />
              </View>
            )}
            {postsStore.postsCount > 0 &&
              !postsStore.postsPaginationMeta.hasNextPage &&
              !postsStore.isFetchingMorePosts && <Text weight="bold" text="No more posts" />}
          </>
        }
      />
    </Screen>
  )
})

const $container: ViewStyle = {
  paddingTop: spacing.xxl,
  paddingHorizontal: spacing.lg,
  flex: 1,
}

const useStyles = createUseStyles(() => ({
  headerLeftContentPlaceholder: {
    width: 52,
  },
  separator: {
    height: spacing.xl,
  },
  fetchingMorePosts: {
    paddingVertical: spacing.xl,
    textAlign: "center",
    justifyContent: "center",
  },
  fetchingMorePostsText: {
    textAlign: "center",
    color: "#333865",
    marginTop: spacing.sm,
    fontFamily: typography.fonts.instrumentSans.medium,
  },
}))
