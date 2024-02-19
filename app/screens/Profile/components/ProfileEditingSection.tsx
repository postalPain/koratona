import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text } from "app/components"
import { isRTL } from "app/i18n"
import { typography, typographyPresets } from "app/theme"
import EditIcon from "assets/icons/svgs/EditIcon"
import NotificationIcon from "assets/icons/svgs/NotificationIcon"
import SettingsIcon from "assets/icons/svgs/SettingsIcon"
import SupportIcon from "assets/icons/svgs/SupportIcon"
import { observer } from "mobx-react-lite"
import React from "react"
import { Pressable, View } from "react-native"
import { SettingsKey } from "../components/bottomPanels/SettingsContentController"

type Props = {
  openSettingsBottomPanel: (key: SettingsKey) => () => void
}

export const ProfileEditingSection = observer(function (_props: Props) {
  const styles = useStyles()
  const getBorderStyle = () =>
    isRTL() ? styles.buttonsContainerFirstCell : styles.buttonsContainerFirstCellRTL

  return (
    <View style={styles.buttonsContainer}>
      <View style={[styles.buttonsContainerRow, styles.buttonsContainerFirstRow]}>
        <Pressable
          onPress={_props.openSettingsBottomPanel("profile")}
          style={[
            styles.buttonsContainerRowCell,
            styles.buttonsContainerFirstRowCell,
            getBorderStyle(),
          ]}
        >
          <EditIcon />
          <Text style={styles.editProfileButtonText} tx="profile.editProfile" />
        </Pressable>
        <Pressable
          onPress={_props.openSettingsBottomPanel("notifications")}
          style={[styles.buttonsContainerRowCell, styles.buttonsContainerFirstRowCell]}
        >
          <NotificationIcon />
          <Text style={styles.editProfileButtonText} tx="profile.notifications" />
        </Pressable>
      </View>
      <View style={styles.buttonsContainerRow}>
        <Pressable
          onPress={_props.openSettingsBottomPanel("support")}
          style={[styles.buttonsContainerRowCell, getBorderStyle()]}
        >
          <SupportIcon />
          <Text style={styles.editProfileButtonText} tx="profile.getSupport" />
        </Pressable>
        <Pressable
          onPress={_props.openSettingsBottomPanel("language")}
          style={styles.buttonsContainerRowCell}
        >
          <SettingsIcon />
          <Text style={styles.editProfileButtonText} tx="profile.appLanguage" />
        </Pressable>
      </View>
    </View>
  )
})

const useStyles = createUseStyles((theme) => ({
  buttonsContainerRowCell: {
    alignItems: "center",
    padding: theme.spacing[24],
    width: 171,
  },
  buttonsContainerFirstRow: {
    borderBottomColor: "rgba(0, 0, 0, 0.10)",
    borderBottomWidth: 1,
  },
  buttonsContainerFirstRowCell: {
    paddingTop: 150,
  },
  buttonsContainerFirstCell: {
    borderRightColor: "rgba(0, 0, 0, 0.10)",
    borderRightWidth: 0.5,
  },
  buttonsContainerFirstCellRTL: {
    borderLeftColor: "rgba(0, 0, 0, 0.10)",
    borderLeftWidth: 0.5,
  },
  buttonsContainerRow: {
    flexDirection: "row",
  },
  buttonsContainer: {
    borderColor: "rgba(0, 0, 0, 0.10)",
    borderWidth: 0.5,
    borderRadius: 30,
    marginTop: -130,
  },
  editProfileButtonText: {
    color: "#475467",
    marginTop: 6,
    ...(isRTL()
      ? typographyPresets["p2-semibold"]
      : {
          fontFamily: typography.fonts.instrumentSansSemiCondensed.medium,
          fontSize: 16,
          lineHeight: 20,
        }),
  },
}))
