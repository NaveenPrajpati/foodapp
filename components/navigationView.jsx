import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setdrawer } from '../redux/slices/navbarSlice'
import Icon2 from 'react-native-vector-icons/Feather';
import * as RootNavigation from '../navigation/RootNavigation';

export default function navigationView() {
    const dispatch = useDispatch()

  return (
    <View className='bg-black text-slate-400 p-1 flex-1 items-center justify-between'>
    <View className='flex-row  rounded-xl px-1 justify-between items-center'>
      
    <TouchableOpacity className='bg-gray-500  rounded-full' onPress={() => dispatch(setdrawer(false))}>
    <Icon2 name='x' size={30} color={'white'}/>
    </TouchableOpacity>
     </View>

    {false && <View className=''>
     <View className='flex-row gap-2 mb-10'>
     <Icon2 name='x' size={20} color={'gray'}/>
     <Text className='text-md text-gray-400 font-semibold'>My orders</Text>
     </View>
     <View className='flex-row gap-2 mb-10'>
     <Icon2 name='x' size={20} color={'gray'}/>
     <Text className='text-md text-gray-400 font-semibold'>My Profile</Text>
     </View>
     <View className='flex-row gap-2 mb-10'>
     <Icon2 name='x' size={20} color={'gray'}/>
     <Text className='text-md text-gray-400 font-semibold'>Address</Text>
     </View>
     <View className='flex-row gap-2 mb-10'>
     <Icon2 name='x' size={20} color={'gray'}/>
     <Text className='text-md text-gray-400 font-semibold'>Contact Us</Text>
     </View>
     <View className='flex-row gap-2 mb-10'>
     <Icon2 name='x' size={20} color={'gray'}/>
     <Text className='text-md text-gray-400 font-semibold'>Setting</Text>
     </View>
     </View>}
    {true && <View className=''>
     <TouchableOpacity className='flex-row gap-2 mb-10' onPress={()=>RootNavigation.navigate('AddFood')}>
     <Icon2 name='x' size={20} color={'gray'}/>
     <Text className='text-md text-gray-400 font-semibold'>Add Food</Text>
     </TouchableOpacity>
     <View className='flex-row gap-2 mb-10' onPress={()=>RootNavigation.navigate('FoodList')}>
     <Icon2 name='x' size={20} color={'gray'}/>
     <Text className='text-md text-gray-400 font-semibold'>All Foods</Text>
     </View>
     <View className='flex-row gap-2 mb-10'>
     <Icon2 name='x' size={20} color={'gray'}/>
     <Text className='text-md text-gray-400 font-semibold'>Address</Text>
     </View>
     <View className='flex-row gap-2 mb-10'>
     <Icon2 name='x' size={20} color={'gray'}/>
     <Text className='text-md text-gray-400 font-semibold'>Contact Us</Text>
     </View>
     <View className='flex-row gap-2 mb-10'>
     <Icon2 name='x' size={20} color={'gray'}/>
     <Text className='text-md text-gray-400 font-semibold'>Setting</Text>
     </View>
     </View>}
   
     <TouchableOpacity className='flex-row mb-2'>
     <Icon2 name='x' size={20} color={'gray'}/>
     <Text className='text-md text-gray-400 font-semibold'>Logout</Text>
     </TouchableOpacity>

    </View>
  )
}