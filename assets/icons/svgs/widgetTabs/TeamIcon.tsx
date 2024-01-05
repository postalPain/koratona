import * as React from "react"
import Svg, { Path } from "react-native-svg"

type Props = { focused?: boolean }

const TeamIconSvg: React.FC<Props> = ({ focused }) => {
  return (
    <Svg width={25} height={24} viewBox="0 0 25 24" fill="none">
      <Path
        d="M19.4989 21.8743C21.2247 21.4306 22.5 19.8642 22.5 18V6C22.5 3.79086 20.7091 2 18.5 2H6.5C4.29086 2 2.5 3.79086 2.5 6V18C2.5 19.8642 3.77532 21.4306 5.50111 21.8743M19.4989 21.8743C19.1796 21.9563 18.8449 22 18.5 22H6.5C6.1551 22 5.82039 21.9563 5.50111 21.8743M19.4989 21.8743C19.4318 18.0663 16.324 15 12.5 15C8.67601 15 5.56818 18.0663 5.50111 21.8743M15.5 9C15.5 7.34315 14.1569 6 12.5 6C10.8431 6 9.5 7.34315 9.5 9C9.5 10.6569 10.8431 12 12.5 12C14.1569 12 15.5 10.6569 15.5 9Z"
        stroke={focused ? "#1A1F51" : "#98A2B3"}
        strokeWidth={1.5}
      />
    </Svg>
  )
}

export default TeamIconSvg
