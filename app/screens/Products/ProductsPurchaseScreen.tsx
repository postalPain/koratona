import Button from "@stryberventures/gaia-react-native.button"
import Form from "@stryberventures/gaia-react-native.form"
import Input from "@stryberventures/gaia-react-native.input"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Banner, Screen, Text } from "app/components"
import { GoBackComponent } from "app/components/GoBack"
import { translate, getWritingDirection } from "app/i18n"
import { handleArLang } from "app/i18n/handleArLang"
import { useStores } from "app/models"
import { Product } from "app/models/Products/Product"
import { APS_STATUSES, submitPayment } from "app/services/aps"
import { typography } from "app/theme"
import { formatPrice } from "app/utils/currencyFormatter"
import { isDateValid, isMonthValid } from "app/utils/validation"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { ActivityIndicator, Image, Keyboard, View } from "react-native"
import * as yup from "yup"
import { ProductPurchasePolicies } from "./ProductsPurchasePolicies"
import { ProductsStackScreenProps } from "./ProductsStackNavigator"
const masterCard = require("assets/images/mc.jpg")
const visa = require("assets/images/visa.png")
const cvc = require("assets/images/cvc.png")

const CardSchema = yup.object().shape({
  email: yup.string().email().required(),
  card_number: yup
    .string()
    .required(translate("productsScreen.cardNumberIsRequired"))
    .min(19, translate("productsScreen.cardNumberHasToBe16Digits")),
  expiry_date: yup
    .string()
    .required(translate("productsScreen.expirationDateIsRequiredAndHasToBeValid"))
    .min(5, translate("productsScreen.wrongExpireDate"))
    .test(
      "test-credit-card-expiration-date",
      translate("productsScreen.expirationYearIsRequired"),
      isDateValid,
    )
    .test(
      "test-credit-card-expiration-date",
      translate("productsScreen.expirationMonthIsRequired"),
      isMonthValid,
    ),
  card_security_code: yup
    .string()
    .required(translate("productsScreen.cvcIsRequired"))
    .min(3, translate("productsScreen.theLengthOfCvcHasToBe3")),
  card_holder_name: yup.string().required(translate("productsScreen.cardNumberIsRequired")),
})

interface IFormData {
  card_number: string
  expiry_date: string
  card_security_code: string
  email: string
  card_holder_name: string
}

interface ProductPurchaseScreenProps extends ProductsStackScreenProps<"productPurchase"> {}

export const ProductPurchaseScreen: FC<ProductPurchaseScreenProps> = observer(
  function ProductPurchaseScreen(_props) {
    const styles = useStyles()
    const { id } = _props.route.params
    const { productsStore, authUserStore } = useStores()
    const product = productsStore.getProductById(id)
    const { user } = authUserStore

    const [cardImage, setCardImage] = useState<React.ReactNode | null>(null)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [paymentError, setPaymentError] = useState<string | undefined>()

    const handleCardChange = (cardNum: string) => {
      setCardImage(
        cardNum[0] === "5" ? (
          <Image source={masterCard} />
        ) : cardNum[0] === "4" ? (
          <Image source={visa} />
        ) : null,
      )
    }

    const onSubmit = async (values: IFormData) => {
      Keyboard.dismiss()
      setIsLoading(true)
      const [expMonth, expYear] = values.expiry_date.split("/")
      const res = await submitPayment({
        expiry_date: `${expYear}${expMonth}`,
        card_number: values.card_number.replaceAll(" ", ""),
        card_security_code: values.card_security_code,
        amount: Math.round(Number.parseFloat(product?.price || "0") * 100),
        customer_email: values.email,
        userId: user.userId,
        productId: product?.id ?? 0,
        card_holder_name: values.card_holder_name,
      })

      setIsLoading(false)

      if (res.kind === "ok") {
        setPaymentError(undefined)
        if (res.data.status === APS_STATUSES.ON_HOLD) {
          _props.navigation.navigate("purchase3DSVerification", { url: res.data["3ds_url"] || "" })
        } else {
          _props.navigation.navigate("productPurchaseResult")
        }
      } else {
        setPaymentError(res.error)
      }
    }

    const productPrice = +(product?.price || 0)

    return (
      <Screen preset="auto" safeAreaEdges={["top"]} contentContainerStyle={styles.container}>
        <View style={styles.contentWrapper}>
          <GoBackComponent onPress={_props.navigation.goBack} />
          <Text tx="productsScreen.completePurchase" style={styles.heading} />
          <Form onSubmit={onSubmit} validationSchema={CardSchema}>
            {paymentError && <Text style={styles.paymentError}>{paymentError}</Text>}
            <View style={styles.contentContainer}>
              <View>
                <View style={styles.topFormWrapper}>
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
                <View>
                  <Text tx="productsScreen.paymentsDetails" style={styles.inputLabel} />
                  <View style={styles.holderNameContainer}>
                    <Input
                      name="card_holder_name"
                      variant="labelOutside"
                      placeholder={translate("productsScreen.nameOnCard")}
                    />
                  </View>
                  <Input
                    name="card_number"
                    mask="XXXX XXXX XXXX XXXX"
                    maxLength={19}
                    variant="labelOutside"
                    placeholder={translate("productsScreen.cardNumber")}
                    style={styles.input}
                    rightContent={cardImage}
                    onChangeText={(text) => handleCardChange(text)}
                  />
                  <View style={styles.cardContainer}>
                    <Input
                      name="expiry_date"
                      style={[styles.input, styles.cardLeftInput]}
                      variant="labelOutside"
                      mask="XX/XX"
                      maxLength={5}
                      placeholder={translate("productsScreen.mmyy")}
                    />
                    <Input
                      name="card_security_code"
                      secureTextEntry
                      style={[styles.input, styles.cardRightInput]}
                      variant="labelOutside"
                      maxLength={3}
                      placeholder={translate("productsScreen.cvc")}
                      rightContent={<Image source={cvc} />}
                    />
                  </View>
                </View>
              </View>
              <View>
                <Banner>
                  <Text
                    style={styles.purchaseDescription}
                    tx="productsScreen.youArePurchasing"
                    txOptions={{
                      experience: product ? product[handleArLang<Product>("name")] : "",
                    }}
                  />
                  <Text style={styles.purchasePrice} text={formatPrice(productPrice)} />
                </Banner>
                <Button type="submit" disabled={isLoading} style={styles.button}>
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
        </View>
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
    writingDirection: getWritingDirection(),
  },
  button: {
    minHeight: 59,
    marginTop: theme.spacing["8"],
    backgroundColor: "#1A1F51",
    borderColor: "#1A1F51",
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
  topFormWrapper: {
    marginBottom: theme.spacing["32"],
  },
  title: {
    fontSize: 18,
    color: theme.colors.text.headline,
    marginBottom: 30,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  input: {
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: "row",
    width: "100%",
  },
  holderNameContainer: {
    width: "100%",
    marginBottom: 20,
  },
  cardLeftInput: {
    flex: 1,
    marginRight: 10,
  },
  cardRightInput: {
    flex: 1,
    marginLeft: 10,
  },
  paymentError: {
    marginBottom: theme.spacing["16"],
    fontSize: 14,
    color: theme.colors.error.dark600,
  },
}))
