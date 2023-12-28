import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text } from "app/components"
import { typography } from "app/theme"
import React from "react"
import { NativeSyntheticEvent, View } from "react-native"
// @ts-ignore
import SegmentedControl from "@react-native-segmented-control/segmented-control/js/SegmentedControl.js"
import Button from "@stryberventures/gaia-react-native.button"
import { NativeSegmentedControlIOSChangeEvent } from "@react-native-segmented-control/segmented-control"
import { observer } from "mobx-react-lite"

type Props = {
  onCloseBottomSheet: () => void
}

export const AppLanguage: React.FC<Props> = observer(function ({ onCloseBottomSheet }) {
  const styles = useStyles()
  const languages = ["English", "Arabic"]
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  return (
    <View style={styles.container}>
      <Text style={styles.title} tx="profile.appLanguage" />
      <View style={styles.segmentControlContainer}>
        <SegmentedControl
          values={languages}
          selectedIndex={selectedIndex}
          onChange={(event: NativeSyntheticEvent<NativeSegmentedControlIOSChangeEvent>) => {
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex)
          }}
          activeFontStyle={styles.fontStyle}
          fontStyle={styles.fontStyle}
        />
      </View>
      <Button style={styles.button} onPress={onCloseBottomSheet}>
        <Text weight="bold" tx="common.saveChanges" style={styles.buttonText} />
      </Button>
    </View>
  )
})

const useStyles = createUseStyles((theme) => ({
  container: {
    paddingVertical: theme.spacing["24"],
    paddingHorizontal: theme.spacing["24"],
  },
  title: {
    textAlign: "center",
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    letterSpacing: -0.64,
    fontSize: 32,
    lineHeight: 40,
    marginBottom: theme.spacing[24],
  },
  fontStyle: {
    color: "#000000",
    fontFamily: typography.fonts.inter.normal,
    fontSize: 12,
    lineHeight: 18,
  },
  button: {
    marginTop: theme.spacing["32"],
    backgroundColor: "#333865",
    borderColor: "#333865",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  segmentControlContainer: {
    paddingVertical: theme.spacing[12],
  },
}))
