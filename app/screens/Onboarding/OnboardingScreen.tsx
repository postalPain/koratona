import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Button, Screen, Text } from "app/components"
import { useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { registerForPushNotifications } from "app/services/notifications"
import { typography } from "app/theme"
import { LinearGradient } from "expo-linear-gradient"
import debounce from "lodash.debounce"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Dimensions, View } from "react-native"
import Pagination from "./components/Pagination"
import onboardingData from "./constants/onboardingData"
import FireIconSvg from "./icons/FireIcon"
import PresentIconSvg from "./icons/PresentIcon"
import TogetherIconSvg from "./icons/TogetherIcon"

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

  const [showFinalButton, setShowFinalButton] = React.useState<boolean>(false)

  const currentStep = route.params?.currentStep || 0

  const {
    heading = "",
    subHeading = "",
    actionButtonText = "",
    skipButton = false,
  } = onboardingData[currentStep]

  const isNotificationScreen = onboardingData[currentStep].notifications

  const handleSetNotifications = async () => {
    const token = await registerForPushNotifications()
    authUserStore.setNotificationToken(token)
    setShowFinalButton(true)
  }

  const onNextButtonPress = () => {
    if (showFinalButton) {
      navigation.navigate("InitialProfileSettings")
    } else {
      authUserStore.setOnboardingCardsSaw()
      navigation.push("Onboarding", { currentStep: currentStep + 1 })
    }
  }

  const debouncedOnNextButtonPress = React.useCallback(
    debounce(onNextButtonPress, 500, { leading: true }),
    [],
  )

  const listOfIcons = [
    <PresentIconSvg key="presentIconSvg" />,
    <TogetherIconSvg key="togetherIconSvg" />,
    <FireIconSvg key="fireIconSvg" />,
  ]

  React.useEffect(() => {
    const isFirstStep = navigation.getState().routes.length === 1
    if (currentStep !== 0 || isFirstStep) return

    navigation.reset({
      index: 0,
      routes: [{ name: "Onboarding", params: { currentStep: 0 } }],
    })
  }, [navigation, currentStep])

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["bottom"]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.centered}>
        <LinearGradient
          style={styles.gradient}
          colors={["rgba(250, 223, 215, 1)", "rgba(255, 242, 239, 1)"]}
          start={{ x: 0.1, y: 0.9 }}
          end={{ x: 0.1, y: 0.1 }}
        >
          {listOfIcons[currentStep]}
        </LinearGradient>
        <Text style={styles.text} text={heading} preset="heading" />
        <Text style={[styles.text, styles.subHeading]} text={subHeading} preset="subheading" />
        <Pagination size={onboardingData.length} paginationIndex={currentStep} />
      </View>
      <View>
        {skipButton && !isNotificationTurnedOn && !showFinalButton && (
          <Text
            style={styles.maybeLaterButton}
            onPress={() => {
              setShowFinalButton(true)
            }}
            tx="common.skipText"
            weight="bold"
          />
        )}
        <View>
          {!showFinalButton && (
            <Button
              onPress={isNotificationScreen ? handleSetNotifications : debouncedOnNextButtonPress}
              text={actionButtonText}
              textStyle={styles.actionButtonText}
              pressedStyle={styles.actionButton}
              style={styles.actionButton}
            />
          )}
          {showFinalButton && (
            <Button
              onPress={() => {
                navigation.navigate("InitialProfileSettings")
              }}
              tx="onboardingScreen.setUpProfile"
              textStyle={styles.actionButtonText}
              pressedStyle={styles.actionButton}
              style={styles.actionButton}
            />
          )}
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
    paddingBottom: theme.spacing[40],
  },
  gradient: {
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: theme.spacing[64],
    height: 154,
    width: 154,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.10)",
    borderWidth: 0.5,
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
  centered: {
    flex: 1,
    justifyContent: "center",
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
