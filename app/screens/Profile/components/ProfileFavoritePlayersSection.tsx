import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Button, Text } from "app/components"
import { useStores } from "app/models"
import useFetchFavoritePlayerList from "app/screens/hooks/useGetFavoritePlayerList"
import { typography } from "app/theme"
import EditIcon from "assets/icons/svgs/EditIcon"
import { t } from "i18n-js"
import capitalize from "lodash.capitalize"
import { observer } from "mobx-react-lite"
import React from "react"
import { View } from "react-native"
import { FavoritePlayerItem } from "./FavoritePlayerItem"

type Props = {
  handleOpenFavoritePlayersPanel: () => void
}

export const ProfileFavoritePlayersSection = observer(function (_props: Props) {
  const styles = useStyles()
  const {
    playerStore,
    authUserStore: { user },
  } = useStores()

  useFetchFavoritePlayerList()

  const getSectionTitle = () => {
    if (user.firstName) {
      return `${user.firstName}’s ${t("profile.favoritePlayers")}`
    }
    return capitalize(t("profile.favoritePlayers"))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText} text={getSectionTitle()} />
      <View style={styles.favoritePlayersSection}>
        {playerStore.favoritePlayerList.map((player) => (
          <FavoritePlayerItem
            name={`${player.firstName} ${player.lastName}`}
            pictureURL={player.pictureUrl}
            key={`favorite-player-${player.id}`}
          />
        ))}
      </View>
      <Button
        LeftAccessory={() => <EditIcon width={25} height={25} />}
        tx="profile.editFavorites"
        style={styles.addToFavoritesButton}
        textStyle={styles.addToFavoritesButtonText}
        onPress={() => {
          _props.handleOpenFavoritePlayersPanel()
        }}
      />
    </View>
  )
})

const useStyles = createUseStyles((theme) => ({
  container: {
    marginTop: theme.spacing[32],
  },
  titleText: {
    color: "#475467",
    fontSize: 16,
    fontFamily: typography.fonts.instrumentSans.semiBold,
    textAlign: "center",
  },
  favoritePlayersSection: {
    marginVertical: theme.spacing[24],
    flexDirection: "row",
    gap: theme.spacing[8],
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  addToFavoritesButton: {
    backgroundColor: "#E6E6EC",
    borderWidth: 0,
    borderBottomWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.10)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: theme.spacing[8],
    paddingHorizontal: theme.spacing[16],
  },
  addToFavoritesButtonText: {
    color: "#475467",
    fontSize: 16,
    lineHeight: 20,
    fontFamily: typography.fonts.instrumentSansSemiCondensed.medium,
    marginLeft: theme.spacing[8],
  },
}))
