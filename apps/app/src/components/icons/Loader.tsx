import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import tw from '@/lib/tailwind';

interface ILoaderProps {
  color?: string;
}

export default function Loader({
  color = tw.color('white'),
}: Readonly<ILoaderProps>) {
  return (
    <Svg width={25} height={24} fill="none">
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m16.9 16.4 3.3 3.3M19.1 12h4.4M8.1 7.6 4.8 4.3m12.1 3.3 3.3-3.3M8.1 16.4l-3.3 3.3M1.5 12h4.4m6.6-11v4.4m0 13.2V23"
      />
    </Svg>
  );
}
