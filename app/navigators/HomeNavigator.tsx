import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { translate } from "../i18n"
import { DemoDebugScreen } from "../screens"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { HomeStackNavigator } from "app/screens/Home/HomeScreen"
import { ExperiencesScreen } from "app/screens/Experiences/ExperiencesScreen"
import { ProfileScreen } from "app/screens/Profile/ProfileScreen"

export type AppHomeTabParamList = {
  DemoDebug: undefined
  FeedNavigator: undefined
  Experiences: undefined
  UserProfile: undefined
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

export function HomeNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      initialRouteName="FeedNavigator"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: "#333865",
        tabBarInactiveTintColor: "#98A2B3",
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="Experiences"
        component={ExperiencesScreen}
        options={{
          tabBarLabel: translate("appHomeNavigator.experiences"),
          tabBarIcon: ({ focused }) =>
            focused ? <Icon icon="bagActive" size={30} /> : <Icon icon="bag" size={30} />,
        }}
      />
      <Tab.Screen
        name="FeedNavigator"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: translate("appHomeNavigator.home"),
          tabBarIcon: ({ focused }) =>
            focused ? <Icon icon="homeActive" size={30} /> : <Icon icon="home" size={30} />,
        }}
      />
      <Tab.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={{
          tabBarLabel: translate("appHomeNavigator.userProfile"),
          tabBarIcon: ({ focused }) =>
            focused ? <Icon icon="profileActive" size={30} /> : <Icon icon="profile" size={30} />,
        }}
      />
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
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: "#F9FAFB",
  borderTopColor: "#98A2B3",
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}
