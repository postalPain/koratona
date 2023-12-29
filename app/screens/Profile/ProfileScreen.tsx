import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { useStores } from "app/models"
import { typography } from "app/theme"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import LogOutIconSvg from "assets/icons/svgs/LogOutIcon"
import PentagonIcon from "assets/icons/svgs/Pegtagon"
import TShirtIcon from "assets/icons/svgs/TShirtIcon"
import { LinearGradient } from "expo-linear-gradient"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, Pressable, View, useWindowDimensions } from "react-native"
import { Screen, Text } from "../../components"
import { ProfileStackScreenProps } from "./ProfileStackNavigator"
import { ProfileEditingSection } from "./components/ProfileEditingSection"
import { ProfileFavoritePlayersSection } from "./components/ProfileFavoritePlayersSection"
import { ProfilePolicies } from "./components/ProfilePolicies"
import { ProfileStatsSection } from "./components/ProfileStatsSection"
import { SettingsKey } from "./components/bottomPanels/SettingsContentController"
import SettingsBottomPanel from "./components/bottomPanels/SettingsPanel"

const welcomeLogo = require("assets/images/logo.png")
const tShirtImage = require("assets/images/tShirt.png")

export const ProfileScreen: FC<ProfileStackScreenProps<"profileScreen">> = observer(function (
  _props,
) {
  const headerInsets = useSafeAreaInsetsStyle(["top"])
  const { width } = useWindowDimensions()
  const styles = useStyles()
  const {
    authUserStore: { user },
    authenticationStore: { logout },
  } = useStores()

  const [settingBottomPanelKey, setSettingBottomPanelKey] = React.useState<SettingsKey>("profile")

  const settingBottomPanelRef = React.useRef<BottomSheet>(null)

  const openSettingsBottomPanel = (key: SettingsKey) => () => {
    setSettingBottomPanelKey(key)
    settingBottomPanelRef.current?.expand()
  }

  return (
    <>
      <Screen preset="auto" backgroundColor="#fff">
        <LinearGradient
          colors={["#047EEB", "#047EEB", "#333865"]}
          style={[
            {
              ...styles.gradient,
               borderBottomLeftRadius: width, borderBottomRightRadius: width
              },
            headerInsets,
          ]}
        >
          <View style={styles.header}>
            <Image source={welcomeLogo} style={styles.logo} resizeMode="contain" />
            <Pressable style={styles.logoutComposition} onPress={logout}>
              <LogOutIconSvg />
              <Text tx="common.logOut" weight="medium" style={styles.logoutText} />
            </Pressable>
          </View>
          <View>
            <View style={styles.pentagonContainer}>
              <PentagonIcon />
              <Text tx="profile.yourProfile" style={styles.pentagonText} />
            </View>
            <View style={styles.tShirtContainer}>
              <Image style={styles.tShirtImage} source={tShirtImage} />
              <View style={styles.shirtTextContainer}>
                <Text style={styles.tShirtName} text={user.firstName} />
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
          <ProfileEditingSection openSettingsBottomPanel={openSettingsBottomPanel} />
          <ProfileStatsSection />
          <ProfileFavoritePlayersSection />
          <View style={styles.policiesWrapper}>
            <ProfilePolicies />
          </View>
        </View>
      </Screen>
      <SettingsBottomPanel
        ref={settingBottomPanelRef}
        contentKey={settingBottomPanelKey}
        onClose={() => {
          settingBottomPanelRef.current?.close()
        }}
      />
    </>
  )
})

const useStyles = createUseStyles((theme) => ({
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
    fontFamily: typography.fonts.instrumentSansSemiCondensed.regular,
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
    width: 80,
    fontFamily: typography.fonts.instrumentSansSemiCondensed.regularItalic,
    letterSpacing: 1.68,
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
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    letterSpacing: -0.48,
    fontSize: 24,
  },
  tShirtNumber: {
    textTransform: "uppercase",
    color: "#fff",
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
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
    fontFamily: typography.fonts.instrumentSansCondensed.medium,
    fontSize: 16,
  },
  contentWrapper: {
    paddingHorizontal: theme.spacing[24],
  },
  policiesWrapper: {
    paddingTop: theme.spacing[64],
    paddingBottom: theme.spacing[32],
  },
}))
