import { Text } from "app/components"
import Config from "app/config"
import React from "react"
import { Alert, Linking, TextStyle } from "react-native"

export const AuthPolicies = () => {
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
      <Text style={$lighter} size="xs" tx="policies.agreement" />
      <Text style={$darker} size="xs" tx="policies.privacy" />
      <Text style={$lighter} size="xs" tx="common.and" />
      <Text style={$darker} size="xs" tx="policies.terms" />
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
