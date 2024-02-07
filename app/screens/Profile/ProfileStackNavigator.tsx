import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { AppTabScreenProps } from "../../navigators/AppHomeNavigator"
import { ProfileScreen } from "./ProfileScreen"

type ProfileStackParamList = {
  profileScreen: undefined
  favoritePlayersScreen: undefined
}

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> = NativeStackScreenProps<
  ProfileStackParamList,
  T
>

const Stack = createNativeStackNavigator<ProfileStackParamList>()

export const ProfileStackNavigator: FC<AppTabScreenProps<"ProfileNavigator">> = observer(function (
  _props: AppTabScreenProps<"ProfileNavigator">,
) {
  return (
    <Stack.Navigator
      initialRouteName="profileScreen"
      screenOptions={{ presentation: "fullScreenModal" }}
    >
      <Stack.Screen
        name="profileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
})
