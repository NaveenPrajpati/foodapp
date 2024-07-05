import {View, Text, TextInput} from 'react-native';
import React from 'react';
import VectorIcon from '../VectorIcon';

type propType = {
  placeholder: string;
  value?: string;
  onChangeText: (e: string) => void;
  label?: string;
  inputMode?: string;
  iconName?: string;
};

export default function InputTag({
  placeholder,
  value,
  onChangeText,
  label,
  inputMode,
  iconName,
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
