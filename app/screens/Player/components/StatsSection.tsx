import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text } from "app/components"
import { typography } from "app/theme"
import React from "react"
import { View, ViewStyle } from "react-native"

type StatsItem = {
  title: string
  value: string | number | undefined
}

type Props = { data: StatsItem[]; title?: string; style?: ViewStyle }

export const StatsSection: React.FC<Props> = ({ data, title, style }) => {
  const styles = useStyles()

  return (
    <View style={[styles.statsSection, style]}>
      {title && <Text text={title} style={styles.statsSectionTitle} />}
      <View style={styles.statsStats}>
        {data.map((item, index) => (
          <View
            key={index}
            style={[
              styles.statsStatsItem,
              (index % 2 !== 0 || index === data.length - 1) &&
                data.length > 1 &&
                styles.statsStatsItemWithLeftBorder,
            ]}
          >
            <Text
              style={[
                styles.statsStatsItemValue,
                item?.value !== undefined && +item?.value === 0 && styles.inactiveItemValue,
              ]}
            >{`${item.value || "0"}`}</Text>
            <Text style={styles.statsStatsItemTitle}>{item.title}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const useStyles = createUseStyles(() => ({
  statsSection: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 50,
  },
  statsSectionTitle: {
    textAlign: "center",
    marginBottom: 24,
    fontFamily: typography.fonts.instrumentSansSemiCondensed.regularItalic,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 1.64,
    textTransform: "uppercase",
    color: "#98A2B3",
  },
  statsStats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  statsStatsItem: {
    alignItems: "center",
    minWidth: 115,
    paddingVertical: 20,
  },
  statsStatsItemWithLeftBorder: {
    borderLeftWidth: 0.5,
    borderLeftColor: "#0000001A",
  },
  statsStatsItemValue: {
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    fontSize: 28,
    lineHeight: 28,
    letterSpacing: -0.56,
    color: "#101828",
  },
  statsStatsItemTitle: {
    fontFamily: typography.fonts.instrumentSansCondensed.medium,
    fontSize: 16,
    lineHeight: 20,
    color: "#98A2B3",
    textTransform: "uppercase",
    marginTop: 2,
  },
  inactiveItemValue: {
    color: "#D0D5DD",
  },
}))
