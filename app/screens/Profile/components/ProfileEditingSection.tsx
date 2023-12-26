import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import React from "react"
import EditIcon from "assets/icons/svgs/EditIcon"
import NotificationIcon from "assets/icons/svgs/NotificationIcon"
import SupportIcon from "assets/icons/svgs/SupportIcon"
import SettingsIcon from "assets/icons/svgs/SettingsIcon"
import { typography } from "app/theme"
import { View } from "react-native"
import { Text } from "app/components"

export const ProfileEditingSection = () => {
  const styles = useStyles()

  return (
    <View style={styles.buttonsContainer}>
      <View style={[styles.buttonsContainerRow, styles.buttonsContainerFirstRow]}>
        <View
          style={[
            styles.buttonsContainerRowCell,
            styles.buttonsContainerFirstRowCell,
            styles.buttonsContainerFirstCell,
          ]}
        >
          <EditIcon />
          <Text style={styles.editProfileButtonText} tx="profile.editProfile" />
        </View>
        <View style={[styles.buttonsContainerRowCell, styles.buttonsContainerFirstRowCell]}>
          <NotificationIcon />
          <Text style={styles.editProfileButtonText} tx="profile.notifications" />
        </View>
      </View>
      <View style={styles.buttonsContainerRow}>
        <View style={[styles.buttonsContainerRowCell, styles.buttonsContainerFirstCell]}>
          <SupportIcon />
          <Text style={styles.editProfileButtonText} tx="profile.getSupport" />
        </View>
        <View style={styles.buttonsContainerRowCell}>
          <SettingsIcon />
          <Text style={styles.editProfileButtonText} tx="profile.appLanguage" />
        </View>
      </View>
    </View>
  )
}

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
    borderRightWidth: 1,
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
    fontFamily: typography.fonts.instrumentSans.medium,
    fontSize: 16,
    lineHeight: 20,
    marginTop: 6,
  },
}))
