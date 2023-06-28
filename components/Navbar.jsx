import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSearch, setSearchParam } from '../redux/slices/navbarSlice';
import * as RootNavigation from '../navigation/RootNavigation';

export default function Navbar() {
  const {isSearch}=useSelector(state=>state.navbarReducer)
  const {cartItem}=useSelector(state=>state.cartReducer)
  const dispatch=useDispatch()
  console.log(cartItem.length)
 
  return (
    <View className='flex-row justify-between p-1 items-center '>

          <TouchableOpacity className=' rounded-full bg-white h-8 w-8 items-center justify-center'>
            <Icon name="menu" size={30} color="black" className='rounded-lg' onPress={() => dispatch(setdrawer(true))}></Icon>
          </TouchableOpacity>
          <Text className=' text-red-400'>username</Text>

          {cartItem.length>0? 
            <TouchableOpacity onPress={()=>RootNavigation.navigate('Cart')} className='flex-row relative cursor-pointer'>
          <Icon name="shopping-cart" size={20} color="gray" ></Icon>
        <Text className='h-4 w-4 bg-red-400 text-white rounded-full text-center text-sm font-semibold absolute -translate-y-2'>{cartItem.length}</Text>
          </TouchableOpacity>
          :<TouchableOpacity onPress={() => RootNavigation.navigate('Login')}>
            <Image source={require('../images/people02.png')} className='h-8 w-8 rounded-full' />
          </TouchableOpacity>
          }

    </View>
  )
}