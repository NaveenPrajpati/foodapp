/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

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


const Stack=createNativeStackNavigator()
const App= () =>  {
 

  return (
    <Provider store={store}>
 
    <NavigationContainer ref={navigationRef}>
    
    <Stack.Navigator>
<Stack.Screen name='Home'  component={HomePage} options={{headerShown:false}}/>
<Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
<Stack.Screen name='Signup' component={Signup} options={{headerShown:false}}/>
<Stack.Screen name='Cart' component={CartPage} options={{headerShown:false}}/>
<Stack.Screen name='Address' component={AddressPage} options={{headerShown:false}}/>

<Stack.Screen name='AddList' component={FoodList} options={{headerShown:false}}/>
</Stack.Navigator>
    </NavigationContainer>
<NavbarBottom/>
    </Provider>
  );
};



export default App;
