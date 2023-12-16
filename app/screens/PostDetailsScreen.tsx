import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Icon, Screen, Text } from "app/components"
import { LinearGradient } from "expo-linear-gradient"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ImageBackground, Pressable, View } from "react-native"
import { HomeFeedStackScreenProps } from "./Home/HomeScreen"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import { WebView } from "react-native-webview"
import YoutubePlayer from "react-native-youtube-iframe"

interface PostDetailsScreenProps extends HomeFeedStackScreenProps<"postDetails"> {}

export const PostDetailsScreen: FC<PostDetailsScreenProps> = observer(function PostDetailsScreen(
  _props,
) {
  const styles = useStyles()
  const { postsStore } = useStores()
  const post = postsStore.getPostById(_props.route.params.id)
  const headerInsets = useSafeAreaInsetsStyle(["top"])
  const bottomInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <ScrollView
      contentContainerStyle={[styles.scrollViewContainer, bottomInsets]}
      refreshControl={
        <RefreshControl
          refreshing={postsStore.isFetchingPosts}
          onRefresh={() => postsStore.fetchPostById(_props.route.params.id)}
          progressBackgroundColor="pink"
        />
      }
    >
      <Screen preset="scroll" style={styles.screenContainer}>
        <ImageBackground
          style={styles.bgImage}
          source={
            post?.coverImageUrl ? { uri: post?.coverImageUrl } : require("assets/temp/cardBg.png")
          }
        >
          <LinearGradient
            colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
            style={[styles.gradient, headerInsets]}
            start={{ x: 0.1, y: 0.3 }}
            end={{ x: 0.1, y: 0.7 }}
          >
            <View style={styles.header}>
              <Pressable style={styles.leftHeaderComponent} onPress={_props.navigation.goBack}>
                <Icon icon="back" color="#98A2B3" />
                <Text text="Go back" style={styles.leftHeaderComponentText} />
              </Pressable>
              <Icon icon="heartIcon" color="#98A2B3" />
            </View>
            <View>
              {!!post?.title && <Text style={styles.heading} weight="bold" text={post.title} />}
              {!!post?.subtitle && <Text style={styles.subHeading} text={post.subtitle} />}
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.articleContainer}>
          {!!post?.content && <Text text={post?.content} />}
          <View style={styles.videoContainer}>
            <YoutubePlayer height={255} videoId="gYYra2xpoN8" play={false} />
          </View>
          <View style={styles.quizContainer}>
            <WebView source={{ uri: "https://tally.so/r/mJO0DJ" }} />
          </View>
        </View>
      </Screen>
    </ScrollView>
  )
})

const useStyles = createUseStyles(() => ({
  leftHeaderComponent: {
    flexDirection: "row",
  },
  leftHeaderComponentText: {
    paddingLeft: 8,
    color: "#98A2B3",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
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
    paddingTop: 40,
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
    flex: 1,
    height: "100%",
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
}))
