import Svg, { Path } from "react-native-svg";

export default function ArrowRight({ size = 16, color = "#fff" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M5 12h14M13 5l7 7-7 7"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
          fill="none"
      />
    </Svg>
  );
}