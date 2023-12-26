import { Text } from "app/components"
import Config from "app/config"
import React from "react"
import { Alert, Linking, TextStyle } from "react-native"

export const ProfilePolicies = () => {
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
      <Text style={$text} size="xs" tx="profile.byUsing" />
      <Text style={$text} weight="medium" size="xs" tx="profile.privacyPolicy" />
    </Text>
  )
}

const $textWrapper: TextStyle = {
  marginTop: 12,
  textAlign: "center",
}

const $text: TextStyle = {
  color: "#808080",
  lineHeight: 14.4,
  opacity: 0.5,
}
