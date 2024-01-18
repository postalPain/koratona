import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  color?: string;
};

const FoulCardIcon: React.FC<Props> = ({ color = "#BB2C2C" }) => {
  return (
    <Svg width="9" height="12" viewBox="0 0 9 12" fill="none" transform="rotate(7.448)">
      <Path
        d="M1.8877 0.255518C1.8877 0.255518 8.62855 0.255518 8.62855 0.255518C8.62855 0.255518 8.62855 10.961 8.62855 10.961C8.62855 10.961 1.8877 10.961 1.8877 10.961C1.8877 10.961 1.8877 0.255518 1.8877 0.255518Z"
        fill={color}
      />
    </Svg>
  );
};

export default FoulCardIcon;
