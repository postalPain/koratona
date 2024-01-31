import { Button, ListItem, Screen, Text } from "app/components"
import { AppStackScreenProps, goBack } from "app/navigators"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { useStores } from "app/models"

interface UserInfoScreenProps extends AppStackScreenProps<"UserInfo"> {}

export const UserInfoScreen: FC<UserInfoScreenProps> = observer(function UserInfoScreen() {
  const { authUserStore } = useStores()

  const user = authUserStore.user

  return (
    <Screen style={$root} preset="scroll" safeAreaEdges={["top", "bottom"]}>
      <Button tx="common.back" onPress={goBack} />
      <ListItem
        LeftComponent={<Text text="Email" />}
        RightComponent={<Text text={user.email || "Unknown email"} />}
      />
      <ListItem
        LeftComponent={<Text text="Name" />}
        RightComponent={<Text text={user.fullName} />}
      />
      <ListItem LeftComponent={<Text text="Phone" />} RightComponent={<Text text={user.phone} />} />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
