import * as React from "react";
import Svg, { Path } from "react-native-svg";
import tw from "@/lib/tailwind";

interface BackArrowProps {
  color?: string;
}

export default function BackArrow({ color }: BackArrowProps) {
  const fillColor =
    color ?? tw.color("coreExtension-backgroundInversePrimary");

  return (
    <Svg width={18} height={16} fill="none">
      <Path
        fill={fillColor}
        d="M17.333 9.25H4.25l4.583 6.25H5.917L.5 8 5.917.5h2.916L4.25 6.75h13.083v2.5Z"
      />
    </Svg>
  );
}
