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
      className="bg-yellow-600 mb-5 p-2 rounded-3xl w-full ">
      <Text className="text-white text-lg font-semibold text-center">
        {textButton}
      </Text>
    </TouchableOpacity>
  );
}
