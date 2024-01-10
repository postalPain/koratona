import React from "react"
import Svg, { Circle, Defs, G, LinearGradient, Stop } from "react-native-svg"

type Props = {
  value: number
  total?: number
  customEmptyColor?: string
  customFilledColor?: string
}

const CircularProgress: React.FC<Props> = ({
  value,
  total,
  customEmptyColor,
  customFilledColor,
}) => {
  const normalizedValue = Math.min(100, Math.max(0, (value / (total || 100)) * 100))

  const dashArray = Math.PI * 45 * 2
  const dashOffset = dashArray - (dashArray * normalizedValue) / 100

  const emptyColor = customEmptyColor || "#D0D5DD"
  const filledColor = customFilledColor || "#101828"

  return (
    <Svg width={100} height={100} viewBox="0 0 100 100">
      <Defs>
        <LinearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor={filledColor} />
          <Stop offset="100%" stopColor={filledColor} />
        </LinearGradient>
      </Defs>
      <G>
        <Circle cx={50} cy={50} r={45} fill="none" stroke={emptyColor} strokeWidth={7} />
        <Circle
          cx={50}
          cy={50}
          r={45}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={7}
          strokeDasharray={`${dashArray} ${dashArray}`}
          strokeDashoffset={dashOffset}
          transform="rotate(-90 50 50)"
        />
      </G>
    </Svg>
  )
}

export default CircularProgress
