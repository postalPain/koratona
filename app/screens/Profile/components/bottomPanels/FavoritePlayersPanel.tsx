import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text } from "app/components"
import { TeamPlayersTab } from "app/screens/WidgetsScreen/TeamTab"
import { spacing } from "app/theme"
import React from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { typography, typographyPresets } from "app/theme/typography"
import { isRTL } from "app/i18n/getIsRTL"

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
    ...(isRTL()
      ? typographyPresets["h3-bold"]
      : {
          fontFamily: typography.fonts.instrumentSansCondensed.bold,
          letterSpacing: -0.64,
          fontSize: 32,
          lineHeight: 40,
        }),
    marginHorizontal: 24,
    marginTop: 24,
  },
}))
