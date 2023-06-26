import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RazorpayCheckout from 'react-native-razorpay';
import * as RootNavigation from '../navigation/RootNavigation';

export default function CheckoutPage() {
  const {checkoutData}=useSelector(state=>state.cartReducer)
  const {isLogin,userData}=useSelector(state=>state.userReducer)

    const dispatch=useDispatch()
  useEffect(() => {
    
  
    
  }, [])
  
  return (
    <View>
      <Text>CheckoutPage</Text>
      {/* <TouchableOpacity className='p-2 bg-fuchsia-500 text-white font-semibold' onPress={() => {
    var options = {
    description: 'Credits towards consultation',
    image:require(''),
    currency: 'INR',
    key: 'rzp_test_yn1EU6TpuP92CZ',
    amount: (checkoutData.price*100).toString(),
    name: 'Seller organisation',
    order_id: '',//Replace this with an order_id created using Orders API.
    prefill: {
      email: userData.email,
      contact: '9899988765',
      name: userData.name
    },
    theme: {color: '#53a20e'}
  }
  RazorpayCheckout.open(options).then((data) => {
    // handle success
    alert(`Success: ${data.razorpay_payment_id}`);
    console.log(data)
    RootNavigation.navigate('Home')
  }).catch((error) => {
    // handle failure
    alert(`Error: ${error.code} | ${error.description}`);
  });
}}>
  <Text>pay now</Text>
</TouchableOpacity> */}
    </View>
  )
}