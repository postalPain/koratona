import { NativeSegmentedControlIOSChangeEvent } from "@react-native-segmented-control/segmented-control"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text } from "app/components"
import { typography, typographyPresets } from "app/theme"
import React from "react"
import { ActivityIndicator, Alert, NativeSyntheticEvent, View } from "react-native"
// @ts-ignore
import SegmentedControl from "@react-native-segmented-control/segmented-control/js/SegmentedControl.js"
import Button from "@stryberventures/gaia-react-native.button"
import { getLanguage, translate } from "app/i18n"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"
import RNRestart from "react-native-restart"

type Props = {
  onCloseBottomSheet: () => void
}

export const AppLanguage: React.FC<Props> = observer(function ({ onCloseBottomSheet }) {
  const styles = useStyles()
  const { authUserStore } = useStores()
  const languages = ["English", "Arabic"]
  const currentLanguage = authUserStore.user?.lang || getLanguage()

  if (currentLanguage === "ar") {
    languages.reverse()
  }

  const getIndexOfCurrentLanguage = () => {
    let languageName;

    switch (currentLanguage) {
      case "en":
        languageName = "English";
        break;
      case "ar":
        languageName = "Arabic";
        break;
      default:
        languageName = "English";
    }

    return languages.indexOf(languageName);
  }

  const [selectedIndex, setSelectedIndex] = React.useState(getIndexOfCurrentLanguage)
  const languageName = languages[selectedIndex]

  const onSaveChanges = () => {
    let shortLangName = "en"

    switch (languageName) {
      case "English": {
        shortLangName = "en"
        break
      }
      case "Arabic":
        shortLangName = "ar"
        break

      default:
        break
    }

    authUserStore.updateUser({ lang: shortLangName }, () => {
      onCloseBottomSheet()
      Alert.alert(
        translate("profile.restart"),
        translate("profile.toApplyTheChangesRestartApp"),
        [
          {
            text: translate("profile.restart"),
            onPress: () => RNRestart.restart(),
          },
        ],
        {
          cancelable: false,
        },
      )
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
          activeFontStyle={styles.segmentFontStyle}
          fontStyle={styles.segmentFontStyle}
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
    ...typographyPresets["h4-bold"],
    lineHeight: 40,
    marginBottom: theme.spacing[24],
  },
  segmentFontStyle: {
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
    ...typographyPresets["p2-semibold"],
  },
  segmentControlContainer: {
    paddingVertical: theme.spacing[12],
  },
}))
