import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import { useStores } from "app/models"
import { HomeStackNavigator } from "app/navigators/HomeStackNavigator"
import { useFetchAuthUser } from "app/screens/Auth/hooks/useAuth"
import { ProductsStackNavigator } from "app/screens/Products/ProductsStackNavigator"
import { ProfileStackNavigator } from "app/screens/Profile/ProfileStackNavigator"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import BagIconSvg from "assets/icons/svgs/bottomNavbar/BagIcon"
import HomeIconSvg from "assets/icons/svgs/bottomNavbar/HomeIcon"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import ProfileIconSvg from "../../assets/icons/svgs/bottomNavbar/ProfileIcon"
import { Icon } from "../components"
import { translate } from "../i18n"
import { DemoDebugScreen } from "../screens"
import { colors, spacing } from "../theme"
import { typographyPresets } from "../theme/typography"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

export type AppHomeTabParamList = {
  DemoDebug: undefined
  FeedNavigator: undefined
  ProductsNavigator: undefined
  ProfileNavigator: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppTabScreenProps<T extends keyof AppHomeTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<AppHomeTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<AppHomeTabParamList>()

export function AppHomeNavigator() {
  const {
    authUserStore: { user },
  } = useStores()
  const { bottom } = useSafeAreaInsets()
  const bottomInset = useSafeAreaInsetsStyle(["bottom"])

  useFetchAuthUser()

  return (
    <Tab.Navigator
      initialRouteName="FeedNavigator"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 82 }, bottomInset],
        tabBarActiveTintColor: "#333865",
        tabBarInactiveTintColor: "#98A2B3",
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="ProductsNavigator"
        component={ProductsStackNavigator}
        options={{
          tabBarLabel: translate("appHomeNavigator.products"),
          tabBarIcon: BagIconSvg,
        }}
      />
      <Tab.Screen
        name="FeedNavigator"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: translate("appHomeNavigator.home"),
          tabBarIcon: HomeIconSvg,
        }}
      />
      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: translate("appHomeNavigator.userProfile"),
          tabBarIcon: ProfileIconSvg,
        }}
      />
      {user.isSuperAdmin && (
        <Tab.Screen
          name="DemoDebug"
          component={DemoDebugScreen}
          options={{
            tabBarLabel: translate("demoNavigator.debugTab"),
            tabBarIcon: ({ focused }) => (
              <Icon icon="settings" color={focused ? colors.tint : undefined} size={30} />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: "#F9FAFB",
  borderTopColor: "#0000001A",
  paddingBottom: spacing.sm,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.lg,
}

const $tabBarLabel: TextStyle = {
  ...typographyPresets["p2-regular"],
  flex: 1,
  marginTop: 4,
}
