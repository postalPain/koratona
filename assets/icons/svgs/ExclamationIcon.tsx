import * as React from "react"
import Svg, { Path } from "react-native-svg"

type Props = {
  width?: number
  height?: number
}

const ExclamationIcon: React.FC<Props> = ({ width = 62, height = 63 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 62 63" fill="none">
      <Path
        d="M59.875 31.5C59.875 15.5586 46.9414 2.625 31 2.625C15.0586 2.625 2.125 15.5586 2.125 31.5C2.125 47.4414 15.0586 60.375 31 60.375C46.9414 60.375 59.875 47.4414 59.875 31.5Z"
        stroke="#D0D5DD"
        strokeWidth="4"
        strokeMiterlimit="10"
      />
    </Svg>
  )
};

export default ExclamationIcon;
