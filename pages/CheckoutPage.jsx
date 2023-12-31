import { View, Text, TouchableOpacity, TouchableHighlight, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RazorpayCheckout from 'react-native-razorpay';
import * as RootNavigation from '../navigation/RootNavigation';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CheckoutPage() {
  const {cartItem,checkoutPrice}=useSelector(state=>state.cartReducer)
  const {isLogin,userData,deliveryAddress}=useSelector(state=>state.userReducer)
  const[localUserData,setlocalUserData]=useState({})

    const dispatch=useDispatch()

    useEffect(()=>{
      const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('userData')
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
          // error reading value
        }
      }

     
      setlocalUserData(getData)
  

    },[])

    function updateUserOrder(id){
      firestore()
      .collection('Users')
      .doc(localUserData._j.id)
      .update({
        myOrders:[{
          status:'order placed',
          order:cartItem,
          address:deliveryAddress,
          pacedAt:Date.now(),
        paymentId:id}]
      })
      .then(() => {
        RootNavigation.navigate('Home')
        ToastAndroid.show('User updated!',ToastAndroid.BOTTOM);
      });
    }

  
  return (
    <View>
      <Text>CheckoutPage</Text>

<TouchableHighlight className='bg-black mb-5 p-2 rounded-3xl w-[60%] ' onPress={() => {
  var options = {
    description: 'Credits towards consultation',
    image: 'https://i.imgur.com/3g7nmJC.png',
    currency: 'INR',
    key: 'rzp_test_yn1EU6TpuP92CZ', // Your api key
    amount: (checkoutPrice.totalPrice*100).toString(),
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
    
    console.log(data)
    updateUserOrder(data.razorpay_payment_id)
    
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