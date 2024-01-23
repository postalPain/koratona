import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text } from "app/components"
import { useFetchAuthUser } from "app/screens/Auth/hooks/useAuth"
import useFetchFavoriteTeam from "app/screens/hooks/useGetFavoriteTeam"
import useFetchTeamList from "app/screens/hooks/useTeamList"
import { typography } from "app/theme"
import { observer } from "mobx-react-lite"
import React from "react"
import { View } from "react-native"
import EditProfileForm from "../../EditProfileForm"

type Props = {
  handleCloseBottomSheet: () => void
}

export const EditProfile: React.FC<Props> = observer(function (_props) {
  const styles = useStyles()

  useFetchAuthUser()
  useFetchTeamList()
  useFetchFavoriteTeam()

  return (
    <View style={styles.container}>
      <Text style={styles.title} tx="profile.editProfile" />
      <EditProfileForm
        afterSubmit={() => {
          _props.handleCloseBottomSheet()
        }}
      />
    </View>
  )
})

const useStyles = createUseStyles((theme) => ({
  container: {
    paddingTop: theme.spacing["24"],
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
}))
