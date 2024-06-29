import * as React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MyDishes from './screens/MyDishes';
import MyEarnings from './screens/MyEarnings';
import AddDishes from './screens/AddDishes';
import VectorIcon from './components/VectorIcon';
import Info from './screens/Info';
import CustomersList from './screens/CustomersList';
import OrdersList from './screens/OrdersList';
import Signup from './screens/register/Signup';
import Login from './screens/login/Login';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="MyDishes"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          height: 60,
          width: '90%',
          alignSelf: 'center',
          position: 'absolute',
          bottom: 10,
          left: '5%',
          borderRadius: 30,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: -2},
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 5,
        },
      }}>
      <Tab.Screen
        name="MyEarnings"
        component={MyEarnings}
        options={{
          tabBarIcon: ({focused}) => (
            <VectorIcon
              iconName="money"
              size={focused ? 20 : 16}
              color={focused ? 'black' : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyDishes"
        component={MyDishes}
        options={{
          tabBarIcon: ({focused}) => (
            <VectorIcon
              iconName="list"
              size={focused ? 20 : 18}
              color={focused ? 'black' : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Info"
        component={Info}
        options={{
          tabBarIcon: ({focused}) => (
            <VectorIcon
              iconName="info"
              size={focused ? 20 : 18}
              color={focused ? 'black' : 'gray'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function RegisterStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="register" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

function Routes() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#facc15'} barStyle={'light-content'} />
      <RegisterStack />
      {/* <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            width: 200,
          },
        }}
        initialRouteName="Home">
        <Drawer.Screen name="Home" component={TabNavigator} />
        <Drawer.Screen name="AddDish" component={AddDishes} />
        <Drawer.Screen name="CustomersList" component={CustomersList} />
        <Drawer.Screen name="OrdersList" component={OrdersList} />
      </Drawer.Navigator> */}
    </NavigationContainer>
  );
}

export default Routes;
