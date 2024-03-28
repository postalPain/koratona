import * as React from "react"
import Svg, { Path } from "react-native-svg"

type Props = {
  color: string
}

export default function PentagonIcon({ color }: Props) {
  return (
    <Svg width={255} height={418} viewBox="0 0 255 418" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M255 107.086L127.5 0L0 107.086L51.0004 267.713H204L255 107.086ZM195.143 406.717C137.975 426.209 78.6513 419.65 28.8439 393.183L67.5345 347.012H187.622L226.042 393.415C216.241 398.581 205.924 403.045 195.143 406.717Z"
        fill={color}
      />
    </Svg>
  )
}
