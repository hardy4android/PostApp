import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import Loader from '@/components/icons/Loader';
import tw from '@/lib/tailwind';

interface ISpinnerProps {
  color?: string;
}

export default function Spinner({
  color = tw.color('core-contentPrimary'),
}: Readonly<ISpinnerProps>) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 1000 }), -1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Loader color={color} />
    </Animated.View>
  );
}
