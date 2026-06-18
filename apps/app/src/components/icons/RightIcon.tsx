import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function ChevronRight({
  color,
}: Readonly<{ color?: string }>) {
  const fillColor = color || '#000000';

  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
      <Path
        fill={fillColor}
        d="M4.7001 10C4.5001 10 4.3001 9.90001 4.2001 9.80001C3.9001 9.50001 3.9001 9.00001 4.2001 8.70001L6.9001 6.00001L4.2001 3.30001C3.9001 3.00001 3.9001 2.50001 4.2001 2.20001C4.5001 1.90001 5.0001 1.90001 5.3001 2.20001L8.6001 5.40001C8.9001 5.70001 8.9001 6.20001 8.6001 6.50001L5.3001 9.70001C5.1001 9.90001 4.9001 10 4.7001 10Z"
      />
    </Svg>
  );
}