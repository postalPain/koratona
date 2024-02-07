import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text } from "app/components"
import { TeamPlayersTab } from "app/screens/WidgetsScreen/TeamTab"
import { spacing, typography } from "app/theme"
import React from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"

type Props = {
  handleClose: () => void
}

const FavoritePlayersPanel = React.forwardRef<BottomSheet, Props>(({ handleClose }, ref) => {
  const styles = useStyles()
  const { top: topInset } = useSafeAreaInsets()

  return (
    <BottomSheet
      ref={ref}
      enablePanDownToClose
      index={-1}
      onClose={() => {
        handleClose()
      }}
      topInset={topInset}
      enableDynamicSizing
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
    >
      <BottomSheetScrollView>
        <Text style={styles.title} tx="profile.editFavoritePlayers" />
        <TeamPlayersTab />
      </BottomSheetScrollView>
    </BottomSheet>
  )
})

FavoritePlayersPanel.displayName = "FavoritePlayersPanel"
export default FavoritePlayersPanel

const useStyles = createUseStyles(() => ({
  container: {
    paddingTop: spacing.sm,
  },
  title: {
    textAlign: "center",
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    letterSpacing: -0.64,
    fontSize: 32,
    lineHeight: 40,
  },
}))
