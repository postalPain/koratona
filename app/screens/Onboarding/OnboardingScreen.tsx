import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import {  Screen } from "app/components"
import { AppStackScreenProps } from "app/navigators"
import { observer } from "mobx-react-lite"
import React, { FC, useRef, useEffect } from "react"
import { Dimensions, View, ScrollView } from "react-native"
import NotificationsStep from "./components/NotificationsStep"
import FavoriteTeamsStep from "./components/FavoriteTeamsStep"
import { useStores } from "app/models"

interface OnboardingScreenProps extends AppStackScreenProps<"Onboarding"> {}

const { width } = Dimensions.get("window")
export const OnboardingScreen: FC<OnboardingScreenProps> = observer(function OnboardingScreen({
  navigation,
  route
}) {
  const { currentStep = 0 } = route.params;
  const styles = useStyles()
  const { authUserStore } = useStores();
  const stepsCount = 2;
  const scrollViewRef = useRef<ScrollView | null>(null);
  const scrollToStep = (step: number) => {
    scrollViewRef.current?.scrollTo({
      x: width * step,
      y: 0,
      animated: true,
    });
  }
  const onNextButtonPress = () => {
    if (currentStep >= stepsCount - 1) {
      navigation.navigate("InitialProfileSettings")
    } else {
      authUserStore.setOnboardingCardsSaw()
      const nextStep = currentStep + 1;
      navigation.navigate("Onboarding", { currentStep: nextStep });
    }
  }
  useEffect(() => {
    scrollToStep(currentStep);
  }, [currentStep])

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["bottom"]}
      contentContainerStyle={styles.contentContainer}
    >
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={styles.steps}
      >
        <View style={[styles.stepsRuler, { width: width * stepsCount }]}>
          <NotificationsStep
            style={styles.step}
            onNext={onNextButtonPress}
          />
          <FavoriteTeamsStep
            style={styles.step}
            onNext={onNextButtonPress}
          />
        </View>
      </ScrollView>
    </Screen>
  )
})

const useStyles = createUseStyles(() => ({
  contentContainer: {
    flex: 1,
    width,
  },
  steps: {
    width,
  },
  step: {
    width,
  },
  stepsRuler: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
}))
