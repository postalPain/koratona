import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text } from "app/components"
import { GoBackComponent } from "app/components/GoBack"
import { useStores } from "app/models"
import { typography } from "app/theme"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import HeartIconIcon from "assets/icons/svgs/HeartIcon"
import { LinearGradient } from "expo-linear-gradient"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ImageBackground, Pressable, View, useWindowDimensions } from "react-native"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import RenderHtml from "react-native-render-html"
import { WebView } from "react-native-webview"
import YoutubePlayer from "react-native-youtube-iframe"
import { HomeFeedStackScreenProps } from "../../navigators/HomeStackNavigator"
import { getYouTubeVideoId } from "../Onboarding/utils/getYouTubeVideoId"

interface PostDetailsScreenProps extends HomeFeedStackScreenProps<"postDetails"> {}

export const PostDetailsScreen: FC<PostDetailsScreenProps> = observer(function PostDetailsScreen(
  _props,
) {
  const styles = useStyles()
  const { postsStore, authUserStore } = useStores()
  const post = postsStore.getPostById(_props.route.params.id)
  const topInsets = useSafeAreaInsetsStyle(["top"])
  const bottomInsets = useSafeAreaInsetsStyle(["bottom"])
  const { width, height } = useWindowDimensions()
  const isPostAddedToFavorite = post?.usersToFavoritePosts.find(
    (user) => user.userId === authUserStore.user.userId,
  )

  return (
    <ScrollView
      contentContainerStyle={[
        bottomInsets,
        topInsets,
        styles.contentContainerStyle,
        { minHeight: height - 100 },
      ]}
      refreshControl={
        <RefreshControl
          refreshing={postsStore.isFetchingPosts}
          onRefresh={() => postsStore.fetchPostById(_props.route.params.id)}
        />
      }
    >
      <ImageBackground
        style={styles.bgImage}
        source={
          post?.coverImageUrl ? { uri: post?.coverImageUrl } : require("assets/temp/cardBg.png")
        }
        resizeMode="cover"
      >
        <LinearGradient
          colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
          style={styles.gradient}
          start={{ x: 0.1, y: 0.3 }}
          end={{ x: 0.1, y: 0.7 }}
        >
          <LinearGradient
            colors={["transparent", "rgba(0, 0, 0, 0.7)"]}
            end={{ x: 0.1, y: 0.1 }}
            start={{ x: 0.1, y: 0.9 }}
          >
            <View style={styles.header}>
              <GoBackComponent
                color="#fff"
                onPress={() => {
                  _props.navigation.goBack()
                }}
              />
              <Pressable
                onPress={() => {
                  if (post) {
                    postsStore.toggleFavorite(post.id)
                  }
                }}
                style={styles.favoriteInfoContainer}
              >
                <Text
                  style={[
                    styles.favoriteCountText,
                    isPostAddedToFavorite && styles.favoriteCountTextHighlighted,
                  ]}
                  text={`${post?.favoriteCount || ""}`}
                />
                <HeartIconIcon focused={!!isPostAddedToFavorite} />
              </Pressable>
            </View>
          </LinearGradient>
          <View style={styles.headerText}>
            {!!post?.title && <Text style={styles.heading} text={post.title} />}
            {!!post?.subtitle && <Text style={styles.subHeading} text={post.subtitle} />}
          </View>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.articleContainer}>
        {!!post?.content && (
          <RenderHtml
            contentWidth={width}
            source={{
              html: post?.content || "",
            }}
          />
        )}
        {post?.video && (
          <View style={styles.videoContainer}>
            <YoutubePlayer height={255} videoId={getYouTubeVideoId(post.video)} play={false} />
          </View>
        )}
        {post?.quiz && (
          <View style={styles.quizContainer}>
            <WebView
              webviewDebuggingEnabled
              source={{ uri: post.quiz }}
              style={styles.webviewStyles}
            />
          </View>
        )}
      </View>
    </ScrollView>
  )
})

const useStyles = createUseStyles(() => ({
  leftHeaderComponentText: {
    paddingLeft: 8,
    color: "#B3BCCB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    paddingHorizontal: 18,
  },
  screenContainer: {
    height: "100%",
  },
  bgImage: {
    height: 342,
    width: "100%",
  },
  gradient: {
    justifyContent: "space-between",
    height: "100%",
  },
  heading: {
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    textTransform: "uppercase",
    color: "#fff",
    fontSize: 48,
    lineHeight: 56,
    letterSpacing: -0.96,
  },
  subHeading: {
    fontFamily: typography.fonts.instrumentSansSemiCondensed.regular,
    color: "#D0D5DD",
    fontSize: 14,
    lineHeight: 17,
    marginTop: 6,
  },
  articleContainer: {
    padding: 24,
  },
  quizContainer: {
    height: 500,
    width: "auto",
  },
  videoContainer: {
    marginVertical: 24,
  },
  webviewStyles: {
    opacity: 0.99,
    overflow: "hidden",
  },
  headerText: {
    paddingHorizontal: 18,
    paddingBottom: 18,
  },
  contentContainerStyle: {
    backgroundColor: "#fff",
    overflowY: "scroll",
  },
  favoriteCountText: {
    fontFamily: typography.fonts.instrumentSans.medium,
    color: "#98A2B3",
    fontSize: 14,
    lineHeight: 16.8,
    marginRight: 4,
  },
  favoriteCountTextHighlighted: {
    color: "#DD5644",
  },
  favoriteInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
}))
