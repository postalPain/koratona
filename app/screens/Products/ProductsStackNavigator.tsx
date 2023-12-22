import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { AppTabScreenProps } from "../../navigators/AppHomeNavigator"
import { ProductPurchaseScreen } from "./ProductsPurchaseScreen"
import { ProductsScreen } from "./ProductsScreen"
import { ProductPurchaseResultScreen } from "./ProductPurchaseResultScreen"

type ProductsStackParamList = {
  productsScreen: undefined
  productPurchase: {
    id: number
  }
  productPurchaseResult: undefined
}

export type ProductsStackScreenProps<T extends keyof ProductsStackParamList> =
  NativeStackScreenProps<ProductsStackParamList, T>

const Stack = createNativeStackNavigator<ProductsStackParamList>()

export const ProductsStackNavigator: FC<AppTabScreenProps<"ProductsNavigator">> = observer(
  function (_props: AppTabScreenProps<"ProductsNavigator">) {
    return (
      <Stack.Navigator
        initialRouteName="productsScreen"
        screenOptions={{ presentation: 'fullScreenModal' }}
      >
        <Stack.Screen
          name="productsScreen"
          component={ProductsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="productPurchase"
          component={ProductPurchaseScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='productPurchaseResult'
          component={ProductPurchaseResultScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    )
  },
)
