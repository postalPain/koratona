import { NativeSegmentedControlIOSChangeEvent } from "@react-native-segmented-control/segmented-control"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text } from "app/components"
import { typography } from "app/theme"
import React from "react"
import { ActivityIndicator, NativeSyntheticEvent, View } from "react-native"
// @ts-ignore
import SegmentedControl from "@react-native-segmented-control/segmented-control/js/SegmentedControl.js"
import Button from "@stryberventures/gaia-react-native.button"
import { getLanguage } from "app/i18n"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"

type Props = {
  onCloseBottomSheet: () => void
}
const languages = ["English", "Arabic"] as const

export const AppLanguage: React.FC<Props> = observer(function ({ onCloseBottomSheet }) {
  const styles = useStyles()
  const { authUserStore } = useStores()

  const getIndexOfCurrentLanguage = () => {
    const currentLanguage = authUserStore.user?.lang || getLanguage()
    switch (currentLanguage) {
      case "en":
        return 0
      case "ar":
        return 1
      default:
        return 0
    }
  }
  const [selectedIndex, setSelectedIndex] = React.useState(getIndexOfCurrentLanguage)
  const languageName = languages[selectedIndex]

  const onSaveChanges = () => {
    let shortLang = "en"

    switch (languageName) {
      case "English": {
        shortLang = "en"
        break
      }
      case "Arabic":
        shortLang = "ar"
        break

      default:
        break
    }

    authUserStore.updateUser({ lang: shortLang }, () => {
      onCloseBottomSheet()
    })
  }

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
      <Button style={styles.button} onPress={onSaveChanges} disabled={authUserStore.isLoading}>
        {!authUserStore.isLoading && (
          <Text weight="bold" tx="common.saveChanges" style={styles.buttonText} />
        )}
        {authUserStore.isLoading && <ActivityIndicator />}
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
