import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Text, Toggle } from "app/components"
import { useStores } from "app/models"
import { isPermissionsRequested, registerForPushNotifications } from "app/services/notifications"
import { typographyPresets } from "app/theme"
import { openSettings } from "expo-linking"
import { observer } from "mobx-react-lite"
import React from "react"
import { View } from "react-native"

export const Notification = observer(function () {
  const styles = useStyles()
  const { authUserStore } = useStores()
  const isNotificationTurnedOn = authUserStore.notificationToken

  const handleSetNotifications = async () => {
    const permissionsRequested = await isPermissionsRequested()
    if (permissionsRequested) {
      await openSettings()
    } else {
      const token = await registerForPushNotifications()
      authUserStore.setNotificationToken(token)
      await authUserStore.updateUser({ deviceId: token })
    }
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
        onValueChange={handleSetNotifications}
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
    ...typographyPresets["h4-bold"],
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
    ...typographyPresets["p1-regular"],
    lineHeight: 24,
    color: "#475467",
  },
  toggleContainerStyle: {
    paddingVertical: theme.spacing[12],
  },
}))
