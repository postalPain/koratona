import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
// import { useStores } from "app/models"
import { typography } from "app/theme"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { LinearGradient } from "expo-linear-gradient"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, View, useWindowDimensions } from "react-native"
import LogOutIconSvg from "assets/icons/svgs/LogOutIcon"
import PentagonIcon from "assets/icons/svgs/Pegtagon"
import TShirtIcon from "assets/icons/svgs/TShirtIcon"
import { Screen, Text } from "../../components"
import { ProfileStackScreenProps } from "./ProfileStackNavigator"

import { ProfileStatsSection } from "./components/ProfileStatsSection"
import { ProfileEditingSection } from "./components/ProfileEditingSection"
import { ProfileFavoritePlayersSection } from "./components/ProfileFavoritePlayersSection"
import { ProfilePolicies } from "./components/ProfilePolicies"

const welcomeLogo = require("assets/images/logo.png")
const tShirtImage = require("assets/images/tShirt.png")

export const ProfileScreen: FC<ProfileStackScreenProps<"profileScreen">> = observer(function (
  _props,
) {
  const { width } = useWindowDimensions()
  const styles = useStyles()
  // const { productsStore } = useStores()
  const headerInsets = useSafeAreaInsetsStyle(["top"])

  return (
    <Screen preset="auto" backgroundColor="#fff">
      <LinearGradient
        colors={["#047EEB", "#047EEB", "#333865"]}
        style={[
          { ...styles.gradient, borderBottomLeftRadius: width, borderBottomRightRadius: width },
          headerInsets,
        ]}
      >
        <View style={styles.header}>
          <Image source={welcomeLogo} style={styles.logo} resizeMode="contain" />
          <View style={styles.logoutComposition}>
            <LogOutIconSvg />
            <Text tx="common.logOut" weight="medium" style={styles.logoutText} />
          </View>
        </View>
        <View>
          <View style={styles.pentagonContainer}>
            <PentagonIcon />
            <Text tx="profile.yourProfile" style={styles.pentagonText} />
          </View>
          <View style={styles.tShirtContainer}>
            <Image style={styles.tShirtImage} source={tShirtImage} />
            <View style={styles.shirtTextContainer}>
              <Text style={styles.tShirtName} text="ahmed" />
              <Text style={styles.tShirtNumber} text="08" />
            </View>
            <View style={styles.editShirtNumberButton}>
              <TShirtIcon />
              <Text style={styles.editTShirtNumberText} tx="profile.editShirtNumber" />
            </View>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.contentWrapper}>
        <ProfileEditingSection />
        <ProfileStatsSection />
        <ProfileFavoritePlayersSection />
        <View style={styles.policiesWrapper}>
          <ProfilePolicies />
        </View>
      </View>
    </Screen>
  )
})

const useStyles = createUseStyles((theme) => ({
  container: { flex: 1, backgroundColor: "#047EEB" },
  logo: {
    height: 20,
    marginRight: "auto",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: theme.spacing[24],
  },
  logoutComposition: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    marginLeft: theme.spacing[8],
    color: "#fff",
    fontSize: 16,
    opacity: 0.5,
    fontFamily: typography.fonts.instrumentSans.regular,
  },
  gradient: {
    height: 500,
    flex: 1,
    zIndex: 1,
  },
  pentagonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  tShirtImage: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  pentagonText: {
    position: "absolute",
    color: "#fff",
    opacity: 0.5,
    top: 50,
    textAlign: "center",
    fontSize: 14,
    textTransform: "uppercase",
    width: 90,
    fontFamily: typography.fonts.instrumentSans.regularItalic,
  },
  tShirtContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  shirtTextContainer: {
    position: "absolute",
    height: 100,
  },
  tShirtName: {
    textTransform: "uppercase",
    textAlign: "center",
    color: "#fff",
    fontFamily: typography.fonts.instrumentSans.bold,
  },
  tShirtNumber: {
    textTransform: "uppercase",
    color: "#fff",
    fontFamily: typography.fonts.instrumentSans.bold,
    fontSize: 96,
    lineHeight: 96,
    marginTop: 5,
  },
  editShirtNumberButton: {
    borderTopColor: "rgba(178, 213, 247, 0.5)",
    borderTopWidth: 1,
    position: "absolute",
    zIndex: 100,
    width: 90,
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  editTShirtNumberText: {
    textTransform: "uppercase",
    textAlign: "center",
    color: "#B2D5F7",
    fontFamily: typography.fonts.instrumentSans.medium,
    fontSize: 16,
  },
  contentWrapper: {
    paddingHorizontal: theme.spacing[24],
  },
  policiesWrapper:{
    paddingTop: theme.spacing[64],
    paddingBottom: theme.spacing[32],
  }
}))
