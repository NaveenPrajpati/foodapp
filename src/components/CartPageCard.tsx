import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import VectorIcon from '../components/VectorIcon';
import {removeDish, updateDish} from '../redux/slices/cartSlice';
// import {removeDish, updateQuantity} from '../redux/slices/cartSlice';

const CardPageCard = ({item, index}) => {
  const dispatch = useDispatch();

  const handleQuantityChange = increment => {
    const newQuantity = item.quantity + increment;
    if (newQuantity > 0) {
      dispatch(
        updateDish({
          index,
          dish: {
            product: item.product,
            quantity: newQuantity,
            option: item.option,
          },
        }),
      );
    }
  };

  return (
    <View
      className="flex-row gap-1 p-2 m-2 h-24 rounded-2xl bg-slate-50"
      style={{elevation: 1}}>
      <Image
        source={{uri: item?.product?.imagePath}}
        className="w-20 h-full rounded-xl"></Image>
      <View className=" justify-between  flex-1 h-full ">
        <View className="flex-row justify-between item-center">
          <Text className="text-black font-semibold text-lg">
            {item.product.name}
          </Text>
          <TouchableOpacity
            className=" font-normal"
            onPress={() => {
              dispatch(removeDish(index));
            }}>
            <VectorIcon iconName="close" size={18} color={'black'} />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between items-center p-1">
          <Text className="text-black font-semibold text-lg">
            {item.product.availableOptions[item.option].name} ₹
            {item.product.availableOptions[item.option].price}
          </Text>
          <View className="flex-row rounded-lg items-center">
            <TouchableOpacity
              className="bg-black h-5 w-5 rounded-full justify-center items-center"
              onPress={() => handleQuantityChange(-1)}>
              <VectorIcon iconName="minus" color="white" size={10} />
            </TouchableOpacity>
            <Text className=" text-xl font-bold text-center text-black mx-2">
              {item.quantity}
            </Text>
            <TouchableOpacity
              className="bg-black h-5 w-5 rounded-full justify-center items-center"
              onPress={() => handleQuantityChange(1)}>
              <VectorIcon iconName="plus" color="white" size={10} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardPageCard;
