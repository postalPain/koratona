import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import { Button, Screen, Text } from "app/components"
import React from "react"
import { Dimensions, View } from "react-native"
import Pagination from "./Pagination"

type OnboardingCarouselItemProps = {
  heading: string
  subHeading: string
  actionButtonText: string
  skipButton?: boolean
  paginationSize: number
  paginationIndex: number
  onActionButtonPress: () => void
  onSkipButtonPress?: () => void
  actionButtonDisabled?: boolean
}

export const OnboardingCarouselItem: React.FC<OnboardingCarouselItemProps> = ({
  heading,
  skipButton,
  subHeading,
  paginationSize,
  paginationIndex,
  actionButtonText,
  onSkipButtonPress,
  onActionButtonPress,
  actionButtonDisabled,
}) => {
  const styles = useStyles()
  return (
    <Screen
      preset="auto"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={[styles.contentContainer]}
    >
      <View style={styles.grow}>
        <View style={styles.imagePlaceholder} />
        <Text style={styles.text} text={heading} preset="heading" />
        <Text style={[styles.text, styles.subHeading]} text={subHeading} preset="subheading" />
        <Pagination size={paginationSize} paginationIndex={paginationIndex} />
      </View>
      {skipButton && (
        <Text
          style={styles.skipButton}
          onPress={onSkipButtonPress}
          tx="common.skipText"
          weight="bold"
        />
      )}
      <Button
        onPress={onActionButtonPress}
        text={actionButtonText}
        textStyle={styles.actionButtonText}
        pressedStyle={styles.actionButton}
        disabled={actionButtonDisabled}
        style={{
          ...styles.actionButton,
          ...(actionButtonDisabled
            ? {
                backgroundColor: "#E4E7EC",
                borderColor: "#E4E7EC",
              }
            : {}),
        }}
      />
    </Screen>
  )
}

const { width, height } = Dimensions.get("window")

const useStyles = createUseStyles((theme) => ({
  contentContainer: {
    flex: 1,
    width,
    paddingHorizontal: theme.spacing[24],
    height: height - 100,
    justifyContent: "space-between",
  },
  imagePlaceholder: {
    backgroundColor: "#D9D9D9",
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: theme.spacing[64],
    height: 250,
    width: 250,
  },
  text: {
    textAlign: "center",
  },
  subHeading: {
    fontSize: 14,
    lineHeight: 20,
    color: "#7D706C",
    marginBottom: theme.spacing[48],
  },
  actionButton: {
    backgroundColor: "#333865",
  },
  actionButtonText: {
    color: "#FFFFFF",
  },
  grow: {
    flex: 1,
  },
  skipButton: {
    color: "#333865",
    fontWeight: "bold",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: theme.spacing[24],
  },
}))
