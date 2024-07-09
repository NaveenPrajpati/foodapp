import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ToastAndroid,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonMy from '../components/elements/ButtonMy';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {BaseUrl, socket} from '../services/endPoints';
import {showToast} from '../utils/utilityFunctions';
import {emptyCart} from '../redux/slices/cartSlice';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export default function CheckoutPage({route}) {
  const {price} = route.params;
  const {dishes} = useSelector(state => state.cartReducer);
  const {isLogin, userData, deliveryAddress} = useSelector(
    state => state.userReducer,
  );
  const [orederNote, setOrderNote] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  function placeOrder() {
    const data = {
      totalPrice: price,
      customer: userData._id,
      dishes: dishes.map(item => {
        return {
          dishId: item.product._id,
          quantity: item.quantity,
        };
      }),
      status: 'pending',
      shippingAddress: userData.address,
      paymentMethod: 'cod',
      orderNotes: orederNote,
    };
    // console.log(JSON.stringify(data, null, 2));
    axios
      .post(BaseUrl + '/customer/placeOrder', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log(res.data);
        showToast('success', 'Success', 'your order placed');
        dispatch(emptyCart());
        socket.emit('orderPlaced', 'order placed successfully');
        navigation.navigate('MyOrders', {replace: true});
      })
      .catch(err => console.log(err));
  }

  async function addPayment() {
    const result = await launchImageLibrary({mediaType: 'photo'});
    console.log(result.assets[0]);
  }

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋',
    });
  };

  return (
    <View className=" flex-1 p-2">
      <Text className="text-black text-lg">CheckoutPage</Text>

      <View>
        <Text className="text-black">Select Address</Text>
        <Text className="text-black">{userData.address}</Text>
      </View>
      <TouchableOpacity className="">
        <Text className="text-black font-semibold">Add Address</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Any Note For Kitchen"
        placeholderTextColor={'gray'}
        className=" bg-gray-200 p-2 my-2 text-black"
        onChangeText={e => setOrderNote(e)}
      />
      <View className=" flex-row justify-around items-center">
        <ButtonMy textButton="Payment Proof" onPress={showToast} />
        <Text className="text-black font-semibold">Or</Text>
        <ButtonMy textButton="COD" onPress={placeOrder} />
      </View>

      <TouchableHighlight
        className="bg-black mb-5 p-2 rounded-3xl w-[60%] "
        onPress={() => {
          var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_yn1EU6TpuP92CZ', // Your api key
            amount: (price * 100).toString(),
            name: 'foo',
            prefill: {
              email: userData.email,
              contact: userData.phone,
              name: userData.name,
            },
            theme: {color: '#F37254'},
          };
          RazorpayCheckout.open(options)
            .then(data => {
              // handle success

              console.log(data);
              updateUserOrder(data.razorpay_payment_id);
            })
            .catch(error => {
              // handle failure
              alert(`Error: ${error.code} | ${error.description}`);
            });
        }}>
        <Text className="text-white text-lg font-semibold text-center">
          Pay ₹{price}
        </Text>
      </TouchableHighlight>
    </View>
  );
}
