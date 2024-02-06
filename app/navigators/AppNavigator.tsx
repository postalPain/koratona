/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native"
import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack"
import * as Screens from "app/screens"
import { useShowOnboardingScreen } from "app/screens/hooks/useShowOnboardingScreen"
import { useNotifications } from "app/services/notifications"
import { colors } from "app/theme"
import * as storage from "app/utils/storage"
import I18n from "i18n-js"
import { observer } from "mobx-react-lite"
import React from "react"
import { ActivityIndicator, I18nManager, useColorScheme } from "react-native"
import Config from "../config"
import { useStores } from "../models"
import { AppHomeNavigator, AppHomeTabParamList } from "./AppHomeNavigator"
import { navigationRef, useBackButtonHandler, setNavigationReady } from "./navigationUtilities"
import RNRestart from "react-native-restart"
import { LANGUAGE_KEY, setLanguage } from "app/i18n"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  welcome: undefined
  Home: NavigatorScreenParams<AppHomeTabParamList>
  // 🔥 Your screens go here
  UserInfo: undefined
  Onboarding: Partial<{
    currentStep?: number
  }>
  InitialProfileSettings: undefined
  PostDetails: undefined
  ExperiencePurchase: undefined
  PurchaseResult: undefined
  OTPConfirmation: { phoneNumber: string }
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack(_props) {
  const { authenticationStore } = useStores()
  const [isLangLoading, setIsLangLoading] = React.useState(true)

  useNotifications()
  useShowOnboardingScreen()

  React.useEffect(() => {
    const loadLanguageFromStorage = async () => {
      const language = await storage.load(LANGUAGE_KEY)
      return language as "en" | "ar" | null
    }

    loadLanguageFromStorage().then((language) => {
      let RTLByDefault = true
      if (language) {
        I18n.locale = language
        RTLByDefault = language === "ar"
        I18nManager.allowRTL(RTLByDefault)
        I18nManager.forceRTL(RTLByDefault)
        setIsLangLoading(false)
      } else {
        setLanguage("ar", () => {
          RNRestart.restart()
        })
      }
    })
  }, [])

  if (isLangLoading) {
    return <ActivityIndicator color="#333865" />
  }

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      initialRouteName={authenticationStore.isAuthenticated ? "Home" : "welcome"}
    >
      {authenticationStore.isAuthenticated ? (
        <>
          <Stack.Screen name="Home" component={AppHomeNavigator} />
          <Stack.Screen name="UserInfo" component={Screens.UserInfoScreen} />
          <Stack.Screen
            name="InitialProfileSettings"
            component={Screens.InitialProfileSettingsScreen}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen name="Onboarding" component={Screens.OnboardingScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="OTPConfirmation" component={Screens.OTPConfirmation} />
          <Stack.Screen
            name="welcome"
            component={Screens.WelcomeScreen}
            options={{
              gestureEnabled: false,
            }}
          />
        </>
      )}

      {/** 🔥 Your screens go here */}
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      onReady={() => {
        setNavigationReady()
      }}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
