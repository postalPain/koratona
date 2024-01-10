import { createUseStyles } from "@stryberventures/gaia-react-native.theme"
import React from "react"
import { View } from "react-native"

const LinearProgressBar: React.FC<{ value: number }> = ({ value }) => {
  const normalizedValue = Math.min(100, Math.max(0, value))
  const progressBarHeight = 5
  const styles = useStyles()

  return (
    <View style={{ ...styles.progressBarContainer, height: progressBarHeight }}>
      <View style={{ ...styles.progressLine, width: `${normalizedValue}%` }} />
    </View>
  )
}
const useStyles = createUseStyles(() => ({
  progressBarContainer: { backgroundColor: "#D0D5DD", borderRadius: 2 },
  progressLine: {
    height: "100%",
    backgroundColor: "#101828",
  },
}))

export default LinearProgressBar
