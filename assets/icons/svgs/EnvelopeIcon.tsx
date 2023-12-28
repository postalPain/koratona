import * as React from "react"
import Svg, { Path } from "react-native-svg"

export default function EnvelopeIcon() {
  return (
    <Svg width={42} height={42} viewBox="0 0 42 42" fill="none">
      <Path
        d="M4.59375 9.84375H37.4062V34.7812H4.59375V9.84375Z"
        stroke="#D0D5DD"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.90625 11.1562L21 24.2812L36.0938 11.1562"
        stroke="#D0D5DD"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
