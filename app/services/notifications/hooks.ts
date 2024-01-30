import React from "react";
import { Platform } from "react-native";
import messaging from "@react-native-firebase/messaging"
import notifee from "@notifee/react-native"
import { useCallOnAppState } from "app/utils/useCallOnAppState";
import { useStores } from "app/models";
import { isNotificationsPermitted, registerForPushNotifications } from "./index";

export const useNotifications = () => {
  const {
    authUserStore: { notificationToken, setNotificationToken, updateUser },
    authenticationStore: { isAuthenticated},
  } = useStores()

  useCallOnAppState('active', async () => {
    const notificationsPermitted = await isNotificationsPermitted();
    if (notificationsPermitted && !notificationToken) {
      const token = await registerForPushNotifications();
      setNotificationToken(token);
      if (isAuthenticated) {
        await updateUser({ deviceId: token });
      }
    } else if (!notificationsPermitted && notificationToken) {
      setNotificationToken(null);
      if (isAuthenticated) {
        await updateUser({ deviceId: null });
      }
    }
  }, [notificationToken, setNotificationToken]);


  React.useEffect(() => {
    (async () => {
      // If user switched off permissions in system settings while app was down, reset them in settings
      const notificationsPermitted = await isNotificationsPermitted();
      if (!notificationsPermitted) {
        setNotificationToken(null);
      }
    })()
  }, []);

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
    }
    const unsubscribeForegroundListener = messaging().onMessage(async (message) => {
      await notifee.displayNotification({
        title: message.notification?.title,
        body: message.notification?.body,
        android: {
          channelId: 'default',
          smallIcon: 'ic_launcher',
          // pressAction is needed if you want the notification to open the app when pressed
          pressAction: {
            id: 'default',
          },
        },
      });
    });
    return unsubscribeForegroundListener;
  }, []);
}
