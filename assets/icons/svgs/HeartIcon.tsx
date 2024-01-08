import * as React from "react"
import Svg, { Path } from "react-native-svg"

type Props = {
  focused?: boolean
}

const HeartIconIcon: React.FC<Props> = ({ focused }) => {
  if (focused) {
    return (
      <Svg width={35} height={35} viewBox="0 0 35 35" fill="none">
        <Path
          d="M17.4998 8.05616L18.6155 6.8575C21.6964 3.5475 26.6916 3.5475 29.7725 6.8575C32.8534 10.1675 32.8534 15.5341 29.7725 18.8441L19.7312 29.632C18.4989 30.956 16.5008 30.956 15.2684 29.632L5.22718 18.8441C2.14628 15.5341 2.14628 10.1675 5.22719 6.8575C8.30809 3.5475 13.3032 3.5475 16.3841 6.8575L17.4998 8.05616Z"
          fill="#DD5644"
        />
      </Svg>
    )
  }

  return (
    <Svg width={35} height={35} viewBox="0 0 35 35" fill="none">
      <Path
        d="M18.4989 7.29177L17.4998 8.3163L16.5008 7.2918C13.3932 4.10491 8.35481 4.10491 5.24721 7.29179C2.22307 10.3931 2.13015 15.3911 5.03682 18.6084L13.3877 27.8516C15.6062 30.3072 19.3934 30.3072 21.6119 27.8516L29.9629 18.6083C32.8695 15.3911 32.7766 10.3931 29.7525 7.29177C26.6449 4.10489 21.6065 4.10489 18.4989 7.29177Z"
        stroke="#98A2B3"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default HeartIconIcon
