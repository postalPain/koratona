import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Icon, Screen, Text } from "app/components"
import { useStores } from "app/models"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
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
  const { width } = useWindowDimensions()
  const isPostAddedToFavorite = post?.usersToFavoritePosts.find(
    (user) => user.userId === authUserStore.user.id,
  )

  return (
    <ScrollView
      contentContainerStyle={[styles.scrollViewContainer, bottomInsets, topInsets]}
      refreshControl={
        <RefreshControl
          refreshing={postsStore.isFetchingPosts}
          onRefresh={() => postsStore.fetchPostById(_props.route.params.id)}
        />
      }
    >
      <Screen preset="scroll" style={styles.screenContainer}>
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
            <View style={styles.header}>
              <Pressable style={styles.leftHeaderComponent} onPress={_props.navigation.goBack}>
                <Icon icon="back" color="#B3BCCB" />
                <Text text="Go back" style={styles.leftHeaderComponentText} />
              </Pressable>
              <Pressable
                onPress={() => {
                  if (post) {
                    postsStore.toggleFavorite(post.id)
                  }
                }}
              >
                <Icon icon={isPostAddedToFavorite ? "heardIconFilled" : "heartIcon"} />
              </Pressable>
            </View>
            <View>
              {!!post?.title && <Text style={styles.heading} weight="bold" text={post.title} />}
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
                onError={(e) => {
                  console.log("onError", e)
                }}
                onHttpError={(e) => {
                  console.log("onHttpError", e)
                }}
                style={styles.webviewStyles}
              />
            </View>
          )}
        </View>
      </Screen>
    </ScrollView>
  )
})

const useStyles = createUseStyles(() => ({
  leftHeaderComponent: {
    flexDirection: "row",
    justifyContent: "center",
  },
  leftHeaderComponentText: {
    paddingLeft: 8,
    color: "#B3BCCB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
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
    padding: 18,
  },
  heading: {
    textTransform: "uppercase",
    color: "#fff",
    fontSize: 36,
    lineHeight: 43,
  },
  subHeading: {
    color: "#D0D5DD",
    fontSize: 14,
    lineHeight: 17,
    marginTop: 6,
  },
  scrollViewContainer: {
    // flex: 1,
    // height: "100%",
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
}))
