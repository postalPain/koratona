import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Button, Icon, Screen, Text } from "app/components"
import { typography } from "app/theme"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageBackground, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ExperiencesStackScreenProps } from "./ExperiencesStackNavigator"
import DashedLine from "react-native-dashed-line"

const screenBackgroundImage = require("assets/backgrounds/welcome-screen.png")

interface PurchaseResultScreenProps extends ExperiencesStackScreenProps<"purchaseResult"> {}

export const PurchaseResultScreen: FC<PurchaseResultScreenProps> = observer(
  function PurchaseResultScreen(_props) {
    const styles = useStyles()
    const { top: topInset } = useSafeAreaInsets()

    return (
      <Screen preset="fixed" contentContainerStyle={styles.screenContainer}>
        <ImageBackground style={styles.aspectRatioBox} source={screenBackgroundImage}>
          <View style={{ marginTop: topInset }}>
            <Icon icon="circleCheck" containerStyle={styles.checkIconContainer} size={30} />
            <Text style={styles.title} tx="experiencesScreen.thankYouForYour" />
            <Text style={[styles.title, styles.titleHighlighted]} tx="experiencesScreen.purchase" />
            <View style={styles.hintContainer}>
              <Text
                style={styles.hint}
                tx="experiencesScreen.checkYourEmailInboxForRedemptionDetails"
              />
            </View>
            <View style={styles.ticketWrapper}>
              <View style={styles.ticket}>
                <View style={styles.ticketTopPart}>
                  <Text style={styles.ticketLabel} tx="experiencesScreen.experience" />
                  <Text
                    style={styles.ticketExperienceName}
                    text="Training Day + Team Access"
                    weight="medium"
                  />
                  <Text
                    style={styles.ticketExperienceDescription}
                    text="Watch Al Hilal team’s training the day before the match. You will also get a chance to meet and interact with players"
                  />
                </View>
                <View style={styles.separator}>
                  <View style={[styles.separatorCircle, styles.leftCircle]} />
                  <DashedLine dashLength={8} dashGap={6} dashThickness={1} dashColor="#CFCFCF" />
                  <View style={[styles.separatorCircle, styles.rightCircle]} />
                </View>
                <View style={styles.ticketBottomPart}>
                  <Image source={require("assets/temp/qrCode_example.png")} />
                  <Text style={styles.ticketLabel} tx="experiencesScreen.validUntil" />
                  <Text style={styles.ticketValidToDate} text="July 2024" />
                </View>
              </View>
              <View style={styles.goToPurchasesButtonWrapper}>
                <Button
                  style={styles.goToPurchasesButton}
                  tx="experiencesScreen.viewMyPurchases"
                  textStyle={styles.goToPurchasesButtonText}
                  onPress={() => {
                    _props.navigation.navigate("experiencesScreen")
                  }}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </Screen>
    )
  },
)
const useStyles = createUseStyles((theme) => ({
  screenContainer: {
    height: "100%",
  },
  aspectRatioBox: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: theme.spacing[32],
  },
  checkIconContainer: {
    paddingTop: theme.spacing[12],
    alignItems: "center",
  },
  title: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: typography.fonts.instrumentSans.bold,
    fontSize: 32,
    lineHeight: 32,
    letterSpacing: -0.64,
    marginTop: theme.spacing[16],
  },
  titleHighlighted: {
    color: "#FADFD7",
    marginTop: 0,
  },
  hint: {
    color: "#B3B4C5",
    textAlign: "center",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 16.8,
  },
  hintContainer: {
    width: 220,
    alignSelf: "center",
    marginTop: theme.spacing[12],
  },
  ticket: {
    alignSelf: "center",
    marginTop: theme.spacing[32],
    paddingHorizontal: theme.spacing[24],
    backgroundColor: "#FFF",
    borderRadius: 15,
    overflow: "hidden",
  },
  ticketTopPart: {
    paddingTop: theme.spacing[24],
    paddingBottom: theme.spacing[12],
  },
  ticketLabel: {
    fontFamily: typography.fonts.instrumentSans.semiBold,
    color: "#80839F",
    textAlign: "center",
    fontSize: 14,
    textTransform: "uppercase",
  },
  ticketExperienceName: {
    textAlign: "center",
    fontSize: 20,
  },
  ticketExperienceDescription: {
    textAlign: "center",
    fontSize: 12,
    marginTop: theme.spacing[8],
    lineHeight: 14,
    color: "#80839F",
  },
  ticketBottomPart: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: theme.spacing[24],
  },
  ticketWrapper: {
    paddingHorizontal: theme.spacing[24],
  },
  ticketValidToDate: {
    fontSize: 16,
  },
  separator: {
    position: "relative",
  },
  separatorCircle: {
    position: "absolute",
    top: -16,
    width: 32,
    height: 32,
    borderRadius: 32,
    backgroundColor: "#1A1F51",
  },
  leftCircle: {
    left: -40,
  },
  rightCircle: {
    right: -40,
  },
  goToPurchasesButton: {
    backgroundColor: "#333865",
    borderColor: "#333865",
    marginTop: theme.spacing[16],
  },
  goToPurchasesButtonText: {
    color: "#FFF",
    fontSize: 16,
    lineHeight: 16,
    fontFamily: typography.fonts.instrumentSans.bold,
  },
  goToPurchasesButtonWrapper: {
    paddingHorizontal: theme.spacing[8],
  },
}))
