import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Button, Text } from "app/components"
import React from "react"
import { View } from "react-native"
import { FavoritePlayerItem } from "./FavoritePlayerItem"
import { typography } from "app/theme"
import EditIcon from "assets/icons/svgs/EditIcon"

export const ProfileFavoritePlayersSection = () => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <Text style={styles.titleText} text="Ahmed’s favorite players" />
      <View style={styles.favoritePlayersSection}>
        <FavoritePlayerItem />
        <FavoritePlayerItem />
      </View>
      <Button
        LeftAccessory={() => <EditIcon width={25} height={25} />}
        tx="profile.editFavorites"
        style={styles.addToFavoritesButton}
        textStyle={styles.addToFavoritesButtonText}
      />
    </View>
  )
}

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
  addToFavoritesButtonText:{
    color: "#475467",
    fontSize: 16,
    lineHeight: 20,
    fontFamily: typography.fonts.instrumentSans.medium,
    marginLeft: theme.spacing[8],
  }
}))
