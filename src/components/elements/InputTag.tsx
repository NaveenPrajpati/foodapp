import {View, Text, TextInput} from 'react-native';
import React from 'react';
import VectorIcon from '../VectorIcon';

type propType = {
  placeholder: string;
  value?: string;
  onChangeText: (e: string) => void;
  label?: string;
  inputMode?: string;
};

export default function InputTag({
  placeholder,
  value,
  onChangeText,
  label,
  inputMode,
  ...atrs
}: propType) {
  return (
    <View className="my-1 mb-5">
      {label && <Text className="font-semibold text-gray-500">{label}</Text>}
      {/* <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={'gray'}
        className="p-2 w-full rounded-lg  text-black text-lg bg-orange-200 "
      /> */}

      <View className="flex-row items-center p-2 rounded-2xl   bg-slate-100">
        <View className="rounded-full justify-center items-center bg-white h-8 w-8">
          <VectorIcon
            iconPack="Feather"
            iconName="file"
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
