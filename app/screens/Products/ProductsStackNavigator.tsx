import React, { FC } from "react"
import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import { AppTabScreenProps } from "../../navigators/AppHomeNavigator"
import { ProductPurchaseScreen } from "./ProductsPurchaseScreen"
import { ProductsScreen } from "./ProductsScreen"
import { ProductPurchaseResultScreen } from "./ProductPurchaseResultScreen"
import { Purchase3DSVerificationScreen } from "./Purchase3DSVerificationScreen"

type ProductsStackParamList = {
  productsScreen: undefined
  productPurchase: {
    id: number
  }
  productPurchaseResult: undefined
  purchase3DSVerification: {
    url: string
  }
}

export type ProductsStackScreenProps<T extends keyof ProductsStackParamList> =
  NativeStackScreenProps<ProductsStackParamList, T>

const Stack = createNativeStackNavigator<ProductsStackParamList>()

export const ProductsStackNavigator: FC<AppTabScreenProps<"ProductsNavigator">> = observer(
  function (_props: AppTabScreenProps<"ProductsNavigator">) {
    return (
      <Stack.Navigator
        initialRouteName="productsScreen"
        screenOptions={{ presentation: "fullScreenModal" }}
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
          name="productPurchaseResult"
          component={ProductPurchaseResultScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="purchase3DSVerification"
          component={Purchase3DSVerificationScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    )
  },
)
