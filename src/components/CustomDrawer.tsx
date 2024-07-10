import {View, Text, Button} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useDispatch} from 'react-redux';
import {logout} from '../redux/slices/customerSlice';
import {persistor} from '../redux/store';
import {emptyCart} from '../redux/slices/cartSlice';

export default function CustomDrawer(props: any) {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView
      className=""
      contentContainerStyle={{backgroundColor: '', flex: 1}}>
      <View className=" flex-1 justify-between">
        <View>
          <DrawerItemList {...props} />
        </View>
        <View className=" bg-black p-2 h-[80px]">
          <Button
            title="Logout"
            onPress={() => {
              dispatch(logout());
              dispatch(emptyCart());
              persistor.purge();
              props.navigation.navigate('Login');
            }}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
