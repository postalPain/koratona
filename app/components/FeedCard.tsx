import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text } from "app/components/Text"
import { Post } from "app/models/Posts/Post"
import { typography } from "app/theme"
import { getPostCreationTime } from "app/utils/formatCreatedTime"
import { LinearGradient } from "expo-linear-gradient"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Image, ImageBackground, ImageSourcePropType, Pressable, View } from "react-native"
import HeartIconIcon from "../../assets/icons/svgs/HeartIcon"
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
          {!!post?.subtitle && <Text style={styles.subHeading} text={post.subtitle} />}
          <View style={styles.basement}>
            {!!post?.updatedAt && (
              <Text style={styles.basementText} text={getPostCreationTime(post.updatedAt)} />
            )}
            <Pressable style={styles.likesContainer} onPress={onFavoritePress}>
              <Text style={styles.basementText} weight="medium" text={`${favoriteCount || ""}`} />
              <HeartIconIcon focused={addedToFavorite} />
            </Pressable>
          </View>
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
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    textTransform: "uppercase",
    color: "#fff",
    fontSize: 36,
    lineHeight: 36,
    letterSpacing: -0.32,
  },
  underTitleIcon: {
    marginBottom: 18,
  },
  footer: {
    padding: 18,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#fff',
  },
  subHeading: {
    color: "#475467",
    fontSize: 14,
    lineHeight: 16.8,
    fontFamily: typography.fonts.instrumentSans.regular,
  },
  basement: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  basementText: {
    fontFamily: typography.fonts.instrumentSans.medium,
    color: "#98A2B3",
    fontSize: 14,
    lineHeight: 16.8,
    marginRight: 4,
  },
}))
