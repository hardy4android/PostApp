import { cva, VariantProps } from 'class-variance-authority';
import { MotiView } from 'moti';
import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import APP from '@/constants/APP';
import tw from '@/lib/tailwind';

const toastVariants = cva(
  'absolute bottom-10 flex-row items-center gap-3 px-5 py-3 rounded-[20px] shadow-2xl border',
  {
    variants: {
      intent: {
        success: 'bg-[#10B981] border-white/20',
        error: 'bg-[#EF4444] border-white/20',
        topSuccess: `top-10 bottom-auto px-6 py-4 bg-[#10B981] border-white/20 z-50`,
        topError: `top-10 bottom-auto px-6 py-4 bg-[#EF4444] border-white/20 z-50`,
      },
    },
    defaultVariants: {
      intent: 'success',
    },
  },
);

const toastIconVariants = cva('w-6 h-6 items-center justify-center rounded-full bg-white/25', {
  variants: {
    intent: {
      success: '',
      error: '',
      topSuccess: '',
      topError: '',
    },
  },
  defaultVariants: {
    intent: 'success',
  },
});

interface IToastProps {
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IToastVariantProps extends VariantProps<typeof toastVariants> {}

type TToastPropsWithVariants = IToastProps & IToastVariantProps;

const Toast = React.forwardRef<View, TToastPropsWithVariants>(
  ({ intent, children, ...props }, ref) => {
    const isSuccess = intent === 'success' || intent === 'topSuccess';

    return (
      <MotiView
        ref={ref}
        from={{
          opacity: 0,
          scale: 0.8,
          translateY: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          translateY: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.8,
          translateY: 20,
        }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 150,
        }}
        style={tw.style(toastVariants({ intent }), {
          left: APP.container,
          right: APP.container,
        })}
        {...props}
      >
        <View style={tw.style(toastIconVariants({ intent }))}>
          <Ionicons
            name={isSuccess ? 'checkmark-circle' : 'alert-circle'}
            size={20}
            color="white"
          />
        </View>
        <Text
          style={tw.style(
            'font-Inter-SemiBold text-[15px] flex-1 text-white leading-5',
          )}
        >
          {children}
        </Text>
      </MotiView>
    );
  },
);

export default Toast;
