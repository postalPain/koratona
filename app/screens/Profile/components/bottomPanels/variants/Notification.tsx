import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text, Toggle } from "app/components"
import { useStores } from "app/models"
import { registerForPushNotificationsAsync } from "app/screens/Onboarding/utils/notification"
import { typography } from "app/theme"
import { observer } from "mobx-react-lite"
import React from "react"
import { View } from "react-native"

export const Notification = observer(function () {
  const styles = useStyles()

  const { authUser } = useStores()
  const isNotificationTurnedOn = authUser.notificationToken

  const handleSetNotifications = async () => {
    const token = await registerForPushNotificationsAsync()
    authUser.setNotificationToken(token)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title} tx="profile.notifications" />
      <Toggle
        variant="switch"
        labelTx="profile.enableNotifications"
        labelPosition="left"
        labelStyle={styles.toggleLabelText}
        inputWrapperStyle={styles.toggleContainerStyle}
        value={!!isNotificationTurnedOn}
        onValueChange={(newValue) => {
          if (newValue) {
            handleSetNotifications()
          } else {
            authUser.setNotificationToken(null)
          }
        }}
      />
    </View>
  )
})

const useStyles = createUseStyles((theme) => ({
  container: {
    paddingTop: theme.spacing["24"],
    paddingHorizontal: theme.spacing["24"],
    paddingBottom: theme.spacing["32"],
  },
  title: {
    textAlign: "center",
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    letterSpacing: -0.64,
    fontSize: 32,
    lineHeight: 40,
    marginBottom: theme.spacing[24],
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
  toggleLabelText: {
    fontFamily: typography.fonts.instrumentSansSemiCondensed.regular,
    fontSize: 20,
    lineHeight: 24,
    color: "#475467",
  },
  toggleContainerStyle: {
    paddingVertical: theme.spacing[12],
  },
}))
