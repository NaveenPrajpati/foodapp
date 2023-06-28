import { View, Text } from 'react-native'
import React from 'react'

export default function CartPriceCard({name,price}) {
  return (
    <View className='flex-row p-1 justify-between border-b-0.5'>
                  <Text className=' text-black font-bold'>{name}</Text>
                  <Text className=' text-black font-bold'>₹{price}</Text>
                </View>
  )
}