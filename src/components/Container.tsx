import {StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren} from 'react';

const Container = ({children}: PropsWithChildren) => {
  return <View className="flex-1 p-2 bg-white w-full">{children}</View>;
};

export default Container;
