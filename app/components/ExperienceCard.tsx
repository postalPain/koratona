import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Image, StyleProp, View, ViewStyle } from "react-native"
import { ExclusiveBadge } from "./ExclusiveBadge"
import { Text } from "./Text"
import Button from "@stryberventures/gaia-react-native.button"
import { typography } from "app/theme"

export interface ExperienceProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  name: string
  price: string
  description: string
}

/**
 * Describe your component here
 */
export const ExperienceCard = observer(function Experience({
  name,
  price,
  description,
}: ExperienceProps) {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <Image source={require("assets/temp/experienceBg.png")} resizeMode="contain" />
      <ExclusiveBadge />
      <View style={styles.infoBox}>
        <Text style={styles.name} text={name} weight="bold" />
        <Text style={styles.description} text={description} />
        <Text style={styles.price} text={price} weight="semiBold" />
      </View>
      <View style={styles.buttonContainer}>
        <Button type="submit" style={styles.button}>
          <Text weight="bold" style={styles.buttonText} tx="experiencesScreen.purchaseExperience" />
        </Button>
      </View>
    </View>
  )
})

const useStyles = createUseStyles((theme) => ({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: theme.spacing["32"],
    minHeight: 59,
    backgroundColor: "#1A1F51",
    borderColor: "#333865",
  },
  buttonText: {
    color: "#fff",
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: theme.spacing[32],
  },
  name: {
    fontSize: 32,
    lineHeight: 32,
    textAlign: "center",
    fontFamily: typography.fonts.instrumentSans.bold,
    color: "#101828",
    textTransform: "uppercase",
    letterSpacing: -2,
  },
  description: {
    paddingVertical: theme.spacing[12],
    color: "#475467",
    fontSize: 14,
    lineHeight: 16.8,
    textAlign: "center",
  },
  price: {
    color: "#101828",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    fontFamily: typography.fonts.instrumentSans.semiBold,
  },
  infoBox: {
    paddingTop: theme.spacing[40],
    paddingHorizontal: theme.spacing[16],
  },
}))
