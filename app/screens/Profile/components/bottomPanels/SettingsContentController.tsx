import React, { FC } from "react"
import * as panelVariant from "./variants"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet"

export type SettingsKey = "profile" | "notifications" | "support" | "language"

type Props = {
  contentKey: SettingsKey | null
  handleClose: () => void
}

export const SettingsController: FC<Props> = ({ contentKey, handleClose }) => {
  const styles = useStyles()

  const getContent = () => {
    switch (contentKey) {
      case "profile":
        return (
          <BottomSheetScrollView style={styles.bottomSheetView}>
            <panelVariant.EditProfile handleCloseBottomSheet={handleClose} />
          </BottomSheetScrollView>
        )
      case "notifications":
        return (
          <BottomSheetView style={styles.bottomSheetView}>
            <panelVariant.Notification />
          </BottomSheetView>
        )
      case "support":
        return (
          <BottomSheetView style={styles.bottomSheetView}>
            <panelVariant.Support />
          </BottomSheetView>
        )
      case "language":
        return (
          <BottomSheetView style={styles.bottomSheetView}>
            <panelVariant.AppLanguage onCloseBottomSheet={handleClose} />
          </BottomSheetView>
        )
      default:
        return null
    }
  }

  return getContent()
}

const useStyles = createUseStyles(() => ({
  bottomSheetView: {
    paddingBottom: 1,
  },
}))
