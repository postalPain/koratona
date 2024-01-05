import * as React from "react"
import Svg, { Path } from "react-native-svg"

type Props = { focused?: boolean }

const StandingsIconSvg: React.FC<Props> = ({ focused }) => {
  return (
    <Svg width={25} height={24} viewBox="0 0 25 24" fill="none">
      <Path
        d="M20.5 11H4.5M20.5 11C21.6046 11 22.5 11.8954 22.5 13V17C22.5 19.2091 20.7091 21 18.5 21H6.5C4.29086 21 2.5 19.2091 2.5 17V13C2.5 11.8954 3.39543 11 4.5 11M20.5 11V9C20.5 7.89543 19.6046 7 18.5 7M4.5 11V9C4.5 7.89543 5.39543 7 6.5 7M18.5 7H6.5M18.5 7V5C18.5 3.89543 17.6046 3 16.5 3H8.5C7.39543 3 6.5 3.89543 6.5 5V7M10.5 14H14.5"
        stroke={focused ? "#1A1F51" : "#98A2B3"}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default StandingsIconSvg
