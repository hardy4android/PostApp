import React from 'react';
import {
  Keyboard,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle
} from 'react-native';

import tw from '@/lib/tailwind';

interface FormTextInputProps extends TextInputProps {
  otherTextInputStyles?: StyleProp<TextStyle>;
}

const FormTextInput = React.forwardRef<TextInput, FormTextInputProps>(
  (props, ref) => {
    return (
      <TextInput
        ref={ref}
        underlineColorAndroid={tw.color('transparent')}
        textAlignVertical="top"
        placeholderTextColor={tw.color('gray-600')}
        returnKeyType={props.returnKeyType || 'default'}
        onSubmitEditing={props.onSubmitEditing || Keyboard.dismiss}
        blurOnSubmit={props.blurOnSubmit ?? true}
        style={[
          tw.style(
            'w-full px-4 pt-[1.1rem] pb-[1rem] text-lg leading-1.88rem ios:leading-tight bg-gray-300 rounded-lg text-core-contentPrimary android:pt-[1rem] android:pb-[0.8rem] font-Poppins-Regular',
            props.editable === false && 'opacity-50',
          ),
          props.otherTextInputStyles,
        ]}
        {...props}
      />
    );
  },
);

FormTextInput.displayName = 'FormTextInput';

export default FormTextInput;
