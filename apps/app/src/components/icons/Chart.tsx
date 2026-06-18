// components/icons/Chart.tsx
import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

export default function Chart({ color }: Readonly<{ color?: string }>) {
  const strokeColor = color || "#7C5CE8";

  return (
    <Svg width={38} height={38} viewBox="0 0 38 38" fill="none">
      <Rect
        width={38}
        height={38}
        rx={12}
        fill={strokeColor}
        opacity={0.07}
      />
      <Path
        d="M23.5 25V17.5M19 25V13M14.5 25V20.5"
        stroke={strokeColor}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}