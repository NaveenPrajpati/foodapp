import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import VectorIcon from '../components/VectorIcon';
// import {removeDish, updateQuantity} from '../redux/slices/cartSlice';

const CardPageCard = ({item, index}) => {
  const dispatch = useDispatch();

  const handleQuantityChange = increment => {
    const newQuantity = item.quantity + increment;
    // if (newQuantity > 0) {
    //   dispatch(updateQuantity(index, newQuantity));
    // }
  };

  return (
    <View
      className="flex-row gap-1 p-2 m-2 h-24 rounded-2xl bg-slate-50"
      style={{elevation: 1}}>
      <Image
        source={{uri: item.product.imagePath[0]}}
        className="w-20 h-full rounded-xl"></Image>
      <View className=" justify-between  flex-1 h-full ">
        <View className="flex-row justify-between item-center">
          <Text className="text-black font-semibold text-lg">
            {item.product.name}
          </Text>
          <TouchableOpacity
            className=" font-normal"
            onPress={() => {
              //   dispatch(removeDish(index));
            }}>
            <VectorIcon iconName="close" size={18} color={'black'} />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between items-center p-1">
          <Text className="text-black font-semibold text-lg">
            ₹ {item.product?.price}
          </Text>
          <View className="flex-row rounded-lg">
            <TouchableOpacity onPress={() => handleQuantityChange(-1)}>
              <Text className="w-5 h-5 rounded-full text-white text-md bg-black text-center">
                -
              </Text>
            </TouchableOpacity>
            <View>
              <Text className="w-6 h-5 text-md font-bold text-center text-black">
                {item.quantity}
              </Text>
            </View>
            <TouchableOpacity onPress={() => handleQuantityChange(1)}>
              <Text className="w-5 h-5 rounded-full text-white text-md bg-black text-center">
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardPageCard;
