import React from "react"
import { Platform } from "react-native"
import messaging from "@react-native-firebase/messaging"
import notifee, { EventType } from "@notifee/react-native"
import { useCallOnAppState } from "app/utils/useCallOnAppState"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { isNotificationsPermitted, registerForPushNotifications } from "./index"
import { untilNavigationReady } from "../../navigators/navigationUtilities"

type TMessage = {
  postId?: string
}
export const useNotifications = () => {
  const {
    authUserStore: { notificationToken, setNotificationToken, updateUser },
    authenticationStore: { isAuthenticated },
  } = useStores()
  const navigation = useNavigation()

  const messageDataHandler = ({ postId }: TMessage) => {
    if (postId) {
      // @ts-ignore
      navigation.navigate("postDetails", { id: postId })
    }
  }

  useCallOnAppState(
    "active",
    async () => {
      const notificationsPermitted = await isNotificationsPermitted()
      if (notificationsPermitted && !notificationToken) {
        const token = await registerForPushNotifications()
        setNotificationToken(token)
        if (isAuthenticated) {
          await updateUser({ deviceId: token })
        }
      } else if (!notificationsPermitted && notificationToken) {
        setNotificationToken(null)
        if (isAuthenticated) {
          await updateUser({ deviceId: null })
        }
      }
    },
    [notificationToken, setNotificationToken],
  )

  React.useEffect(() => {
    ;(async () => {
      // If user switched off permissions in system settings while app was down, reset them in settings
      const notificationsPermitted = await isNotificationsPermitted()
      if (!notificationsPermitted) {
        setNotificationToken(null)
      }
    })()
  }, [])

  React.useEffect(() => {
    if (Platform.OS === "android") {
      notifee.createChannel({
        id: "default",
        name: "Default Channel",
      })
    }
    ;(async () => {
      const message = await messaging().getInitialNotification()
      if (message?.data) {
        await untilNavigationReady
        messageDataHandler(message.data as TMessage)
      }
    })()
    const unsubscribeOpenAppListener = messaging().onNotificationOpenedApp((message) => {
      if (message.data) {
        messageDataHandler(message.data)
      }
    })
    messaging().setBackgroundMessageHandler(async () => {
      console.log("Background message handled")
    })

    const unsubscribeForegroundListener = messaging().onMessage(async (message) => {
      await notifee.displayNotification({
        title: message.notification?.title,
        body: message.notification?.body,
        android: {
          channelId: "default",
          smallIcon: "ic_launcher",
          // pressAction is needed if you want the notification to open the app when pressed
          pressAction: {
            id: "default",
          },
        },
        data: message.data,
      })
    })
    notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS && detail.notification && detail.notification.data) {
        messageDataHandler(detail.notification.data)
      }
    })
    return () => {
      unsubscribeForegroundListener()
      unsubscribeOpenAppListener()
    }
  }, [])
}
