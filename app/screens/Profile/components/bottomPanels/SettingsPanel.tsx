import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import React, { memo } from "react"
import { SettingsController, SettingsKey } from "./SettingsContentController"

type Props = {
  contentKey: SettingsKey
  onClose: () => void
}

const SettingsPanel = React.forwardRef<BottomSheet, Props>(({ contentKey, onClose }, ref) => {
  const styles = useStyles()

  return (
    <BottomSheet
      ref={ref}
      enablePanDownToClose
      index={-1}
      topInset={40}
      keyboardBlurBehavior="none"
      enableDynamicSizing
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
    >
      <BottomSheetView style={styles.bottomSheetView}>
        <SettingsController contentKey={contentKey} onClose={onClose} />
      </BottomSheetView>
    </BottomSheet>
  )
})

const SettingsPanelMemoized = memo(SettingsPanel)
SettingsPanel.displayName = "SettingsPanel"

export default SettingsPanelMemoized

const useStyles = createUseStyles(() => ({
  bottomSheetView: {
    paddingBottom: 1,
  },
}))
