import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ToastAndroid,
  TextInput,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonMy from '../components/elements/ButtonMy';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {BaseUrl, socket} from '../services/endPoints';
import {downloadButton, showToast} from '../utils/utilityFunctions';
import {emptyCart} from '../redux/slices/cartSlice';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import CheckBox from '@react-native-community/checkbox';
import {RootState} from '../redux/store';
import {AdvancedImage} from 'cloudinary-react-native';
import {Cloudinary} from '@cloudinary/url-gen';
import {paymentOption} from '../utils/constants';
import InputTag from '../components/elements/InputTag';
import VectorIcon from '../components/VectorIcon';
import RNFS from 'react-native-fs';

export default function CheckoutPage({route}) {
  const {price} = route.params;
  const {dishes} = useSelector((state: RootState) => state.cartReducer);
  const {isLogin, userData, deliveryAddress} = useSelector(
    (state: RootState) => state.userReducer,
  );
  const [orderNote, setOrderNote] = useState('');
  const [selectedImg, setSelectedImg] = useState('');
  const [addressIndex, setAddressIndex] = useState(0);
  const [checkBox, setCheckBox] = useState(2);
  const [ppImg, setPpImg] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const options = {
    description: 'Credits towards consultation',
    image: 'https://i.imgur.com/3g7nmJC.png',
    currency: 'INR',
    key: 'rzp_test_yn1EU6TpuP92CZ', // Your api key
    amount: (price * 100).toString(),
    name: 'My Kitchen',
    prefill: {
      email: userData.email,
      contact: userData.phone,
      name: userData.name,
    },
    theme: {color: '#ffff00'},
  };

  async function pickImage() {
    const result = await launchImageLibrary({mediaType: 'photo'});
    const imageFile = result.assets[0];
    setSelectedImg(imageFile);
  }

  async function placeOrder() {
    const data = {
      totalPrice: price,
      customer: userData._id,
      dishes: dishes.map(item => ({
        dishId: item.product._id,
        quantity: item.quantity,
        option: item.option,
      })),
      shippingAddress: userData.address[addressIndex],
      orderNotes: orderNote,
      kitchen: dishes[0].product.kitchen,
    };

    const formData = new FormData();

    if (paymentOption[checkBox].value === 'PP') {
      formData.append('imageData', {
        uri: selectedImg.uri,
        type: 'image/jpeg',
        name: selectedImg.fileName,
      });
      data.paymentMethod = 'paid';
    } else if (paymentOption[checkBox].value === 'PAY') {
      try {
        const dat = await RazorpayCheckout.open(options); // Corrected "data" assignment
        console.log(data);
        data.paymentMethod = 'paid';
        data.paymentId = dat.razorpay_payment_id;
      } catch (error) {
        console.error(error);
        showToast('error', error.description);
        return; // Exit the function if Razorpay fails
      }
    } else {
      data.paymentMethod = 'cod'; // Set payment method
      data.status = 'pending';
      data.homeDelivery = true;
    }

    formData.append('orderData', JSON.stringify(data));

    try {
      const res = await axios.post(BaseUrl + '/customer/placeOrder', formData, {
        headers: {'Content-Type': 'multipart/form-data'}, // Set correct content type
      });

      // console.log(res.data);
      showToast('success', 'Success', 'Your order placed');
      dispatch(emptyCart());
      socket.emit('orderPlaced', {user: userData.name, price: price});
      navigation.navigate('MyOrders', {replace: true});
    } catch (err) {
      console.error('Error placing order:', err); // More descriptive error handling
      showToast('error', 'Error', 'Failed to place order'); // Notify the user of the error
    }
  }

  return (
    <ScrollView className=" flex-1 p-2">
      {/* <Text className="text-black text-lg">CheckoutPage</Text> */}

      <View>
        <Text className="text-black text-lg font-semibold">Select address</Text>
        {userData?.address?.map((item, index) => (
          <View key={index} className="flex-row items-center gap-x-2 mt-1">
            <CheckBox
              className=" text-red-400"
              tintColor="black"
              style={{backgroundColor: 'black', borderRadius: 2}}
              disabled={false}
              value={addressIndex == index}
              onValueChange={newValue => {
                setAddressIndex(index);
              }}
            />
            <Text className="text-gray-600 font-semibold">{item}</Text>
          </View>
        ))}
      </View>

      <ButtonMy
        textButton="Add Address"
        onPress={() => {
          navigation.navigate('AddressList');
        }}
      />

      <View>
        <Text className="text-black text-lg font-semibold">
          Select Payment Mode
        </Text>
        {paymentOption.map((item, index) => (
          <View key={index} className="flex-row items-center gap-x-2 mt-1">
            <CheckBox
              className=" text-red-400"
              tintColor="black"
              style={{backgroundColor: 'black', borderRadius: 2}}
              disabled={false}
              value={checkBox == index}
              onValueChange={newValue => {
                setCheckBox(index);
              }}
            />
            <Text className="text-gray-600 font-semibold">{item.label}</Text>
          </View>
        ))}
      </View>
      {checkBox == 3 && (
        <View className="my-5 px-5 relative">
          <Image
            source={
              selectedImg?.uri
                ? {uri: selectedImg.uri}
                : require('../assets/images/qr.png')
            }
            resizeMode="contain"
            className=" w-[200px] h-[200px] mx-auto"
          />
          <Text className=" mx-auto">Pay On This QR</Text>
          <VectorIcon
            iconName={selectedImg.uri ? 'close' : 'download'}
            color="black"
            size={20}
            style={{position: 'absolute', right: 10}}
            onPress={() => {
              if (selectedImg.uri) {
                setSelectedImg({});
              } else {
                downloadButton();
              }
            }}
          />
        </View>
      )}

      <TextInput
        placeholder="Any Note For Kitchen"
        placeholderTextColor={'gray'}
        className=" bg-gray-200 p-2 my-2 text-black"
        onChangeText={e => setOrderNote(e)}
      />
      {checkBox == 3 && (
        <ButtonMy textButton={`upload payment image`} onPress={pickImage} />
      )}
      <ButtonMy
        textButton={`${paymentOption[checkBox].label}  ₹${price}`}
        onPress={placeOrder}
      />
    </ScrollView>
  );
}
