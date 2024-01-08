import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Button, Screen, Text } from "app/components"
import { useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Dimensions, Pressable, View } from "react-native"
import Pagination from "./components/Pagination"
import onboardingData from "./constants/onboardingData"
import { registerForPushNotificationsAsync } from "./utils/notification"
// @ts-ignore
import debounce from "lodash.debounce"
import { typography } from "app/theme"

interface OnboardingScreenProps extends AppStackScreenProps<"Onboarding"> {
  currentStep?: number
}

export const OnboardingScreen: FC<OnboardingScreenProps> = observer(function OnboardingScreen({
  navigation,
  route,
}) {
  const styles = useStyles()
  const { authUserStore } = useStores()
  const isNotificationTurnedOn = authUserStore.notificationToken

  const currentStep = route.params?.currentStep || 0
  const { heading, subHeading, actionButtonText, skipButton } = onboardingData[currentStep]
  const isNotificationScreen = onboardingData[currentStep].notifications

  const handleSetNotifications = async () => {
    const token = await registerForPushNotificationsAsync(onNextButtonPress)
    authUserStore.setNotificationToken(token)
  }

  const isLast = currentStep === onboardingData.length - 1

  const onNextButtonPress = () => {
    if (isLast) {
      navigation.navigate("InitialProfileSettings")
    } else {
      navigation.push("Onboarding", { currentStep: currentStep + 1 })
    }
  }

  const debouncedOnNextButtonPress = React.useCallback(
    debounce(onNextButtonPress, 500, { leading: true }),
    [],
  )

  return (
    <Screen
      preset="auto"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.grow}>
        <View style={styles.imagePlaceholder} />
        <Text style={styles.text} text={heading} preset="heading" />
        <Text style={[styles.text, styles.subHeading]} text={subHeading} preset="subheading" />
        <Pagination size={onboardingData.length} paginationIndex={currentStep} />
      </View>
      <View>
        {skipButton && !isNotificationTurnedOn && (
          <Text
            style={styles.maybeLaterButton}
            onPress={debouncedOnNextButtonPress}
            tx="common.skipText"
            weight="bold"
          />
        )}
        <View>
          {!skipButton && !isLast && (
            <Pressable
              onPress={() => {
                navigation.navigate("InitialProfileSettings")
              }}
            >
              <Text tx="common.skip" style={styles.skipButton} />
            </Pressable>
          )}
          <Button
            onPress={isNotificationScreen ? handleSetNotifications : debouncedOnNextButtonPress}
            text={isNotificationScreen && isNotificationTurnedOn ? "Continue" : actionButtonText}
            textStyle={styles.actionButtonText}
            pressedStyle={styles.actionButton}
            style={styles.actionButton}
          />
        </View>
      </View>
    </Screen>
  )
})

const { width } = Dimensions.get("window")

const useStyles = createUseStyles((theme) => ({
  contentContainer: {
    flex: 1,
    width,
    paddingHorizontal: theme.spacing[24],
    justifyContent: "space-between",
    paddingBottom: theme.spacing[40],
  },
  imagePlaceholder: {
    backgroundColor: "#D9D9D9",
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: theme.spacing[64],
    height: 200,
    width: 200,
  },
  text: {
    textAlign: "center",
  },
  subHeading: {
    fontSize: 14,
    lineHeight: 20,
    color: "#7D706C",
    marginBottom: theme.spacing[48],
  },
  actionButton: {
    backgroundColor: "#333865",
  },
  actionButtonText: {
    color: "#FFFFFF",
  },
  grow: {
    flex: 1,
  },
  maybeLaterButton: {
    color: "#333865",
    fontWeight: "bold",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: theme.spacing[24],
  },
  skipButton: {
    textAlign: "center",
    fontFamily: typography.fonts.instrumentSans.semiBold,
    color: "#333865",
    marginBottom: theme.spacing[24],
  },
}))
