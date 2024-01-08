import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import React from "react"
import { SettingsController, SettingsKey } from "./SettingsContentController"

type Props = {
  contentKey: SettingsKey | null
  handleClose: () => void
  resetContentKey: () => void
}

const SettingsPanel = React.forwardRef<BottomSheet, Props>(
  ({ contentKey, handleClose, resetContentKey }, ref) => {
    const styles = useStyles()

    return (
      <BottomSheet
        ref={ref}
        enablePanDownToClose
        index={-1}
        onClose={() => {
          resetContentKey()
        }}
        topInset={40}
        keyboardBlurBehavior="none"
        enableDynamicSizing
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
        )}
      >
        <BottomSheetView style={styles.bottomSheetView}>
          <SettingsController contentKey={contentKey} handleClose={handleClose} />
        </BottomSheetView>
      </BottomSheet>
    )
  },
)

SettingsPanel.displayName = "SettingsPanel"
export default SettingsPanel

const useStyles = createUseStyles(() => ({
  bottomSheetView: {
    paddingBottom: 1,
  },
}))
