import {View, Text, Button, Switch} from 'react-native';
import React, {useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useDispatch, useSelector} from 'react-redux';
import {logout, setIsDarkMode} from '../redux/slices/customerSlice';
import {persistor, RootState} from '../redux/store';
import {emptyCart} from '../redux/slices/cartSlice';
import {useColorScheme} from 'nativewind';
import ButtonMy from './elements/ButtonMy';

export default function CustomDrawer(props: any) {
  const dispatch = useDispatch();
  const {isDarkMode} = useSelector((state: RootState) => state.userReducer);
  const {colorScheme, toggleColorScheme} = useColorScheme();
  return (
    <DrawerContentScrollView
      className=""
      contentContainerStyle={{
        // backgroundColor: `${isDarkMode ? 'gray' : 'white'}`,

        flex: 1,
      }}>
      <View className=" flex-1 justify-between">
        <View>
          <View className="">
            <Text className="text-black font-bold text-lg">My Kitchen</Text>
          </View>
          <View className=" flex-row justify-between items-center p-2">
            <Text className=" text-black">
              Theme {colorScheme} {colorScheme === 'dark' ? '🌙' : '🌞'}`
            </Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={e => {
                toggleColorScheme();
                dispatch(setIsDarkMode());
              }}
              value={isDarkMode}
            />
          </View>
          <DrawerItemList {...props} />
        </View>
        <View className="  p-2 h-[80px]">
          <ButtonMy
            textButton="Logout"
            onPress={async () => {
              dispatch(logout());
              dispatch(emptyCart());
              await persistor.purge();
              props.navigation.navigate('Login');
            }}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
