import Constants from "expo-constants"
import * as Device from "expo-device"
import * as Notifications from "expo-notifications"
import { Platform, Alert } from "react-native"

export * from './hooks';

export async function registerForPushNotificationsAsync(grantedCb?: () => void): Promise<string | null> {
  try {
    let token: Notifications.ExpoPushToken | null = null

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
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
        Alert.alert(
          "Koratona",
          "It is sad that you denied permissions for our notifications. But if you change your mind you can always set them on Profile's page",
          [
            {
              text: "Got it",
            },
          ],
        )
        return null
      }
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants?.expoConfig?.extra?.eas.projectId,
      });
      console.log(`EXPO token: ${token.data}`);
      const deviceToken = await Notifications.getDevicePushTokenAsync();
      console.log(`FCN/APN token: ${deviceToken.data}`);

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

export const isNotificationsPermitted = async (): Promise<boolean> => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync()
  return existingStatus === "granted";
};

export const setNotificationsHandler = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    })
  });
};
