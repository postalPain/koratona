import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text } from "app/components"
import { isRTL } from "app/i18n"
import { typography } from "app/theme"
import CircularProgress from "assets/icons/svgs/CircularProgress"
import React from "react"
import { View } from "react-native"

type Props = {
  title: string
  value: number
  total?: number
  emptyColor?: string
  filledColor?: string
  avoidPercentage?: boolean
}

export const CircularProgressComposition: React.FC<Props> = ({
  title,
  value,
  total,
  avoidPercentage,
  emptyColor,
  filledColor,
}) => {
  const styles = useStyles()

  return (
    <View style={styles.circularProgressContentContainer}>
      <CircularProgress
        value={value}
        customEmptyColor={emptyColor}
        customFilledColor={filledColor}
        total={total}
      />
      <View style={styles.circularProgressTopContentWrapper}>
        <View style={styles.circularProgressValueContent}>
          <Text
            text={`${total !== undefined ? total : value}`}
            style={styles.circularProgressText}
          />
          {!avoidPercentage && <Text text="%" style={styles.circularProgressPercent} />}
        </View>
        <View style={styles.circularProgressValueContent}>
          <Text text={title} style={styles.circularProgressTitle} />
        </View>
      </View>
    </View>
  )
}

const useStyles = createUseStyles(() => ({
  circularProgressContentContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: 115,
  },
  circularProgressText: {
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    fontSize: 28,
    lineHeight: 28,
    letterSpacing: -0.56,
    color: "#101828",
  },
  circularProgressPercent: {
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: -0.32,
    color: "#101828",
  },
  circularProgressTitle: {
    fontFamily: typography.fonts.instrumentSansCondensed.medium,
    fontSize: 16,
    lineHeight: 17,
    letterSpacing: -0.32,
    color: "#98A2B3",
    textTransform: "uppercase",
    width: 77,
    textAlign: "center",
  },
  circularProgressTopContentWrapper: {
    position: "absolute",
    top: "30%",
    left: isRTL() ? "10%" : "27%",
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
  circularProgressValueContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
}))
