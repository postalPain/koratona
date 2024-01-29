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
import React, { FC, useEffect } from "react"
import {
  Image,
  InputAccessoryView,
  Keyboard,
  Platform,
  Pressable,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native"
import { Screen, Text, TextField } from "../../components"
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
    authUserStore: { user, updateUser },
    authenticationStore: { logout },
  } = useStores()

  const [settingBottomPanelKey, setSettingBottomPanelKey] = React.useState<SettingsKey | null>(
    "profile",
  )

  const [jerseyNumber, setJerseyNumber] = React.useState<string>("00")

  const [isJerseyNumberEditing, setIsJerseyNumberEditing] = React.useState<boolean>(false)

  const settingBottomPanelRef = React.useRef<BottomSheet>(null)
  const tShortNumberInputRef = React.useRef<TextInput>(null)

  useEffect(() => {
    setJerseyNumber(`${user.jerseyNumber || "1"}`)
  }, [])

  const openSettingsBottomPanel = (key: SettingsKey) => () => {
    setSettingBottomPanelKey(key)
    settingBottomPanelRef.current?.expand()
  }

  const handleSaveTheNumber = () => {
    setJerseyNumber(jerseyNumber)
    updateUser({ jerseyNumber }, () => {
      setIsJerseyNumberEditing(false)
    })
  }

  return (
    <>
      <Screen preset="auto" backgroundColor="#fff">
        <LinearGradient
          colors={["#047EEB", "#047EEB", "#333865"]}
          style={[
            {
              ...styles.gradient,
              borderBottomLeftRadius: width,
              borderBottomRightRadius: width,
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
              <Image source={tShirtImage} />
              <View style={styles.shirtTextContainer}>
                <Text style={styles.tShirtName} text={user.lastName || ""} />
                {isJerseyNumberEditing && (
                  <>
                    {Platform.OS === "ios" && (
                      <InputAccessoryView nativeID="userTShirtNumberID">
                        <View style={styles.inputAccessoryBox}>
                          <Text
                            onPress={() => {
                              Keyboard.dismiss()
                              handleSaveTheNumber()
                              setIsJerseyNumberEditing(false)
                            }}
                            style={styles.inputAccessoryText}
                            tx="common.done"
                            weight="semiBold"
                          />
                        </View>
                      </InputAccessoryView>
                    )}
                    <TextField
                      ref={tShortNumberInputRef}
                      inputAccessoryViewID="userTShirtNumberID"
                      inputWrapperStyle={styles.tShirtInputWrapperStyle}
                      containerStyle={styles.tShirtNumberInputContainer}
                      style={styles.tShirtNumberTextInput}
                      inputMode="numeric"
                      maxLength={2}
                      value={jerseyNumber}
                      onChangeText={(value) => {
                        setJerseyNumber(value)
                      }}
                      onBlur={() => {
                        handleSaveTheNumber()
                        setIsJerseyNumberEditing(false)
                      }}
                      onFocus={() => {
                        tShortNumberInputRef.current?.setNativeProps({
                          selection: { start: 0, end: jerseyNumber.length },
                        })
                      }}
                    />
                  </>
                )}
                {!isJerseyNumberEditing && <Text style={styles.tShirtNumber} text={jerseyNumber} />}
              </View>
              <Pressable
                style={styles.editShirtNumberButton}
                onPress={() => {
                  if (isJerseyNumberEditing) {
                    handleSaveTheNumber()
                  } else {
                    setTimeout(() => {
                      tShortNumberInputRef.current?.focus()
                    }, 100)
                  }
                  setIsJerseyNumberEditing((isJerseyNumberEditing) => !isJerseyNumberEditing)
                }}
              >
                <TShirtIcon />
                <Text
                  style={[
                    styles.editTShirtNumberText,
                    isJerseyNumberEditing && styles.editTShirtNumberTextBold,
                  ]}
                  tx={isJerseyNumberEditing ? "profile.saveShirtNumber" : "profile.editShirtNumber"}
                />
              </Pressable>
            </View>
          </View>
        </LinearGradient>
        <View style={styles.contentWrapper}>
          <View style={styles.profileEditingSectionWrapper}>
            <ProfileEditingSection openSettingsBottomPanel={openSettingsBottomPanel} />
          </View>
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
        resetContentKey={() => {
          setSettingBottomPanelKey(null)
        }}
        handleClose={() => {
          settingBottomPanelRef.current?.close()
        }}
      />
    </>
  )
})

const useStyles = createUseStyles((theme) => ({
  tShirtNumberTextInput: {
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    fontSize: 96,
    height: 117,
    paddingTop: 18,
    marginLeft: 14,
    color: "#fff",
    justifyContent: "flex-start",
    textAlign: "center",
    borderColor: "red",
  },
  tShirtNumberInputContainer: {
    justifyContent: "flex-end",
  },
  tShirtInputWrapperStyle: {
    width: 120,
    backgroundColor: "transparent",
    borderWidth: 0,
  },
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
    flex: 1,
    zIndex: 1,
  },
  pentagonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
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
    textAlign: "center",
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
  editTShirtNumberTextBold: {
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    color: "#fff",
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
  tShirtNumberInputAccessoryText: {
    backgroundColor: "#fff",
    textAlign: "right",
    fontWeight: "bold",
    color: "#1375FE",
    marginRight: theme.spacing[12],
    paddingBottom: theme.spacing[12],
  },
  profileEditingSectionWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  inputAccessoryBox: {
    backgroundColor: "#F2F3F5",
    paddingVertical: theme.spacing[12],
    justifyContent: "center",
  },
  inputAccessoryText: {
    textAlign: "right",
    fontWeight: "bold",
    color: "#1375FE",
    marginRight: theme.spacing[12],
  },
}))
