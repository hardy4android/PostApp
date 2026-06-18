import Svg, { Path } from "react-native-svg";

export default function Sparkle({ size = 24, color = "#fff" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"
        fill={color}
      />
    </Svg>
  );
}