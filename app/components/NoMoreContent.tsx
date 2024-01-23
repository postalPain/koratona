import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import * as React from "react"
import { View } from "react-native"
import CheckDoneGrayIcon from "../../assets/icons/svgs/CheckDoneGrayIcon"
import { Text } from "./Text"
import { typography } from "../theme/typography"

export const NoMoreContent = () => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <View style={styles.linesContainer}>
        <View style={styles.line} />
        <View style={styles.iconContainer}>
          <CheckDoneGrayIcon />
        </View>
        <View style={styles.line} />
      </View>
      <Text tx="common.thatAllForNow" style={styles.title} />
      <Text tx="common.youSeeAllContent" style={styles.subTitle} />
    </View>
  )
}

const useStyles = createUseStyles(() => ({
  container: {
    backgroundColor: "transparent",
    marginVertical: 50,
  },
  linesContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 20,
  },
  line: {
    height: 1,
    width: 48,
    backgroundColor: "#B3B4C5",
    marginVertical: 10,
  },
  iconContainer: {
    marginHorizontal: 12,
  },
  title: {
    fontFamily: typography.fonts.instrumentSansSemiCondensed.semiBold,
    textAlign: "center",
    fontSize: 16,
    letterSpacing: -0.32,
    color: "#121212",
    marginBottom: 6,
  },
  subTitle: {
    fontFamily: typography.fonts.instrumentSans.regular,
    textAlign: "center",
    fontSize: 12,
    color: "#606770",
    lineHeight: 14,
  },
}))
