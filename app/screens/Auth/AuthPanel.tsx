import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import React, { memo } from "react"
import { AuthContentKey, AuthController } from "./AuthController"
import getBottomPanelHeight from "./utils/getBottomPanelHeight"

type AuthControllerProps = {
  contentKey: AuthContentKey
  openPanel: (contentKey: AuthContentKey) => () => void
  onClose: () => void
}

const AuthPanel = React.forwardRef<BottomSheet, AuthControllerProps>(
  ({ contentKey, openPanel, onClose }, ref) => {
    const styles = useStyles()

    return (
      <BottomSheet
        ref={ref}
        enablePanDownToClose
        index={-1}
        topInset={40}
        keyboardBlurBehavior="restore"
        snapPoints={[getBottomPanelHeight(contentKey)]}
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
        )}
      >
        <BottomSheetView style={styles.bottomSheetView}>
          <AuthController contentKey={contentKey} setContentKey={openPanel} onClose={onClose} />
        </BottomSheetView>
      </BottomSheet>
    )
  },
)

const AuthPanelMemoized = memo(AuthPanel)
AuthPanel.displayName = "AuthPanel"

export default AuthPanelMemoized

const useStyles = createUseStyles(() => ({
  bottomSheetView: {
    paddingBottom: 40,
  },
}))
