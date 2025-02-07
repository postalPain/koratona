import { Text } from "app/components"
import Config from "app/config"
import React from "react"
import { Alert, Linking, TextStyle, View } from "react-native"
import { typographyPresets } from "../../theme/typography"

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
      <Text style={$lighter} size="xs" tx="productsScreen.policiesByMakingPurchase" />
      <View>
        <Text style={$darker} size="xs" tx="productsScreen.termsOfOfConditions" />
      </View>
    </Text>
  )
}

const $textWrapper: TextStyle = {
  marginTop: 12,
  textAlign: "center",
}

const $lighter: TextStyle = {
  color: "#808080",
  lineHeight: 24,
  ...typographyPresets["p2-semibold"],
}

const $darker: TextStyle = {
  color: "#000000",
  lineHeight: 24,
  ...typographyPresets["p2-semibold"],
}
