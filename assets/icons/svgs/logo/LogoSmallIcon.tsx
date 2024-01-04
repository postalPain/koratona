import * as React from "react"
import Svg, { Path, Ellipse } from "react-native-svg"

const LogoSmallIcon: React.FC = () => {
  return (
    <Svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <Ellipse cx="12.9483" cy="14.3509" rx="9.81841" ry="9.81844" fill="#FADFD7" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.9519 9.04905C22.7994 2.4153 15.6745 -1.20588 9.04952 0.945448C2.41573 3.09811 -1.20574 10.2236 0.945814 16.8487C3.09803 23.476 10.2223 27.104 16.8483 24.9524C23.482 22.7997 27.1035 15.6742 24.9519 9.04905ZM18.446 9.61014L12.9488 5.21231L7.45155 9.61014L9.65046 16.2068H16.2471L18.446 9.61014ZM15.8653 21.9155C13.4005 22.7159 10.8426 22.4466 8.69517 21.3596L10.3633 19.4635H15.541L17.1975 21.3692C16.7749 21.5813 16.3301 21.7646 15.8653 21.9155Z"
        fill="#333865"
      />
    </Svg>
  )
}

export default LogoSmallIcon
