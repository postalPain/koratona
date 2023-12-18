import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack"
import React, { FC } from "react"
import { AppTabScreenProps } from "../../navigators/HomeNavigator"
import { FeedScreen } from "./FeedScreen"
import { PostDetailsScreen } from "../PostDetailsScreen/PostDetailsScreen"
import { observer } from "mobx-react-lite"

type HomeFeedStackParamList = {
  feed: undefined
  postDetails: {
    id: number
  }
}

export type HomeFeedStackScreenProps<T extends keyof HomeFeedStackParamList> =
  NativeStackScreenProps<HomeFeedStackParamList, T>

const Stack = createNativeStackNavigator<HomeFeedStackParamList>()

export const HomeStackNavigator: FC<AppTabScreenProps<"FeedNavigator">> = observer(
  function DemoDebugScreen(_props: AppTabScreenProps<"FeedNavigator">) {
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
      </Stack.Navigator>
    )
  },
)
