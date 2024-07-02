import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

type buttonProp = {
  onPress: () => void;
  textButton: string;
};

export default function ButtonMy({onPress, textButton}: buttonProp) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-black  px-4 py-1 rounded-3xl my-2">
      <Text className="text-white text-lg font-semibold text-center">
        {textButton}
      </Text>
    </TouchableOpacity>
  );
}
