// components/icons/Gallery.tsx
import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

export default function Gallery({ color }: Readonly<{ color?: string }>) {
  const strokeColor = color || "#E87C9E";

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
        d="M24.25 12.25H13.75C12.9216 12.25 12.25 12.9216 12.25 13.75V24.25C12.25 25.0784 12.9216 25.75 13.75 25.75H24.25C25.0784 25.75 25.75 25.0784 25.75 24.25V13.75C25.75 12.9216 25.0784 12.25 24.25 12.25Z"
        stroke={strokeColor}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M16.375 17.5C16.9963 17.5 17.5 16.9963 17.5 16.375C17.5 15.7537 16.9963 15.25 16.375 15.25C15.7537 15.25 15.25 15.7537 15.25 16.375C15.25 16.9963 15.7537 17.5 16.375 17.5Z"
        stroke={strokeColor}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M25.75 21.25L22 17.5L13.75 25.75"
        stroke={strokeColor}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}