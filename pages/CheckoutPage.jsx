import { View, Text, TouchableOpacity, TouchableHighlight } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RazorpayCheckout from 'react-native-razorpay';
import * as RootNavigation from '../navigation/RootNavigation';

export default function CheckoutPage() {
  const {checkoutData}=useSelector(state=>state.cartReducer)
  const {isLogin,userData}=useSelector(state=>state.userReducer)

    const dispatch=useDispatch()

  
  return (
    <View>
      <Text>CheckoutPage</Text>

<TouchableHighlight className='bg-black mb-5 p-2 rounded-3xl w-[60%] ' onPress={() => {
  var options = {
    description: 'Credits towards consultation',
    image: 'https://i.imgur.com/3g7nmJC.png',
    currency: 'INR',
    key: 'rzp_test_yn1EU6TpuP92CZ', // Your api key
    amount: (checkoutData.price*100).toString(),
    name: 'foo',
    prefill: {
      email: userData.email,
      contact: userData.phone,
      name: userData.name
    },
    theme: {color: '#F37254'}
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
  <Text className='text-white text-lg font-semibold text-center'>pay</Text>
</TouchableHighlight>

    </View>
  )
}