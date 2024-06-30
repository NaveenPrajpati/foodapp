import * as React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MyEarnings from './screens/MyEarnings';
import VectorIcon from './components/VectorIcon';
import Info from './screens/Info';
import CustomersList from './screens/CustomersList';
import OrdersList from './screens/OrdersList';
import Signup from './screens/register/Signup';
import Login from './screens/login/Login';
import Dashboard from './screens/Dashboard';
import CartPage from './screens/CartPage';
import CheckoutPage from './screens/CheckoutPage';
import {useSelector} from 'react-redux';
import {RootState} from './redux/store';
import CustomDrawer from './components/CustomDrawer';

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
          height: 60,
          position: 'absolute',
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
              color={focused ? 'white' : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({focused}) => (
            <VectorIcon
              iconName="list"
              size={focused ? 20 : 18}
              color={focused ? 'white' : 'gray'}
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
              color={focused ? 'white' : 'gray'}
            />
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
      <Drawer.Screen name="CustomersList" component={CustomersList} />
      <Drawer.Screen name="OrdersList" component={OrdersList} />
    </Drawer.Navigator>
  );
}

function Routes() {
  const {isLogin} = useSelector((state: RootState) => state.userReducer);
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'gray'} barStyle={'light-content'} />

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
