import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

type buttonProp = {
  onPress: () => void;
  textButton: string;
};

export default function ButtonMy({onPress, textButton}: buttonProp) {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      // style={{backgroundColor: colors.card}}
      className="bg-black  px-4 py-1 rounded-3xl my-2">
      <Text
        // style={{color: colors.text}}
        className="text-white text-lg font-semibold text-center">
        {textButton}
      </Text>
    </TouchableOpacity>
  );
}
