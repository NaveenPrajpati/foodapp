import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {setdrawer} from '../redux/slices/navbarSlice';
import {useNavigation} from '@react-navigation/native';

export default function Header() {
  const {dishes} = useSelector(state => state.cartReducer);
  const {userData} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View className="flex-row justify-between p-1 items-center ">
      <TouchableOpacity className=" rounded-full bg-white h-8 w-8 items-center justify-center ">
        <Icon
          name="menu"
          size={30}
          color="black"
          className="rounded-lg"
          onPress={() => navigation.toggleDrawer()}></Icon>
      </TouchableOpacity>
      <Text className=" text-gray-500 text-lg font-semibold">
        {userData?.name + `(${userData.address})`}
      </Text>

      {dishes.length > 0 ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CartPage');
          }}
          className="flex-row relative cursor-pointer">
          <Icon name="shopping-cart" size={20} color="gray"></Icon>
          <View className="h-4 w-4 bg-red-400 text-white rounded-full text-center text-sm font-semibold absolute -translate-y-2 justify-center items-center">
            <Text className=" text-white rounded-full  text-xs font-semibold ">
              {dishes.length}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={require('../assets/images/people02.png')}
            className="h-8 w-8 rounded-full"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
