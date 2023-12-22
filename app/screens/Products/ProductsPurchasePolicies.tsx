import { Text } from "app/components"
import Config from "app/config"
import React from "react"
import { Alert, Linking, TextStyle } from "react-native"

export const ProductPurchasePolicies = () => {
  const handleOpenPolicies = async () => {
    const url = Config.PRIVACY_POLICIES_URL
    const supported = await Linking.canOpenURL(url)

    if (supported) {
      await Linking.openURL(url)
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`)
    }
  }

  return (
    <Text onPress={handleOpenPolicies} style={$textWrapper}>
      <Text style={$lighter} size="xs" tx='productsScreen.policiesByMakingPurchase' />
      <Text style={$darker} size="xs" tx='productsScreen.termsOfOfConditions' />
    </Text>
  )
}

const $textWrapper: TextStyle = {
  marginTop: 12,
  textAlign: "center",
}

const $lighter = {
  color: "#808080",
}

const $darker = {
  color: "#000000",
}
