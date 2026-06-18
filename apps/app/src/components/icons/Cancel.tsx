import * as React from "react";
import Svg, { Path } from "react-native-svg";
import tw from "@/lib/tailwind";

interface CancelProps {
  color?: string;
  size?: number;
}

export default function Cancel({
  color,
  size = 14,
}: CancelProps) {
  const fillColor = color ?? tw.color("coreExtension-backgroundInversePrimary");

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fill={fillColor}
        d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7a1 1 0 0 0-1.41 1.42L10.59 12l-4.9 4.89a1 1 0 1 0 1.42 1.41L12 13.41l4.89 4.9a1 1 0 0 0 1.41-1.42L13.41 12l4.9-4.89a1 1 0 0 0-.01-1.4Z"
      />
    </Svg>
  );
}
