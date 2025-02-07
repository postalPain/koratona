import * as React from "react"
import Svg, { Path } from "react-native-svg"

type Props = {
  focused?: boolean
}

const HomeIconSvg: React.FC<Props> = ({ focused }) => {
  if (focused) {
    return (
      <Svg width="28" height="31" viewBox="0 0 28 31" fill="none">
        <Path
          d="M0.875 12.3605C0.875 11.1108 1.4094 9.92079 2.34341 9.09056L10.1245 2.17399C12.3347 0.209397 15.6653 0.209398 17.8755 2.17399L25.6566 9.09056C26.5906 9.92079 27.125 11.1108 27.125 12.3605V24.25C27.125 27.4716 24.5133 30.0833 21.2917 30.0833H6.70833C3.48667 30.0833 0.875 27.4716 0.875 24.25V12.3605Z"
          fill="#333865"
        />
        <Path
          d="M8.1665 24.25C8.1665 21.0283 10.7782 18.4167 13.9998 18.4167C17.2215 18.4167 19.8332 21.0283 19.8332 24.25V30.0833H8.1665V24.25Z"
          fill="#E1C9C2"
        />
      </Svg>
    )
  }

  return (
    <Svg width="36" height="35" viewBox="0 0 36 35" fill="none">
      <Path
        d="M23.8333 32.0833V26.25C23.8333 23.0283 21.2217 20.4166 18 20.4166C14.7783 20.4166 12.1667 23.0283 12.1667 26.25V32.0833M31.125 14.8025V26.2016C31.125 29.45 28.5133 32.0833 25.2917 32.0833H10.7083C7.48667 32.0833 4.875 29.45 4.875 26.2016V14.8025C4.875 13.0365 5.66198 11.364 7.01855 10.247L14.3102 4.24276C16.4575 2.47458 19.5425 2.47458 21.6898 4.24275L28.9814 10.247C30.338 11.364 31.125 13.0365 31.125 14.8025Z"
        stroke="#98A2B3"
        strokeWidth="1.5"
      />
    </Svg>
  )
}

export default HomeIconSvg
