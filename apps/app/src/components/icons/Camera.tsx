// components/icons/Camera.tsx
import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

export default function Camera({ color }: Readonly<{ color?: string }>) {
  const strokeColor = color || "#5B3ADE";

  return (
    <Svg width={38} height={38} viewBox="0 0 38 38" fill="none">
      <Rect
        width={38}
        height={38}
        rx={12}
        fill={strokeColor}
        opacity={0.1}
      />
      <Path
        d="M27.25 24.25C27.25 24.6478 27.092 25.0294 26.8107 25.3107C26.5294 25.592 26.1478 25.75 25.75 25.75H12.25C11.8522 25.75 11.4706 25.592 11.1893 25.3107C10.908 25.0294 10.75 24.6478 10.75 24.25V16C10.75 15.6022 10.908 15.2206 11.1893 14.9393C11.4706 14.658 11.8522 14.5 12.25 14.5H15.25L16.75 12.25H21.25L22.75 14.5H25.75C26.1478 14.5 26.5294 14.658 26.8107 14.9393C27.092 15.2206 27.25 15.6022 27.25 16V24.25Z"
        stroke={strokeColor}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M19 22.75C20.6569 22.75 22 21.4069 22 19.75C22 18.0931 20.6569 16.75 19 16.75C17.3431 16.75 16 18.0931 16 19.75C16 21.4069 17.3431 22.75 19 22.75Z"
        stroke={strokeColor}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}