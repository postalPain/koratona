import * as React from "react"
import Svg, { Path } from "react-native-svg"

type Props = {
  width?: number
  height?: number
}

const NetworkOffIcon: React.FC<Props> = ({ width = 78, height = 77 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 78 77" fill="none">
      <Path
        d="M21.2716 41.9797C24.2905 39.5234 27.7882 37.7233 31.5417 36.6943M46.5845 36.6757C50.3662 37.703 53.8903 39.5125 56.9288 41.9872M38.9999 45.4286L39.1002 15.7143M12.2051 33.1917C17.7312 28.4317 24.4332 25.2417 31.6122 23.9543M46.7925 24.0286C53.8211 25.3621 60.3748 28.5224 65.7948 33.1917"
        stroke="#D0D5DD"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M39.0004 60.2857C41.0518 60.2857 42.7147 58.6228 42.7147 56.5714C42.7147 54.5201 41.0518 52.8571 39.0004 52.8571C36.9491 52.8571 35.2861 54.5201 35.2861 56.5714C35.2861 58.6228 36.9491 60.2857 39.0004 60.2857Z"
        fill="#D0D5DD"
        stroke="#D0D5DD"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
};

export default NetworkOffIcon;
