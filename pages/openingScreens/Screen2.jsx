import { View, Text, useWindowDimensions, Image } from 'react-native'
import React from 'react'

export default function Screen2() {
  const {width,height}=useWindowDimensions()
  return (
    <View className=' flex-1 bg-pink-300'>
    <View className='' style={{width:width,height:height*.8}}>
    <Image source={require('../../images/screen2.png')} alt='no' height={height*.8} width={width} resizeMode='contain'/>
    </View>
      <Text>Screen2</Text>
    </View>
  )
}