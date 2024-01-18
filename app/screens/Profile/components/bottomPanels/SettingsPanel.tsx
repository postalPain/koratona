import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet"
import React from "react"
import { SettingsController, SettingsKey } from "./SettingsContentController"

type Props = {
  contentKey: SettingsKey | null
  handleClose: () => void
  resetContentKey: () => void
}

const SettingsPanel = React.forwardRef<BottomSheet, Props>(
  ({ contentKey, handleClose, resetContentKey }, ref) => {
    return (
      <BottomSheet
        ref={ref}
        enablePanDownToClose
        index={-1}
        onClose={() => {
          resetContentKey()
          handleClose()
        }}
        topInset={40}
        enableDynamicSizing
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
        )}
      >
        <SettingsController contentKey={contentKey} handleClose={handleClose} />
      </BottomSheet>
    )
  },
)

SettingsPanel.displayName = "SettingsPanel"
export default SettingsPanel
