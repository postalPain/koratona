import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text } from "app/components/Text"
import { getWritingDirection } from "app/i18n"
import { handleArLang } from "app/i18n/handleArLang"
import { Post } from "app/models/Posts/Post"
import { typography, typographyPresets } from "app/theme"
import { getPostCreationTime } from "app/utils/formatCreatedTime"
import { LinearGradient } from "expo-linear-gradient"
import { observer } from "mobx-react-lite"
import * as React from "react"
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  View,
  ViewStyle,
  useWindowDimensions,
} from "react-native"
import RenderHtml from "react-native-render-html"
import HeartIconIcon from "../../assets/icons/svgs/HeartIcon"
import { isRTL } from "../i18n/getIsRTL"

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
   * Root element styles
   */
  style?: ViewStyle

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
    style,
  }: FeedCardProps) {
    const styles = useStyles()
    const { width } = useWindowDimensions()

    return (
      <Pressable style={[styles.containerWrapper, style]} onPress={onPress}>
        <View style={styles.container}>
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
              {post && post[handleArLang<Post>("title")] && (
                <Text style={styles.heading} text={post[handleArLang<Post>("title")]} />
              )}
            </LinearGradient>
          </ImageBackground>
          <View style={styles.footer}>
            {!!post && post[handleArLang<Post>("subtitle")] && (
              <RenderHtml
                contentWidth={width}
                source={{
                  html: `<p>${post[handleArLang<Post>("subtitle")]}</p>`,
                }}
                tagsStyles={{
                  p: {
                    color: "#475467",
                    ...(isRTL()
                      ? typographyPresets["p2-regular"]
                      : {
                          fontSize: 14,
                          lineHeight: 16.8,
                          fontFamily: typography.fonts.instrumentSans.regular,
                        }),
                    writingDirection: getWritingDirection(),
                  },
                }}
              />
            )}
            <View style={styles.basement}>
              {!!post?.updatedAt && (
                <Text style={styles.basementText} text={getPostCreationTime(post.updatedAt)} />
              )}
              <Pressable style={styles.likesContainer} onPress={onFavoritePress}>
                <Text
                  style={[
                    styles.basementText,
                    addedToFavorite && styles.favoriteCounterHighlighted,
                  ]}
                  text={`${favoriteCount || ""}`}
                />
                <HeartIconIcon focused={addedToFavorite} />
              </Pressable>
            </View>
          </View>
        </View>
      </Pressable>
    )
  }),
)

const useStyles = createUseStyles(() => ({
  containerWrapper: {
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
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
    ...(isRTL()
      ? typographyPresets["h4-bold"]
      : {
          fontFamily: typography.fonts.instrumentSansCondensed.bold,
          fontSize: 36,
          letterSpacing: -0.32,
        }),
    lineHeight: 36,
    textTransform: "uppercase",
    color: "#fff",
    writingDirection: getWritingDirection(),
  },
  underTitleIcon: {
    marginBottom: 18,
  },
  footer: {
    padding: 18,
    paddingTop: 8,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
  favoriteCounterHighlighted: {
    color: "#DD5644",
  },
}))
