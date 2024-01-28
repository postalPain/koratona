import React from "react";
import { useStores } from "app/models";
import { useCallOnAppState } from "app/utils/useCallOnAppState";
import { isNotificationsPermitted, registerForPushNotifications, setNotificationsHandler } from "./index";

export const useNotifications = () => {
  const {
    authenticationStore: { isAuthenticated },
    authUserStore: { notificationToken, setNotificationToken },
  } = useStores()

  useCallOnAppState('active', async () => {
    const notificationsPermitted = await isNotificationsPermitted();
    if (notificationsPermitted && !notificationToken) {
      const token = await registerForPushNotifications();
      setNotificationToken(token);
    } else if (!notificationsPermitted && notificationToken) {
      setNotificationToken(null);
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
    if (isAuthenticated && notificationToken) {
      setNotificationsHandler();
    }
  }, [isAuthenticated, notificationToken]);
}
