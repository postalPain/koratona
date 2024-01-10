import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import React from "react"
import { View } from "react-native"

import { Text } from "app/components"
import LinearProgressBar from "app/components/LinearProgressBar"
import { typography } from "app/theme"

type Props = {
  textContent: {
    left: string
    right: {
      currentNumber: number
      totalNumber: number
    }
  }
  value: number
}

export const LinearProgressComposition: React.FC<Props> = ({ value, textContent }) => {
  const styles = useStyles()

  return (
    <View style={styles.contentContainer}>
      <View style={[styles.rowDirection, styles.textContentContainer]}>
        <Text text={textContent.left} style={styles.title} />
        <View style={styles.rowDirection}>
          <Text text={`${value}`} style={styles.valuePercentageText} />
          <Text text="%" style={styles.valuePercentageSymbol} />
        </View>
        <View style={styles.rowDirection}>
          <Text text={`${textContent.right.currentNumber}`} style={styles.numberTextDark} />
          <Text text="/" style={styles.numberTextLight} />
          <Text text={`${textContent.right.totalNumber}`} style={styles.numberTextLight} />
        </View>
      </View>
      <LinearProgressBar value={value} />
    </View>
  )
}

const useStyles = createUseStyles(() => ({
  contentContainer: {
    width: "100%",
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  rowDirection: {
    flexDirection: "row",
  },
  textContentContainer: {
    justifyContent: "space-between",
  },
  title: {
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    textTransform: "uppercase",
    letterSpacing: -0.4,
    fontSize: 16,
    width: 100,
  },
  valuePercentageSymbol: {
    textTransform: "uppercase",
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    letterSpacing: -0.4,
    fontSize: 14,
    color: "#C8B2AC",
  },
  valuePercentageText: {
    textTransform: "uppercase",
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    letterSpacing: -0.4,
    fontSize: 20,
    color: "#C8B2AC",
  },
  numberTextLight: {
    fontFamily: typography.fonts.instrumentSansCondensed.regular,
    letterSpacing: -0.48,
    fontSize: 24,
    color: "#D0D5DD",
  },
  numberTextDark: {
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    letterSpacing: -0.48,
    fontSize: 24,
    color: "#101828",
  },
}))
