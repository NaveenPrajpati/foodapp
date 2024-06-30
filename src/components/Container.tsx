import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren} from 'react';

const Container = ({children}: PropsWithChildren) => {
  return (
    <ScrollView className="flex-1 p-2 bg-white w-full ">{children}</ScrollView>
  );
};

export default Container;
