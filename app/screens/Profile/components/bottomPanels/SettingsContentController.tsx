import React, { FC } from "react"
import * as panelVariant from "./variants"

export type SettingsKey = "profile" | "notifications" | "support" | "language"

type Props = {
  contentKey: SettingsKey | null
  handleClose: () => void
}

export const SettingsController: FC<Props> = ({ contentKey, handleClose }) => {
  const getContent = () => {
    switch (contentKey) {
      case "profile":
        return <panelVariant.EditProfile handleCloseBottomSheet={handleClose} />
      case "notifications":
        return <panelVariant.Notification />
      case "support":
        return <panelVariant.Support />
      case "language":
        return <panelVariant.AppLanguage onCloseBottomSheet={handleClose} />
      default:
        return null
    }
  }

  return getContent()
}
