import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import React from "react"
import { View, ViewStyle, StyleSheet } from "react-native"
import { Button, Text } from "app/components"
import { getTypographyPresets } from "app/theme"
import OnboardingIconBg from '../icons/OnboardingIconBg';
import FireIconSvg from '../icons/FireIcon';
import { registerForPushNotifications } from "app/services/notifications"
import { useStores } from "app/models"

type NotificationsStepProps = {
  style?: ViewStyle,
  onNext: () => void;
}

const NotificationsStep: React.FC<NotificationsStepProps> = ({ style, onNext }) => {
  const styles = useStyles();
  const { authUserStore } = useStores()
  const onEnableNotificationsPress = async () => {
    const token = await registerForPushNotifications()
    authUserStore.setNotificationToken(token)
    await authUserStore.updateUser({ deviceId: token })
    onNext();
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <View style={styles.iconBgBox}>
          <OnboardingIconBg />
          <View style={styles.iconBox}>
            <FireIconSvg />
          </View>
        </View>
        <View style={styles.headingBox}>
          <Text style={styles.text} tx={"onboardingCarousel.neverMissABeat.heading"} preset="heading" />
          <Text style={[styles.text, styles.subheading]} tx={"onboardingCarousel.neverMissABeat.subHeading"} preset="subheading" />
        </View>
      </View>
      <View style={styles.buttonPanel}>
        <Text
          style={styles.maybeLaterButton}
          onPress={onNext}
          tx="common.skipText"
          weight="bold"
        />
        <Button
          onPress={onEnableNotificationsPress}
          tx={"onboardingCarousel.neverMissABeat.actionButtonText"}
          textStyle={styles.actionButtonText}
          pressedStyle={styles.actionButton}
          style={styles.actionButton}
        />
      </View>
    </View>
  )
}

export default NotificationsStep;

const useStyles = createUseStyles((theme) => ({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: theme.spacing[24],
    paddingBottom: theme.spacing["32"],
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBgBox: {
    width: 155,
    height: 155,
    marginBottom: 68,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    borderColor: 'rgba(73, 67, 162, 0.20)',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconBox: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -47,
    marginTop: -47,
    width: 94,
    height: 94,
  },
  headingBox: {
    width: 300,
  },
  buttonPanel: {},
  text: {
    textAlign: "center",
    ...getTypographyPresets()["h3-bold"],
  },
  subheading: {
    ...getTypographyPresets()["p2-regular"],
    lineHeight: 20,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing[48],
    marginTop: theme.spacing[8],
  },
  maybeLaterButton: {
    color: "#125CB3",
    fontWeight: "bold",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: theme.spacing[24],
  },
  actionButton: {
    borderWidth: 0,
    backgroundColor: "#1983FF",
  },
  actionButtonText: {
    color: "#fff",
    ...getTypographyPresets()["btn1-bold"],
  },
}))
