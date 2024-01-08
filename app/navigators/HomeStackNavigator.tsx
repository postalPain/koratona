import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { FeedScreen } from "../screens/Feed/FeedScreen"
import { PostDetailsScreen } from "../screens/Feed/PostDetailsScreen"
import { AppTabScreenProps } from "./AppHomeNavigator"
import { WidgetsScreen } from "app/screens/WidgetsScreen/WidgetsScreen"
import { PlayerScreen } from "app/screens/Player/PlayerScreen"
import { MatchWidgetScreen } from "app/screens/WidgetsScreen/MatchWidgetScreen"

type HomeFeedStackParamList = {
  feed: undefined
  postDetails: {
    id: number
  }
  widgets: undefined
  player: {
    id: number
  }
  matchCenter: {
    fixtureId: number
  }
}

export type HomeFeedStackScreenProps<T extends keyof HomeFeedStackParamList> =
  NativeStackScreenProps<HomeFeedStackParamList, T>

const Stack = createNativeStackNavigator<HomeFeedStackParamList>()

export const HomeStackNavigator: FC<AppTabScreenProps<"FeedNavigator">> = observer(function (
  _props: AppTabScreenProps<"FeedNavigator">,
) {
  return (
    <Stack.Navigator initialRouteName="feed">
      <Stack.Screen
        name="feed"
        component={FeedScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="postDetails"
        component={PostDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="widgets"
        component={WidgetsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="player"
        component={PlayerScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="matchCenter"
        component={MatchWidgetScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
})
