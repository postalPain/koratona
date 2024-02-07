import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { ListItem, Text } from "app/components"
import { typography } from "app/theme"
import EnvelopeIcon from "assets/icons/svgs/EnvelopeIcon"
import WhatsAppIcon from "assets/icons/svgs/WhatsUpIcon"
import React from "react"
import { Linking, View } from "react-native"

export const Support = () => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <Text style={styles.title} tx="profile.getSupport" />
      <View style={styles.listContainer}>
        <ListItem
          LeftComponent={
            <View>
              <Text tx="profile.sendEmail" weight="semiBold" style={styles.listItemTitleText} />
              <Text text="support@fanfinity.io" style={styles.listItemValueText} />
            </View>
          }
          RightComponent={<EnvelopeIcon />}
          style={[styles.listItem, styles.firstListItem]}
          onPress={() => {
            Linking.openURL("mailto:support@fanfinity?subject=Support")
          }}
        />
        <ListItem
          LeftComponent={
            <View>
              <Text text="Whatsapp" weight="semiBold" style={styles.listItemTitleText} />
              <Text text="+966 537694960" style={styles.listItemValueText} />
            </View>
          }
          RightComponent={<WhatsAppIcon />}
          style={styles.listItem}
          onPress={() => {
            Linking.openURL("https://wa.me/+966537694960")
          }}
        />
      </View>
    </View>
  )
}

const useStyles = createUseStyles((theme) => ({
  container: {
    paddingTop: theme.spacing["24"],
    paddingHorizontal: theme.spacing["24"],
    paddingBottom: theme.spacing["32"],
  },
  title: {
    textAlign: "center",
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    letterSpacing: -0.64,
    fontSize: 32,
    lineHeight: 40,
    marginBottom: theme.spacing[24],
  },
  listContainer: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.10)",
  },
  firstListItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0, 0, 0, 0.10)",
  },
  listItem: {
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  listItemTitleText: {
    color: "#101828",
    fontSize: 16,
    lineHeight: 24,
  },
  listItemValueText: {
    color: "#98A2B3",
    fontSize: 14,
    lineHeight: 20,
  },
}))
