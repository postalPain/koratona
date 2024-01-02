import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text } from "app/components/Text"
import { Post } from "app/models/Posts/Post"
import { getPostCreationTime } from "app/utils/formatCreatedTime"
import { LinearGradient } from "expo-linear-gradient"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Image, ImageBackground, ImageSourcePropType, Pressable, View } from "react-native"
import { Icon } from "./Icon"
export interface FeedCardProps {
  /**
   *  Post entity
   */
  post: Post
  /**
   * Background image for the card
   */
  bgImage: any

  /**
   * Icon that will be displayed under the title
   */
  underTitleIcon?: ImageSourcePropType
  /**
   * Callback that fires when the user taps the card
   * @default undefined
   * @param event - React Native PressEvent
   * @returns void
   * @example onPress={event => console.log(event)}
   * */

  onPress?: () => void

  /**
   * If true, the card will be displayed as a favorite
   * @default false
   * @example addedToFavorite
   * */
  addedToFavorite?: boolean

  /**
   * Count of favorites
   * @default undefined
   * @example favoriteCount={23}
   * */
  favoriteCount?: number

  /**
   * Callback that fires when the user taps the favorite icon
   * @default undefined
   * @param event - React Native PressEvent
   * @returns void
   * @example onFavoritePress={event => console.log(event)}
   * */
  onFavoritePress?: () => void
}

/**
 * Describe your component here
 */
export const FeedCard = React.memo(
  observer(function FeedCard({
    post,
    bgImage,
    underTitleIcon,
    onPress,
    addedToFavorite,
    favoriteCount,
    onFavoritePress,
  }: FeedCardProps) {
    const styles = useStyles()

    return (
      <Pressable style={styles.container} onPress={onPress}>
        <ImageBackground
          style={styles.bgImage}
          resizeMode="cover"
          source={
            bgImage
              ? {
                  uri: bgImage,
                }
              : require("assets/temp/cardBg.png")
          }
        >
          <LinearGradient
            colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
            style={styles.gradient}
            start={{ x: 0.1, y: 0.3 }}
            end={{ x: 0.1, y: 0.7 }}
          >
            {underTitleIcon && <Image style={styles.underTitleIcon} source={underTitleIcon} />}
            {post?.title && <Text style={styles.heading} weight="bold" text={post.title} />}
          </LinearGradient>
        </ImageBackground>
        <View style={styles.footer}>
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.8)", "rgba(247, 247, 247, 1)"]}
            style={styles.footerGradient}
            start={{ x: 0.1, y: 0.3 }}
            end={{ x: 0.1, y: 0.7 }}
          >
            {!!post?.subtitle && <Text style={styles.subHeading} text={post.subtitle} />}
            <View style={styles.basement}>
              {!!post?.updatedAt && (
                <Text
                  style={styles.basementDate}
                  weight="medium"
                  text={getPostCreationTime(post.updatedAt)}
                />
              )}
              <View style={styles.likesContainer}>
                <Text style={styles.likesCounter} weight="medium" text={`${favoriteCount || ""}`} />
                <Pressable onPress={onFavoritePress}>
                  <Icon icon={addedToFavorite ? "heardIconFilled" : "heartIcon"} />
                </Pressable>
              </View>
            </View>
          </LinearGradient>
        </View>
      </Pressable>
    )
  }),
)

const useStyles = createUseStyles(() => ({
  container: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: "#E8E8E8",
  },
  bgImage: {
    height: 342,
    width: "100%",
  },
  gradient: {
    justifyContent: "flex-end",
    height: "100%",
    padding: 18,
  },
  heading: {
    textTransform: "uppercase",
    color: "#fff",
    fontSize: 36,
    lineHeight: 43,
  },
  underTitleIcon: {
    marginBottom: 18,
  },
  footer: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  footerGradient: {
    padding: 18,
  },
  subHeading: {
    color: "#475467",
    fontSize: 14,
    lineHeight: 16.5,
  },
  basement: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  basementDate: {
    color: "#D0D5DD",
    fontSize: 14,
    lineHeight: 16.5,
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  likesCounter: {
    color: "#D0D5DD",
    fontSize: 14,
    lineHeight: 16.8,
    marginRight: 4,
  },
}))
