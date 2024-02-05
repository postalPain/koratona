import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Screen, Text } from "app/components"
import { GoBackComponent } from "app/components/GoBack"
import { useStores } from "app/models"
import { spacing, typography } from "app/theme"
import { observer } from "mobx-react-lite"
import React from "react"
import { Platform } from "react-native"
import { TeamPlayersTab } from "../WidgetsScreen/TeamTab"
import useFetchFavoritePlayerList from "../hooks/useGetFavoritePlayerList"
import useFetchPlayerList from "../hooks/useGetPlayerList"
import { ProfileStackScreenProps } from "./ProfileStackNavigator"

export const FavoritePlayersModal: React.FC<ProfileStackScreenProps<"favoritePlayersScreen">> =
  observer(function (_props) {
    const styles = useStyles()
    const { playerStore } = useStores()

    useFetchPlayerList()
    useFetchFavoritePlayerList()

    return (
      <Screen preset="fixed" contentContainerStyle={styles.container}>
        {Platform.OS === "android" && (
          <GoBackComponent
            style={{ marginLeft: spacing.sm }}
            onPress={() => {
              _props.navigation.goBack()
            }}
          />
        )}
        {playerStore.isPlayerListErrored && <Text tx="errors.somethingWentWrong" />}
        <Text style={styles.title} tx="profile.editFavoritePlayers" />
        <TeamPlayersTab height="95%" />
      </Screen>
    )
  })

const useStyles = createUseStyles(() => ({
  container: {
    paddingTop: spacing.sm,
  },
  title: {
    textAlign: "center",
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    letterSpacing: -0.64,
    fontSize: 32,
    lineHeight: 40,
  },
}))
