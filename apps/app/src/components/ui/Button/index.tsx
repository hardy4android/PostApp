import { cva, VariantProps } from 'class-variance-authority';
import { MotiPressable, MotiPressableProps } from 'moti/interactions';
import React from 'react';
import { Text, View } from 'react-native';

import Spinner from '../Spinner';

import tw from '@/lib/tailwind';

// Define the button variants using CVA
const buttonVariants = cva(
  'rounded-2xl px-4 py-[0.9rem] items-center text-base',
  {
    variants: {
      intent: {
        primary: '',
        secondary: '',
        tertiary: '',
        unstyled: 'bg-white',
        negative: 'bg-coreExtension-backgroundNegative',
      },
      disabled: {
        true: '',
      },
      size: {
        sm: 'py-2 rounded-full',
      },
    },
    compoundVariants: [
      {
        intent: 'primary',
        disabled: true,
        class: 'bg-coreExtension-backgroundStateDisabled',
      },
      {
        intent: 'primary',
        disabled: false,
        class: 'bg-coreExtension-backgroundInversePrimary',
      },
      {
        intent: 'secondary',
        disabled: true,
        class: 'bg-core-backgroundStateDisabled',
      },
      {
        intent: 'secondary',
        disabled: false,
        class: 'bg-core-backgroundSecondary',
      },
      {
        intent: 'tertiary',
        disabled: true,
        class: 'bg-core-backgroundStateDisabled',
      },
      {
        intent: 'tertiary',
        disabled: false,
        class: 'bg-core-backgroundTertiary',
      },
      {
        intent: 'negative',
        disabled: true,
        class: 'bg-coreExtension-backgroundStateDisabled',
      },
      {
        intent: 'negative',
        disabled: false,
        class: 'bg-coreExtension-backgroundNegative',
      },
    ],
    defaultVariants: {
      intent: 'primary',
      disabled: false,
    },
  },
);

const buttonLabelVariants = cva('text-base font-Poppins-Medium', {
  variants: {
    intent: {
      primary: '',
      secondary: '',
      tertiary: '',
      unstyled: 'text-core-contentPrimary',
      negative: '',
    },
    disabled: {
      true: '',
    },
    size: {
      sm: '',
    },
  },
  compoundVariants: [
    {
      intent: 'primary',
      disabled: true,
      class: 'text-core-contentInverseTertiary',
    },
    {
      intent: 'primary',
      disabled: false,
      class: 'text-white',
    },
    {
      intent: 'secondary',
      disabled: true,
      class: 'text-core-contentInverseTertiary',
    },
    {
      intent: 'secondary',
      disabled: false,
      class: 'text-core-contentPrimary',
    },
    {
      intent: 'tertiary',
      disabled: true,
      class: 'text-core-contentInverseTertiary',
    },
    {
      intent: 'tertiary',
      disabled: false,
      class: 'text-core-contentPrimary',
    },
    {
      intent: 'unstyled',
      disabled: true,
      class: 'text-core-contentInverseTertiary',
    },
    {
      intent: 'unstyled',
      disabled: false,
      class: 'text-core-contentPrimary',
    },
    {
      intent: 'negative',
      disabled: true,
      class: 'text-core-contentInverseTertiary',
    },
    {
      intent: 'negative',
      disabled: false,
      class: 'text-white',
    },
  ],
  defaultVariants: {
    intent: 'primary',
    disabled: false,
  },
});

const buttonSpinnerVariants = cva('', {
  variants: {
    intent: {
      primary: tw.color('white'),
      secondary: tw.color('core-contentPrimary'),
      tertiary: '',
      unstyled: '',
      negative: tw.color('white'),
    },
  },
  defaultVariants: {
    intent: 'primary',
  },
});

// Define the Button component
interface ButtonProps extends MotiPressableProps {
  children: React.ReactNode;
  isLoading?: boolean;
  otherButtonWrapperStyles?: string;
  otherButtonLabelStyles?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ButtonVariantProps extends VariantProps<typeof buttonVariants> {}

type ButtonPropsWithVariants = ButtonProps & ButtonVariantProps;

const Button = React.forwardRef<View, ButtonPropsWithVariants>(
  (
    {
      intent,
      disabled,
      size,
      children,
      isLoading,
      style,
      otherButtonWrapperStyles,
      otherButtonLabelStyles,
      ...props
    },
    ref,
  ) => {
    const buttonProcessedOpacity = intent === 'secondary' ? 0.3 : 0.6;
    return (
      <MotiPressable
        disabled={disabled || isLoading}
        ref={ref}
        style={tw.style(
          buttonVariants({ intent, disabled, size }),
          otherButtonWrapperStyles,
        )}
        animate={({ hovered, pressed }) => {
          'worklet';
          return {
            opacity: hovered || pressed ? buttonProcessedOpacity : 1,
          };
        }}
        {...props}
      >
        {isLoading ? (
          <View style={tw.style('px-1')}>
            <Spinner color={buttonSpinnerVariants({ intent })} />
          </View>
        ) : (
          <Text
            style={tw.style(
              buttonLabelVariants({ intent, disabled }),
              otherButtonLabelStyles,
            )}
          >
            {children}
          </Text>
        )}
      </MotiPressable>
    );
  },
);

export default Button;
