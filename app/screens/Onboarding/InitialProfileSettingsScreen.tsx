import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Screen, Text } from "app/components"
import { useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { typography } from "app/theme"
import { observer } from "mobx-react-lite"
import React from "react"
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
      <Screen style={styles.root} preset="auto" safeAreaEdges={["top"]}>
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
  root: {
    flex: 1,
    paddingHorizontal: theme.spacing["24"],
  },
  headerBackButton: {
    paddingLeft: theme.spacing[24],
  },
  title: {
    fontFamily: typography.fonts.instrumentSans.bold,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.54,
    textAlign: "center",
    marginBottom: theme.spacing[12],
    color: "#121212",
    marginTop: theme.spacing[32],
  },
  subTitle: {
    textAlign: "center",
    color: "#333865",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: theme.spacing[32],
  },
  formTitle: {
    color: "#121212",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 16.8,
    marginBottom: theme.spacing[8],
    fontFamily: typography.fonts.instrumentSans.semiBold,
  },
}))
