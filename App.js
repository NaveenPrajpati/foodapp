/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import 'react-native-gesture-handler';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import HomePage from './pages/HomePage';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { store } from './redux/store';
import CartPage from './pages/CartPage';
import { navigationRef } from './navigation/RootNavigation';
import NavbarBottom from './components/NavbarBottom';
import Signup from './pages/Signup';
import AddressPage from './pages/AddressPage';
import CheckoutPage from './pages/CheckoutPage';
import AddFood from './pages/adminPages/AddFood';
import FoodList from './pages/adminPages/FoodList';
import Screen1 from './pages/openingScreens/Screen1';
import Screen2 from './pages/openingScreens/Screen2';


const Stack = createNativeStackNavigator()
const App = () => {


  return (
    <Provider store={store}>

      <NavigationContainer ref={navigationRef}>

        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Screen1' component={Screen1} />
          <Stack.Screen name='Screen2' component={Screen2} />
          <Stack.Screen name='Home' component={HomePage} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Signup' component={Signup} />
          <Stack.Screen name='Cart' component={CartPage} />
          <Stack.Screen name='Address' component={AddressPage} />
          <Stack.Screen name='AddFood' component={AddFood} />
          <Stack.Screen name='AddList' component={FoodList} />
        </Stack.Navigator>
      </NavigationContainer>
      <NavbarBottom />
    </Provider>
  );
};



export default App;
