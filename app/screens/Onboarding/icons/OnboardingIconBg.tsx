import * as React from "react"
import Svg, { Rect, Defs, RadialGradient, Stop } from "react-native-svg"

type OnboardingIconBgProps = {
  color?: string
}

const OnboardingIconBg: React.FC<OnboardingIconBgProps> = () => {
  return (
    <Svg width="154" height="154" viewBox="0 0 154 154" fill="none">
      <Rect x="0" y="0" width="154" height="154" rx="10" fill="url(#paint0_radial_3842_19374)"/>
      <Defs>
        <RadialGradient
          id="paint0_radial_3842_19374"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(85 130) rotate(-90) scale(149)"
        >
          <Stop stopColor="#EDECF6"/>
          <Stop offset="0.0001" stopColor="#EDECF6"/>
          <Stop offset="1" stopColor="white"/>
        </RadialGradient>
      </Defs>
    </Svg>
  )
}

export default OnboardingIconBg
