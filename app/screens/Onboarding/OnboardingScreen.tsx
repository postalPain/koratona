import { Screen } from "app/components"
import { AppStackScreenProps } from "app/navigators"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { SwiperFlatList } from "react-native-swiper-flatlist"
import { SwiperFlatListRefProps } from "react-native-swiper-flatlist/src/components/SwiperFlatList/SwiperFlatListProps"
import { OnboardingCarouselItem } from "./components/OnboardingCarouselItem"
import onboardingData from "./constants/onboardingData"
import { registerForPushNotificationsAsync } from "./utils/notification"
import { useStores } from "app/models"

interface OnboardingScreenProps extends AppStackScreenProps<"Onboarding"> {}

export const OnboardingScreen: FC<OnboardingScreenProps> = observer(function OnboardingScreen(
  _props,
) {
  const { authUser } = useStores()
  const [currentStep, setCurrentStep] = React.useState(0)
  const scrollRef = React.useRef<SwiperFlatListRefProps>(null)

  const goToNextIndex = () => {
    const isLast = currentStep === onboardingData.length - 1
    if (!scrollRef.current || isLast) {
      _props.navigation.navigate("InitialProfileSettings")
      return
    }
    scrollRef.current.scrollToIndex({ index: currentStep + 1 })
    setCurrentStep(currentStep + 1)
  }

  const handleSetNotifications = async () => {
    const token = await registerForPushNotificationsAsync(goToNextIndex)
    authUser.setNotificationToken(token)
  }

  return (
    <Screen style={$root} preset="scroll">
      <SwiperFlatList onChangeIndex={({ index }) => setCurrentStep(index)} ref={scrollRef}>
        {onboardingData.map((dataItem) => (
          <OnboardingCarouselItem
            key={dataItem.id}
            heading={dataItem.heading}
            subHeading={dataItem.subHeading}
            paginationSize={onboardingData.length}
            paginationIndex={currentStep}
            actionButtonText={dataItem.actionButtonText}
            onActionButtonPress={dataItem.notifications ? handleSetNotifications : goToNextIndex}
            skipButton={!!dataItem.skipButton}
            onSkipButtonPress={goToNextIndex}
            actionButtonDisabled={
              dataItem.notifications ? authUser.notificationPermissionAsked : false
            }
          />
        ))}
      </SwiperFlatList>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
