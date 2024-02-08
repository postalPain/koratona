import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import CircularProgress from "@stryberventures/gaia-react-native.circular-progress"
import { Text } from "app/components"
import { GoBackComponent } from "app/components/GoBack"
import { getWritingDirection } from "app/i18n"
import { handleArLang } from "app/i18n/handleArLang"
import { useStores } from "app/models"
import { Post } from "app/models/Posts/Post"
import { typography } from "app/theme"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import HeartIconIcon from "assets/icons/svgs/HeartIcon"
import { LinearGradient } from "expo-linear-gradient"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { ImageBackground, Pressable, View, useWindowDimensions, Alert } from "react-native"
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
  const topInsets = useSafeAreaInsetsStyle(["top"])
  const bottomInsets = useSafeAreaInsetsStyle(["bottom"])
  const { width, height } = useWindowDimensions()
  const postId = _props.route.params.id;
  console.log(`post id: ${postId}`)
  Alert.alert('Post id', `Id is ${postId}`)
  const post = postsStore.getPostById(postId);

  useEffect(() => {
    if (!post) {
      postsStore.fetchPostById(postId);
    }
  }, [])

  const renderPostView = () => {
    const isPostAddedToFavorite = post?.usersToFavoritePosts.find(
      (user) => user.userId === authUserStore.user.userId,
    )
    return (
      <>
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
              {!!post && post[handleArLang<Post>("title")] && (
                <Text style={styles.heading} text={post[handleArLang<Post>("title")]} />
              )}
              {!!post && post[handleArLang<Post>("subtitle")] && (
                <Text style={styles.subHeading} text={post[handleArLang<Post>("subtitle")]} />
              )}
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.articleContainer}>
          {!!post && post[handleArLang<Post>("content")] && (
            <RenderHtml
              contentWidth={width}
              source={{
                html: post[handleArLang<Post>("content")] || "",
              }}
            />
          )}
          {post?.video && (
            <View style={styles.videoContainer}>
              <YoutubePlayer height={255} videoId={getYouTubeVideoId(post.video)} play={false} />
            </View>
          )}
          {!!post && post[handleArLang<Post>("quiz")] && (
            <View style={styles.quizContainer}>
              <WebView
                webviewDebuggingEnabled
                source={{ uri: post[handleArLang<Post>("quiz")] }}
                style={styles.webviewStyles}
              />
            </View>
          )}
        </View>
      </>
    )
  }

  const renderEmptyView = () => (
    <View style={styles.pageContainer}>
      <View style={styles.header}>
        <GoBackComponent
          color="#333"
          onPress={() => {
            _props.navigation.goBack()
          }}
        />
      </View>
      <View style={styles.containerCenter}>
        {postsStore.isFetchingPost ? (
          <CircularProgress />
        ) : (
          <Text tx="postDetailsScreen.notFound" />
        )}
      </View>
    </View>
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
          refreshing={postsStore.isFetchingPost}
          onRefresh={() => postsStore.fetchPostById(postId)}
        />
      }
    >
      {(!!post && !postsStore.isFetchingPostErrored)
        ? renderPostView()
        : renderEmptyView()
      }
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
    writingDirection: getWritingDirection(),
  },
  subHeading: {
    fontFamily: typography.fonts.instrumentSansSemiCondensed.regular,
    color: "#D0D5DD",
    fontSize: 14,
    lineHeight: 17,
    marginTop: 6,
    writingDirection: getWritingDirection(),
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
  pageContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  }
}))
