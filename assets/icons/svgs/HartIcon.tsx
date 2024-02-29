import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface IHartIconProps {
  stroke?: string;
  fillActive?: string;
  filled?: boolean;
}
const HartIcon: React.FC<IHartIconProps> = ({
  stroke = '#D0D5DD',
  fillActive = '#dd5644',
  filled,
}) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path
        d="M10.571 4.16671L10.0001 4.75215L9.42922 4.16672C7.65345 2.34565 4.77435 2.34565 2.99858 4.16672C1.2705 5.93889 1.2174 8.7949 2.87836 10.6333L7.6503 15.9152C8.91803 17.3184 11.0821 17.3184 12.3498 15.9152L17.1218 10.6333C18.7828 8.79487 18.7297 5.93887 17.0016 4.16671C15.2258 2.34563 12.3467 2.34564 10.571 4.16671Z"
        stroke={filled ? fillActive : stroke}
        fill={filled ? fillActive : 'transparent'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default HartIcon
