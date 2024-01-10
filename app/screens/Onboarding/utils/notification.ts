import Constants from "expo-constants"
import * as Device from "expo-device"
import * as Notifications from "expo-notifications"
import { Platform } from "react-native"

export async function registerForPushNotificationsAsync(grantedCb?: () => void): Promise<string | null> {
  try {
    let token: Notifications.ExpoPushToken | null = null

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      })
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== "granted") {
        alert("You need to enable permissions in order to receive notifications")
        return null
      }
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants?.expoConfig?.extra?.eas.projectId,
      });
      console.log(`EXPO token: ${token.data}`);
      const deviceToken = await Notifications.getDevicePushTokenAsync();
      console.log(`FCN/APN token: ${deviceToken.data}`);

      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        })
      });

      grantedCb && grantedCb();
    } else {
      alert("Must use physical device for Push Notifications")
      return null
    }

    return token?.data || null
  } catch (error) {
    console.log(error)

    return null
  }
}
