import {View, Text, Button} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useDispatch} from 'react-redux';
import {logout} from '../redux/slices/userSlice';

export default function CustomDrawer(props: any) {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView>
      <DrawerItemList {...props} />
      <Text>CustomDrawer</Text>
      <Button
        title="Logout"
        onPress={() => {
          dispatch(logout());
          // Navigate to the login screen if needed
          props.navigation.navigate('Login');
        }}
      />
    </DrawerContentScrollView>
  );
}
