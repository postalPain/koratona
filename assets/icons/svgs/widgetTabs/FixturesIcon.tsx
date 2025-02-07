import * as React from "react"
import Svg, { Path } from "react-native-svg"

type Props = { focused?: boolean }

const FixturesIconSvg: React.FC<Props> = ({ focused }) => {
  return (
    <Svg width={25} height={24} viewBox="0 0 25 24" fill="none">
      <Path
        d="M3.5 9V18C3.5 20.2091 5.29086 22 7.5 22H17.5C19.7091 22 21.5 20.2091 21.5 18V9M3.5 9V7.5C3.5 5.29086 5.29086 3.5 7.5 3.5H17.5C19.7091 3.5 21.5 5.29086 21.5 7.5V9M3.5 9H21.5M16.5 2V5M8.5 2V5"
        stroke={focused ? "#1A1F51" : "#98A2B3"}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default FixturesIconSvg
