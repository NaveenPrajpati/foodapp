import { View, Text, FlatList, Image, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeCartItem, setCheckOutData } from '../redux/slices/cartSlice'
import WarningModal from '../components/WarningModal'
import * as RootNavigation from '../navigation/RootNavigation';
import Icon2 from 'react-native-vector-icons/Feather';


export default function CartPage({navigation}) {
  const[warning,setWarning]=useState(false)
    const {cartItem}=useSelector(state=>state.cartReducer)
    const dispatch=useDispatch()
    const {isLogin}=useSelector(state=>state.userReducer)
    
const[shippingCharge,setShippingCharge]=useState(50)
const[totalPrice,setTotalPrice]=useState(0)

useEffect(()=>{
  console.log(cartItem)
    for(let i=0;i<cartItem.length;i++){
        console.log(cartItem[i].item.price)
    setTotalPrice(total=>total+(cartItem[i].quantity * cartItem[i].item.price))
    }
},[cartItem])


function checkLogin(){
  if(isLogin){
    console.log('go for payment')
    dispatch(setCheckOutData({
      price:Math.round(totalPrice+shippingCharge)
    }))
    navigation.navigate('Address')
  }else{
    console.log('login warning')
    navigation.navigate('Login')
  setWarning(true)
}
}


  return (
    <View className=''>
      {cartItem.length==0?
      <View>
        <Text>cart is Empty</Text>
      </View>:
      <View className='h-full'>
      <Text>Cart Items</Text>
      <View className='flex-1 h-screen justify-between'>
      <View className=''>
      <FlatList
        data={cartItem}
        renderItem={({item,index})=>{
         return (<View>
         <View className='flex-row justify-around gap-1 mx-5 mt-2 rounded-2xl border-2 border-slate-300 bg-white p-1'>
            <Image source={{uri:item.item.image}} className='w-14 h-14 rounded-lg'></Image>
            <View className=''>
            <Text className='text-black font-semibold'>{item.item.title.substring(0,20)}</Text>
            <View className=''>
            <View className='flex-row rounded-lg'>
                        <TouchableOpacity>
                          <Text className='w-5 h-5 text-md bg-slate-200 text-center'>-</Text>
                        </TouchableOpacity>
                        <View>
                          <Text className='w-5 h-5 text-md bg-pink-200 text-center'>{item.quantity}</Text>
                        </View>
                        <TouchableOpacity>
                          <Text className='w-5 h-5 text-md bg-slate-200 text-center'>+</Text>
                        </TouchableOpacity>
                        </View>
            <Text className='text-black font-semibold'>₹{(item.quantity*item.item.price)}</Text>
            </View>
            </View>
            <TouchableOpacity className=' ' onPress={()=>dispatch(removeCartItem(item.item.id))}>
            <Icon2 name='x' size={30} color={'red'}/>
            </TouchableOpacity>
         </View>
        
            </View>
        )}}
      />
            </View>

{/* price summary */}
            <View className=' shadow-red-200 m-2 p-2 border rounded-lg'>
            <Text className='text-md'>Your order Summary</Text>
          
             <View className=''>
                    <View className='flex-row p-1 justify-around border-b-0.5'>
            <Text className=''>subTotal</Text>
            <Text className=''>₹{totalPrice}</Text>
                    </View>
                    <View className='flex-row p-1 justify-around border-b-0.5'>
            <Text className=''>shipping</Text>
            <Text className=''>₹{shippingCharge}</Text>
                    </View>
                    <View className='flex-row p-1 justify-around border-b-0.5'>
            <Text className=''>Total</Text>
            <Text className=''>₹{totalPrice+shippingCharge}</Text>
                    </View>
                    </View>

            <TouchableOpacity className='p-2 bg-slate-500 rounded-xl mt-4' onPress={checkLogin}>
              <Text className='text-center text-white'>checkout</Text>
            </TouchableOpacity>
         </View>
         </View>
         </View>
      
      }
     {warning && <WarningModal message={'please login to checkout'}/>}
    </View>
  )
}
