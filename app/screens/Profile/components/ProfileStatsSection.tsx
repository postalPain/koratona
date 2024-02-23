import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text } from "app/components"
import { isRTL } from "app/i18n"
import { useStores } from "app/models"
import { typography } from "app/theme"
import { observer } from "mobx-react-lite"
import React from "react"
import { View } from "react-native"
import { typographyPresets } from "../../../theme/typography"

export const ProfileStatsSection = observer(function () {
  const styles = useStyles()
  const {
    authUserStore: { user },
    teamStore: { favoriteTeam },
  } = useStores()

  return (
    <View style={styles.playerDescription}>
      <Text
        style={styles.playerDescriptionText}
        tx="profile.descriptionComposition"
        txOptions={{
          name: user.firstName,
          age: user.ageYears,
          favoriteTeam: favoriteTeam.name,
          appName: process.env.EXPO_PUBLIC_APP_NAME,
          debutDate: user.joinedDateFormatted,
        }}
      />
      <View style={styles.playerStats}>
        <View style={[styles.playerStatsInfoBox, styles.playerStatsInfoBoxFirstChild]}>
          <Text style={styles.playerStatsValueText} text={`${user.ageYears || ""}`} />
          <Text style={styles.playerStatsTitleText} tx="profile.age" />
        </View>
        {user.joinedDateFormatted && (
          <View style={[styles.playerStatsInfoBox, styles.playerStatsInfoBoxLastChild]}>
            <Text style={styles.playerStatsValueText} text={user.joinedDateFormatted} />
            <Text style={styles.playerStatsTitleText} tx="profile.memberSince" />
          </View>
        )}
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
    paddingBottom: 36,
    ...typographyPresets["p2-regular"],
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
  playerStatsInfoBoxLastChild: {
    flex: 1,
  },
  playerStatsInfoBox: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  playerStatsValueText: {
    color: "#101828",
    textAlign: "center",
    ...(isRTL()
      ? typographyPresets["p1-medium"]
      : {
          fontFamily: typography.fonts.instrumentSansCondensed.bold,
          fontSize: 24,
          lineHeight: 32,
          letterSpacing: -0.48,
        }),
  },
  playerStatsTitleText: {
    color: "#98A2B3",
    textAlign: "center",
    textTransform: "uppercase",
    ...(isRTL()
      ? typographyPresets["p2-semibold"]
      : {
          fontFamily: typography.fonts.instrumentSansCondensed.medium,
          fontSize: 14,
          lineHeight: 20,
        }),
  },
}))
