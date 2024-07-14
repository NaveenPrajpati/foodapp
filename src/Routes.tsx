import * as React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MyEarnings from './screens/MyEarnings';
import VectorIcon from './components/VectorIcon';

import OrdersList from './screens/OrdersList';
import Signup from './screens/register/Signup';
import Login from './screens/login/Login';
import Dashboard from './screens/Dashboard';
import CartPage from './screens/CartPage';
import CheckoutPage from './screens/CheckoutPage';
import {useSelector} from 'react-redux';
import {RootState} from './redux/store';
import CustomDrawer from './components/CustomDrawer';
import MyOrders from './screens/MyOrders';
import Toast from 'react-native-toast-message';
import AddressList from './screens/AddressList';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'black',
          height: 80,
          borderTopStartRadius: 30,
          borderTopEndRadius: 30,
          borderColor: 'black',
        },
      }}>
      <Tab.Screen
        name="MyEarnings"
        component={MyEarnings}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              className={`h-12 w-12 ${
                focused ? 'bg-green-300' : ''
              } justify-center items-center rounded-full`}>
              <VectorIcon
                iconName="money"
                size={20}
                color={focused ? 'white' : 'gray'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              className={`h-12 w-12 ${
                focused ? 'bg-green-300' : ''
              } justify-center items-center rounded-full`}>
              <VectorIcon
                iconName="list"
                size={20}
                color={focused ? 'white' : 'gray'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MyOrders"
        component={MyOrders}
        options={{
          headerShown: true,
          tabBarIcon: ({focused}) => (
            <View
              className={`h-12 w-12 ${
                focused ? 'bg-green-300' : ''
              } justify-center items-center rounded-full`}>
              <VectorIcon
                iconName="info"
                size={20}
                color={focused ? 'white' : 'gray'}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 200,
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName="Home">
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="AddressList" component={AddressList} />
      <Drawer.Screen name="OrdersList" component={OrdersList} />
    </Drawer.Navigator>
  );
}

function Routes() {
  const {isLogin} = useSelector((state: RootState) => state.userReducer);
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'black'} barStyle={'light-content'} />
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={isLogin ? 'RootStack' : 'Login'}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="RootStack" component={RootStack} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen
          options={{headerShown: true, headerTitle: 'Your Cart'}}
          name="CartPage"
          component={CartPage}
        />
        <Stack.Screen
          options={{headerShown: true, headerTitle: 'Make Payment'}}
          name="CheckoutPage"
          component={CheckoutPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
