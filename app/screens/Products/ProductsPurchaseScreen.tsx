import React, { FC, useState } from "react"
import { ActivityIndicator, Image, Keyboard, View } from "react-native"
import { observer } from "mobx-react-lite";
import Button from "@stryberventures/gaia-react-native.button";
import Form from "@stryberventures/gaia-react-native.form";
import Input from "@stryberventures/gaia-react-native.input";
import { createUseStyles } from "@stryberventures/gaia-react-native.theme";
import { submitPayment } from 'app/services/aps';
import { useStores } from "app/models";
import { typography } from "app/theme";
import { Banner, Screen, Text } from "app/components";
import { GoBackComponent } from "app/components/GoBack";
import { ProductPurchasePolicies } from "./ProductsPurchasePolicies";
import { ProductsStackScreenProps } from "./ProductsStackNavigator";
import * as yup from "yup";
import { isDateValid, isMonthValid } from "app/utils/validation";
const masterCard = require('../../../assets/images/mc.jpg');
const visa = require('../../../assets/images/visa.png');
const cvc = require('../../../assets/images/cvc.png');

const CardSchema = yup.object().shape({
  email: yup.string().email().required(),
  card_number: yup.string().required('Card number is required').min(19, 'Card number has 16 digits'),
  expiry_date: yup.string()
    .required('Expire date is required')
    .min(5, 'Wrong expire date')
    .test(
      'test-credit-card-expiration-date',
      'Year is invalid',
      isDateValid,
    )
    .test(
      'test-credit-card-expiration-date',
      'Month is invalid',
      isMonthValid,
    ),
  card_security_code: yup.string().required('CVC is required').min(3, 'The length of CVC is 3 symbols'),
});

interface IFormData {
  card_number: string;
  expiry_date: string;
  card_security_code: string;
  email: string;
}

interface ProductPurchaseScreenProps extends ProductsStackScreenProps<"productPurchase"> {}

export const ProductPurchaseScreen: FC<ProductPurchaseScreenProps> = observer(
  function ProductPurchaseScreen(_props) {
    const styles = useStyles()
    const { id } = _props.route.params
    const { productsStore } = useStores()
    const product = productsStore.getProductById(id)

    const [cardImage, setCardImage] = useState<React.ReactNode | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [paymentError, setPaymentError] = useState<string | undefined>();

    const handleCardChange = (cardNum: string) => {
      setCardImage(
        cardNum[0] === '5'
          ? <Image source={masterCard} />
          : cardNum[0] === '4'
            ? <Image source={visa} />
            : null,
      )
    };

    const onSubmit = async (values: IFormData) => {
      Keyboard.dismiss();
      setIsLoading(true);
      const [expMonth, expYear] = values.expiry_date.split('/');
      const res = await submitPayment({
        expiry_date: `${expYear}${expMonth}`,
        card_number: values.card_number.replaceAll(' ', ''),
        card_security_code: values.card_security_code,
        amount: Number.parseFloat(product?.price || '0') * 100,
        customer_email: values.email,
      });

      setIsLoading(false);

      if (res.kind === 'ok') {
        setPaymentError(undefined);
        _props.navigation.navigate("productPurchaseResult")
      } else {
        setPaymentError(res.error)
      }
    };

    return (
      <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={styles.container}>
        <View style={styles.contentWrapper}>
          <GoBackComponent onPress={_props.navigation.goBack} />
          <Text tx="productsScreen.completePurchase" weight="bold" style={styles.heading} />
          <Form
            onSubmit={onSubmit}
            validationSchema={CardSchema}
          >
            {paymentError && (
              <Text style={styles.paymentError}>{paymentError}</Text>
            )}
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
                  <Input
                    name="card_number"
                    mask="XXXX XXXX XXXX XXXX"
                    maxLength={19}
                    variant="labelOutside"
                    placeholder="Card number"
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
                      placeholder="MM/YY"
                    />
                    <Input
                      name="card_security_code"
                      secureTextEntry
                      style={[styles.input, styles.cardRightInput]}
                      variant="labelOutside"
                      maxLength={3}
                      placeholder="CVC"
                      rightContent={<Image source={cvc} />}
                    />
                  </View>
                </View>
              </View>
              <View>
                <Banner>
                  <Text
                    style={styles.purchaseDescription}
                    text={`You are purchasing the “${product?.name}“`}
                  />
                  <Text style={styles.purchasePrice} weight="bold" text={`SAR ${product?.price}`} />
                </Banner>
                <Button
                  type="submit"
                  disabled={isLoading}
                  style={styles.button}
                >
                  {isLoading ? (
                    <ActivityIndicator />
                  ) : (
                    <Text
                      style={styles.submitButtonText}
                      tx="productsScreen.makePayment"
                    />
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
    justifyContent: 'space-between',
  },
  input: {
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    width: '100%',
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
    marginBottom: theme.spacing['16'],
    fontSize: 14,
    color: theme.colors.error.dark600,
  },
}))
