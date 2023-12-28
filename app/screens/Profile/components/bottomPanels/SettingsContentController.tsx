import React, { FC } from "react"
import * as panelVariant from "./variants"

export type SettingsKey = "profile" | "notifications" | "support" | "language"

type Props = {
  contentKey: SettingsKey
  onClose: () => void
}

export const SettingsController: FC<Props> = ({ contentKey, onClose }) => {
  const getContent = () => {
    switch (contentKey) {
      case "profile":
        return <panelVariant.EditProfile onCloseBottomSheet={onClose} />
      case "notifications":
        return <panelVariant.Notification />
      case "support":
        return <panelVariant.Support />
      case "language":
        return <panelVariant.AppLanguage onCloseBottomSheet={onClose} />
    }
  }

  return getContent()
}
