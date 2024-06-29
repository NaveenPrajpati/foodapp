import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

export default function Screen1() {
  const navigation = useNavigation();

  useEffect(()=>{

    setTimeout(()=> navigation.navigate('Screen2'), 2500)
},[])
  return (
    <View className=' flex-1 justify-center items-center bg-black'>
    <StatusBar hidden/>
      <View className=' flex-row justify-center items-center'>
        <Image source={require('../../images/fireIcon.png')} alt='no' height={5} width={5} resizeMode='contain' />
        <Text className=' text-white text-5xl font-bold'>your</Text>
        <Text className='text-green-500 text-5xl font-bold'>food</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})