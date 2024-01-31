import { useStores } from "app/models"
import { navigationRef } from "app/navigators"
import React from "react"

export const useShowOnboardingScreen = () => {
  const {
    authenticationStore: { isAuthenticated, showingOnboarding },
    authUserStore: { isOnboardingCardsSaw },
  } = useStores()

  React.useEffect(() => {
    if (isAuthenticated && showingOnboarding) {
      isOnboardingCardsSaw.then((sawOnboarding) => {
        if (sawOnboarding) {
          navigationRef.current?.navigate("InitialProfileSettings")
        } else {
          navigationRef.current?.navigate("Onboarding", { currentStep: 0 })
        }
      })
    }
  }, [showingOnboarding, isAuthenticated])
}
