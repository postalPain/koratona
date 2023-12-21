import Button from "@stryberventures/gaia-react-native.button"
import Form from "@stryberventures/gaia-react-native.form"
import Input from "@stryberventures/gaia-react-native.input"
import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Banner, Icon, Screen, Text } from "app/components"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ActivityIndicator, Pressable, View } from "react-native"
import { ExperiencesStackScreenProps } from "./ExperiencesStackNavigator"
import { getButtonStyle } from "../Auth/helpers/buttonStyles"
import { typography } from "app/theme"
import { PurchasePolicies } from "./PurchasePolicies"

interface ExperiencePurchaseScreenProps extends ExperiencesStackScreenProps<'experiencePurchase'> {}

export const ExperiencePurchaseScreen: FC<ExperiencePurchaseScreenProps> = observer(
  function ExperiencePurchaseScreen(_props) {
    const styles = useStyles()
    const [disabled] = React.useState<boolean>(false)
    const [isLoading] = React.useState<boolean>(false)

    const onSubmit = () => {
      console.log("submit")
      _props.navigation.navigate("purchaseResult")
    }

    return (
      <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={styles.container}>
        <Form
          // validationSchema={loginValidationSchema}
          // onChange={(_, { isValid }) => {
          //   setDisabled(!isValid)
          //   setError(undefined)
          // }}

          onSubmit={onSubmit}
        >
          <View style={styles.contentWrapper}>
            <View>
              <View style={styles.header}>
                <Pressable style={styles.leftHeaderComponent} onPress={_props.navigation.goBack}>
                  <Icon icon="back" color="#98A2B3" />
                  <Text text="Go back" style={styles.leftHeaderComponentText} />
                </Pressable>
              </View>
              <Text tx="experiencesScreen.completePurchase" weight="bold" style={styles.heading} />

              <View>
                <Text tx="experiencesScreen.deliverPassesTo" style={styles.inputLabel} />
                <Input
                  name="email"
                  variant="labelOutside"
                  placeholder="olivia@example.com"
                  autoComplete="email"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  // errorStyle={styles.hintsStyles}
                />
              </View>
            </View>

            <View>
              <Banner>
                <Text
                  style={styles.purchaseDescription}
                  text="You are purchasing the “Training day + Team access” experience for"
                />
                <Text style={styles.purchasePrice} weight="bold" text="SAR 2,500" />
              </Banner>
              <Button
                type="submit"
                style={{ ...styles.button, ...getButtonStyle(disabled) }}
                disabled={disabled}
              >
                {isLoading ? (
                  <ActivityIndicator />
                ) : (
                  <Text
                    weight="bold"
                    style={styles.submitButtonText}
                    tx="experiencesScreen.makePayment"
                  />
                )}
              </Button>
              <PurchasePolicies />
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
  leftHeaderComponent: {
    flexDirection: "row",
  },
  leftHeaderComponentText: {
    paddingLeft: 8,
    color: "#98A2B3",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  heading: {
    fontSize: 32,
    lineHeight: 32,
    letterSpacing: -2,
    marginTop: theme.spacing["24"],
    marginBottom: theme.spacing["32"],
  },
  button: {
    marginTop: theme.spacing["8"],
    minHeight: 59,
  },
  submitButtonText: {
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
    marginBottom: theme.spacing["8"],
  },
  purchasePrice: {
    fontFamily: typography.fonts.instrumentSans.bold,
    textAlign: "center",
    fontSize: 20,
    lineHeight: 20,
    letterSpacing: -0.5,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "space-between",
  },
}))
