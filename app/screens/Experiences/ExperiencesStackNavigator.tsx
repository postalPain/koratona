import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { AppTabScreenProps } from "../../navigators/AppHomeNavigator"
import { ExperiencePurchaseScreen } from "./ExperiencePurchaseScreen"
import { ExperiencesScreen } from "./ExperiencesScreen"
import { PurchaseResultScreen } from "./PurchaseResultScreen"

type ExperiencesStackParamList = {
  experiencesScreen: undefined
  experiencePurchase: {
    id: number
  }
  purchaseResult: undefined
}

export type ExperiencesStackScreenProps<T extends keyof ExperiencesStackParamList> =
  NativeStackScreenProps<ExperiencesStackParamList, T>

const Stack = createNativeStackNavigator<ExperiencesStackParamList>()

export const ExperiencesStackNavigator: FC<AppTabScreenProps<"ExperiencesNavigator">> = observer(
  function (_props: AppTabScreenProps<"ExperiencesNavigator">) {
    return (
      <Stack.Navigator
        initialRouteName="experiencesScreen"
        screenOptions={{ presentation: 'fullScreenModal' }}
      >
        <Stack.Screen
          name="experiencesScreen"
          component={ExperiencesScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="experiencePurchase"
          component={ExperiencePurchaseScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="purchaseResult"
          component={PurchaseResultScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    )
  },
)
