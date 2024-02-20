import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Screen, Text } from "app/components"
import { useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { observer } from "mobx-react-lite"
import React from "react"
import { typographyPresets } from "../../theme/typography"
import EditProfileForm from "../Profile/components/EditProfileForm"
import useFetchFavoriteTeam from "../hooks/useGetFavoriteTeam"
import useFetchTeamList from "../hooks/useTeamList"

interface InitialProfileSettingsScreenProps extends AppStackScreenProps<"InitialProfileSettings"> {}

export const InitialProfileSettingsScreen: React.FC<InitialProfileSettingsScreenProps> = observer(
  function InitialProfileSettingsScreen(_props) {
    const styles = useStyles()
    const { authenticationStore } = useStores()

    useFetchTeamList()
    useFetchFavoriteTeam()

    return (
      <Screen
        style={styles.root}
        preset="auto"
        safeAreaEdges={["top"]}
        contentContainerStyle={styles.containerStyle}
      >
        <Text style={styles.title} tx="onboardingScreen.yourProfile" />
        <Text style={styles.subTitle} tx="onboardingScreen.moreDetails" />
        <Text style={styles.formTitle} tx="onboardingScreen.personalDetails" weight="semiBold" />
        <EditProfileForm
          disableBottomSheetInternal
          afterSubmit={() => {
            _props.navigation.navigate("Home", { screen: "FeedNavigator" })
            authenticationStore.setShowingOnboarding(false)
          }}
        />
      </Screen>
    )
  },
)

const useStyles = createUseStyles((theme) => ({
  containerStyle: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    paddingHorizontal: theme.spacing[24],
  },
  root: {
    flex: 1,
  },
  headerBackButton: {
    paddingLeft: theme.spacing[24],
  },
  title: {
    ...typographyPresets["h4-bold"],
    lineHeight: 34,
    textAlign: "center",
    marginBottom: theme.spacing[12],
    color: "#121212",
    marginTop: theme.spacing[32],
  },
  subTitle: {
    ...typographyPresets["p2-regular"],
    textAlign: "center",
    color: "#333865",
    marginBottom: theme.spacing[32],
  },
  formTitle: {
    ...typographyPresets["p2-semibold"],
    color: "#121212",
    textAlign: "center",
    marginBottom: theme.spacing[8],
  },
}))
