import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import CartPriceCard from './CartPriceCard';
import VectorIcon from './VectorIcon';
import {useAppSelector} from '../redux/store';
import {useNavigation} from '@react-navigation/native';

export default function PriceSummery({}) {
  const [shippingCharge, setShippingCharge] = useState(50);
  const [totalPrice, setTotalPrice] = useState(0);
  const {dishes} = useAppSelector(state => state.cartReducer);
  const navigation = useNavigation();
  useEffect(() => {
    let total = 0;
    for (let i = 0; i < dishes.length; i++) {
      total =
        total +
        dishes[i].quantity *
          dishes[i].product.availableOptions[dishes[i]?.option]?.price;
    }
    setTotalPrice(total);
  }, [dishes]);
  return (
    <View className=" p-2 items-center  ">
      <View className="flex-row items-center justify-between p-2 rounded-3xl mb-5 w-full bg-slate-100">
        <View className="rounded-full justify-center items-center bg-white h-8 w-8">
          <VectorIcon iconName="close" size={20} color={'black'} />
        </View>
        <TextInput
          className="rounded-xl  p-1 text-lg"
          placeholder="Promo code"
          onChangeText={nativeEvent => {}}></TextInput>
        <TouchableOpacity className="bg-black p-2 h-full rounded-2xl">
          <Text className="text-slate-200 font-semibold">Apply</Text>
        </TouchableOpacity>
      </View>

      <View className="w-full">
        <CartPriceCard name={'SubTotal'} price={totalPrice} />
        <CartPriceCard name={'Delivery'} price={shippingCharge} />
        <CartPriceCard name={'Total'} price={totalPrice + shippingCharge} />
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CheckoutPage', {
            price: totalPrice + shippingCharge,
          });
        }}
        className="bg-black mt-5 p-2 rounded-3xl w-[60%] ">
        <Text className="text-slate-200 text-lg font-semibold text-center">
          Checkout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
