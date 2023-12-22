import Button from "@stryberventures/gaia-react-native.button"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { typography } from "app/theme"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Image, StyleProp, View, ViewStyle } from "react-native"
import { ExclusiveBadge } from "./ExclusiveBadge"
import { Text } from "./Text"

export interface ProductsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  /**
   * Name of the product
   * @example "Training Day (DEC 21)"
   */
  name: string

  /**
   * Price of the product
   * @example "SAR 1,500"
   */
  price: string

  /**
   * Description of the product
   * @example "Watch Al Hilal team’s training the day before this weeks match"
   */
  description: string
  /**
   * Function to be called when user presses the action button
   * @example () => console.log("pressed")
   * @default undefined
   * @optional
   * @param {void} void
   */
  onActionPress: () => void

  /**
   * Background image of the product
   * @example require("assets/temp/experienceBg.png")
   * @default undefined
   * @optional
   * @param {string} string
   */
  bgImage?: string
}

export const ProductCard = observer(function Products({
  name,
  price,
  description,
  onActionPress,
  bgImage,
}: ProductsProps) {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <Image
        source={bgImage ? { uri: bgImage } : require("assets/temp/experienceBg.png")}
        resizeMode="contain"
      />
      <ExclusiveBadge />
      <View style={styles.infoBox}>
        <Text style={styles.name} text={name} weight="bold" />
        <Text style={styles.description} text={description} />
        <Text style={styles.price} text={price} weight="semiBold" />
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={onActionPress}>
          <Text weight="bold" style={styles.buttonText} tx="productsScreen.purchaseExperience" />
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
    letterSpacing: -1,
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
