import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { useStores } from "app/models"
import { useHeader } from "app/utils/useHeader"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { FlatList, Image, View, ViewStyle } from "react-native"
import { FeedCard, Screen, Text } from "../../components"

import { spacing } from "../../theme"
import { HomeFeedStackScreenProps } from "./HomeScreen"

const YouTubeIcon = require("assets/images/youtube.png")
const circleLogo = require("assets/images/circleLogo.png")

export const FeedScreen: FC<HomeFeedStackScreenProps<"feed">> = observer(function DemoDebugScreen(
  _props,
) {
  const styles = useStyles()
  const { postsStore } = useStores()

  useHeader({
    rightIcon: "teamsIcon",
    LeftActionComponent: <View style={styles.headerLeftContentPlaceholder} />,
    rightIconSize: 32,
    children: <Image source={circleLogo} />,
    backgroundColor: "#fff",
  })
  useEffect(() => {
    postsStore.fetchPosts()
  }, [])

  return (
    <Screen backgroundColor="#fff" preset="fixed" contentContainerStyle={$container}>
      {postsStore.isFetchingPostsErrored && (
        <Text text="Something went wrong, please try again..." />
      )}

      <FlatList
        data={postsStore.posts}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onEndReachedThreshold={0.2}
        onRefresh={postsStore.fetchPosts}
        refreshing={postsStore.isFetchingPosts}
        onEndReached={postsStore.fetchMorePosts}
        ListEmptyComponent={() => <Text preset="subheading" text="No posts yet..." />}
        extraData={postsStore.postsCount}
        renderItem={({ item }) => (
          <FeedCard
            onPress={() => _props.navigation.navigate("postDetails", { id: item.id })}
            bgImage={item.coverImageUrl}
            post={item}
            underTitleIcon={item.video ? YouTubeIcon : undefined}
          />
        )}
      />
      {postsStore.isFetchingMorePosts && <Text text="Loading..." />}
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
}))
