import { FlashList } from "@shopify/flash-list"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text } from "app/components"
import { typography } from "app/theme"
import React from "react"
import { Image, View } from "react-native"

const AchievementList: React.FC = () => {
  const styles = useStyles()
  return (
    <FlashList
      data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
      horizontal
      renderItem={() => (
        <View style={styles.achievementItem}>
          <Image source={require("assets/temp/achivementLogo.png")} width={50} height={47} />
          <View style={styles.achievementTextContent}>
            <Text text="SAUDI PRO LEAGUE" style={styles.achievementItemTitle} />
            <Text text="SEASON 2023" style={styles.achievementItemValue} />
          </View>
        </View>
      )}
      estimatedItemSize={150}
      ItemSeparatorComponent={() => <View style={styles.achievementsItemSeparator} />}
    />
  )
}

const useStyles = createUseStyles(() => ({
  achievementItem: {
    backgroundColor: "#fff",
    borderRadius: 7,
    borderColor: "#0000001A",
    borderWidth: 0.5,
    flexDirection: "row",
    padding: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,

    elevation: 2,
  },
  achievementsItemSeparator: {
    width: 16,
  },
  achievementTextContent: {
    marginLeft: 8,
  },
  achievementItemTitle: {
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    fontSize: 16,
    letterSpacing: -0.32,
    color: "#101828",
    textTransform: "uppercase",
  },
  achievementItemValue: {
    fontFamily: typography.fonts.instrumentSansCondensed.medium,
    letterSpacing: -0.32,
    fontSize: 16,
    color: "#98A2B3",
    textTransform: "uppercase",
  },
}))

export default AchievementList
