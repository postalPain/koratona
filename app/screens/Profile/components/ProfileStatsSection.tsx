import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text } from "app/components"
import { useStores } from "app/models"
import { typography } from "app/theme"
import { observer } from "mobx-react-lite"
import React from "react"
import { View } from "react-native"

export const ProfileStatsSection = observer(function () {
  const styles = useStyles()
  const {
    authUserStore: { user },
  } = useStores()

  return (
    <View style={styles.playerDescription}>
      <Text
        style={styles.playerDescriptionText}
        text={`${user.firstName} is one of our most passionate fans. The 21 year old’s Koratona x Al Hilal debut was on 5 Jan 2023.`}
      />
      <View style={styles.playerStats}>
        <View style={[styles.playerStatsInfoBox, styles.playerStatsInfoBoxFirstChild]}>
          <Text style={styles.playerStatsValueText} text="26" />
          <Text style={styles.playerStatsTitleText} tx="profile.age" />
        </View>
        <View style={styles.playerStatsInfoBox}>
          <Text style={styles.playerStatsValueText} text="Jan 2, 2024" />
          <Text style={styles.playerStatsTitleText} tx="profile.memberSince" />
        </View>
      </View>
    </View>
  )
})

const useStyles = createUseStyles((theme) => ({
  playerDescription: {
    padding: theme.spacing[24],
  },
  playerDescriptionText: {
    textAlign: "center",
    color: "#475467",
    fontSize: 14,
    lineHeight: 20,
    paddingBottom: 36,
  },
  playerStats: {
    borderColor: "rgba(0, 0, 0, 0.10)",
    borderWidth: 0.5,
    flexDirection: "row",
  },
  playerStatsInfoBoxFirstChild: {
    borderRightColor: "rgba(0, 0, 0, 0.10)",
    borderRightWidth: 0.5,
  },
  playerStatsInfoBox: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  playerStatsValueText: {
    color: "#101828",
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    fontSize: 24,
    letterSpacing: -0.48,
    textAlign: "center",
  },
  playerStatsTitleText: {
    color: "#98A2B3",
    fontFamily: typography.fonts.instrumentSansCondensed.medium,
    textTransform: "uppercase",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
}))
