import * as Device from "expo-device"
import messaging from "@react-native-firebase/messaging"
import { Alert, Platform } from "react-native"

export * from "./hooks"

export async function registerForPushNotifications(): Promise<string | null> {
  try {
    let token: string

    if (Device.isDevice) {
      let notificationsPermitted = await isNotificationsPermitted()
      if (!notificationsPermitted) {
        await messaging().requestPermission()
        notificationsPermitted = await isNotificationsPermitted()
      }
      if (!notificationsPermitted) {
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
      token = await messaging().getToken()
      console.log(`Firebase token: ${token}`);
      return token
    } else {
      alert("Must use physical device for Push Notifications")
      return null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

export const isNotificationsPermitted = async (): Promise<boolean> => {
  const authStatus = await messaging().hasPermission()
  return (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  )
}

export const isPermissionsRequested = async (): Promise<boolean> => {
  const authStatus = await messaging().hasPermission()
  return !(Platform.OS === "ios" && authStatus === messaging.AuthorizationStatus.NOT_DETERMINED)
}
