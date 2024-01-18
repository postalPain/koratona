import Button from "@stryberventures/gaia-react-native.button"
import Form from "@stryberventures/gaia-react-native.form"
import Input from "@stryberventures/gaia-react-native.input"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Banner, Screen, Text } from "app/components"
import { GoBackComponent } from "app/components/GoBack"
import { useStores } from "app/models"
import { typography } from "app/theme"
import { CardNumber, Cvv, ExpiryDate, Frames } from "frames-react-native"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ActivityIndicator, View } from "react-native"
import { getButtonStyle } from "../Auth/helpers/buttonStyles"
import { ProductPurchasePolicies } from "./ProductsPurchasePolicies"
import { ProductsStackScreenProps } from "./ProductsStackNavigator"
import { formatPrice } from "app/utils/currencyFormatter"

interface ProductPurchaseScreenProps extends ProductsStackScreenProps<"productPurchase"> {}

export const ProductPurchaseScreen: FC<ProductPurchaseScreenProps> = observer(
  function ProductPurchaseScreen(_props) {
    const styles = useStyles()
    const { id } = _props.route.params
    const { productsStore } = useStores()
    const product = productsStore.getProductById(id)

    const [disabled] = React.useState<boolean>(false)
    const [isLoading] = React.useState<boolean>(false)

    const onSubmit = () => {
      _props.navigation.navigate("productPurchaseResult")
    }

    const productPrice = +(product?.price || 0)

    return (
      <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={styles.container}>
        <Form onSubmit={onSubmit}>
          <View style={styles.contentWrapper}>
            <View>
              <GoBackComponent onPress={_props.navigation.goBack} />
              <Text tx="productsScreen.completePurchase" weight="bold" style={styles.heading} />
              <View style={styles.inputsWrapper}>
                <Text tx="productsScreen.deliverPassesTo" style={styles.inputLabel} />
                <Input
                  name="email"
                  variant="labelOutside"
                  placeholder="olivia@example.com"
                  autoComplete="email"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                />
              </View>
              <Frames
                config={{
                  debug: true,
                  publicKey: "pk_test_4296fd52-efba-4a38-b6ce-cf0d93639d8a",
                }}
                cardTokenized={(e) => {
                  alert(e.token)
                }}
              >
                <Text tx="productsScreen.paymentsDetails" style={styles.inputLabel} />
                <CardNumber style={styles.cardNumber} placeholderTextColor="#9898A0" />

                <View style={styles.dateAndCode}>
                  <ExpiryDate style={styles.expiryDate} placeholderTextColor="#9898A0" />
                  <Cvv style={styles.cvv} placeholderTextColor="#9898A0" />
                </View>
              </Frames>
            </View>

            <View>
              <Banner>
                <Text
                  style={styles.purchaseDescription}
                  text={`You are purchasing the “${product?.name}“`}
                />
                <Text style={styles.purchasePrice} weight="bold" text={formatPrice(productPrice)} />
              </Banner>
              <Button
                type="submit"
                style={{ ...styles.button, ...getButtonStyle(disabled) }}
                disabled={disabled}
              >
                {isLoading ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={styles.submitButtonText} tx="productsScreen.makePayment" />
                )}
              </Button>
              <ProductPurchasePolicies />
            </View>
          </View>
        </Form>
      </Screen>
    )
  },
)

const useStyles = createUseStyles((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing[24],
    paddingBottom: theme.spacing[32],
  },
  heading: {
    fontSize: 32,
    lineHeight: 32,
    letterSpacing: -0.64,
    marginTop: theme.spacing["24"],
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    marginBottom: theme.spacing["32"],
    color: "#101828",
  },
  button: {
    marginTop: theme.spacing["8"],
    minHeight: 59,
  },
  submitButtonText: {
    fontFamily: typography.fonts.instrumentSans.bold,
    fontSize: 16,
    lineHeight: 24,
    color: "#fff",
  },
  inputLabel: {
    color: "#475467",
    fontSize: 14,
    fontFamily: typography.fonts.instrumentSans.semiBold,
    lineHeight: 16.8,
    marginBottom: theme.spacing["8"],
  },
  purchaseDescription: {
    textAlign: "center",
    fontSize: 14,
    lineHeight: 16.8,
    marginBottom: theme.spacing["12"],
  },
  purchasePrice: {
    fontFamily: typography.fonts.instrumentSansCondensed.bold,
    color: "#1A1F51",
    textAlign: "center",
    fontSize: 20,
    lineHeight: 20,
    letterSpacing: -0.4,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "space-between",
  },
  dateAndCode: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardNumber: {
    fontSize: 18,
    height: 50,
    color: "#475467",
    borderColor: "#D0D5DD",
    borderRadius: 5,
  },
  expiryDate: {
    fontSize: 18,
    height: 50,
    width: "48%",
    color: "#475467",
    borderColor: "#D0D5DD",
    borderRadius: 5,
  },
  cvv: {
    borderRadius: 5,
    fontSize: 18,
    height: 50,
    width: "48%",
    color: "#475467",
    borderColor: "#D0D5DD",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  inputsWrapper: {
    marginBottom: 40,
  },
}))
