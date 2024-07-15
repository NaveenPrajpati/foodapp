import {View, Text, TextInput} from 'react-native';
import React, {ForwardedRef} from 'react';
import VectorIcon from '../VectorIcon';

//Interface to expose the input focus method.
interface InputTagRef {
  focus(): void;
}

interface propType {
  placeholder: string;
  value?: string;
  onChangeText: (e: string) => void;
  label?: string;
  inputMode?: string;
  iconName?: string;
  ref?: ForwardedRef<InputTagRef>;
}

export default function InputTag({
  placeholder,
  value,
  onChangeText,
  label,
  inputMode,
  iconName,
  ref,
  ...atrs
}: propType) {
  return (
    <View className="mt-5">
      {label && <Text className="font-semibold text-gray-500">{label}</Text>}
      <View className="flex-row items-center p-2 rounded-2xl   bg-slate-100">
        <View className="rounded-full justify-center items-center bg-white h-8 w-8">
          <VectorIcon
            iconName={iconName ? iconName : 'user'}
            size={20}
            color="black"
          />
        </View>
        <TextInput
          {...atrs}
          ref={ref}
          value={value}
          inputMode={inputMode}
          className="rounded-md  p-1  w-full text-lg text-black"
          placeholder={placeholder}
          placeholderTextColor={'gray'}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
}
