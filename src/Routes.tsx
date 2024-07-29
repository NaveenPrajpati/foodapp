import * as React from 'react';
import {View, Text, StatusBar, useColorScheme} from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MyEarnings from './screens/MyEarnings';
import VectorIcon from './components/VectorIcon';

import Signup from './screens/register/Signup';
import Login from './screens/login/Login';
import Dashboard from './screens/Dashboard';
import CartPage from './screens/CartPage';
import CheckoutPage from './screens/CheckoutPage';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './redux/store';
import CustomDrawer from './components/CustomDrawer';
import MyOrders from './screens/MyOrders';
import Toast from 'react-native-toast-message';
import AddressList from './screens/AddressList';
import ForgetPassword from './screens/login/ForgetPassword';
import MyPager from './screens/onBoarding/MyPager';
import {setOnBoardingStatus} from './redux/slices/customerSlice';
import SplashScreen from 'react-native-splash-screen';
import ChatScreen from './screens/ChatScreen';
import MapPicker from './components/MapPicker';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      sceneContainerStyle={
        {
          // backgroundColor: 'white',
        }
      }
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'black',
          height: 70,
          borderTopStartRadius: 30,
          borderTopEndRadius: 30,
          borderColor: 'black',
        },
      })}>
      <Tab.Screen
        name="MyEarnings"
        component={MyEarnings}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              className={`h-12 w-12 ${
                focused ? 'bg-green-400' : ''
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
                focused ? 'bg-green-400' : ''
              } justify-center items-center rounded-full`}>
              <VectorIcon
                iconName="food-bank"
                iconPack="MaterialIcons"
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
                iconName="list"
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
      screenOptions={({navigation}) => ({
        headerLeft: () => (
          <View className="px-2">
            <VectorIcon
              iconName="arrow-left"
              size={20}
              color="black"
              onPress={() => navigation.goBack()}
            />
          </View>
        ),
        drawerStyle: {
          width: 200,
        },
      })}
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        options={{headerShown: false}}
        component={TabNavigator}
      />
      <Drawer.Screen name="AddressList" component={AddressList} />
      <Drawer.Screen name="MapPicker" component={MapPicker} />
    </Drawer.Navigator>
  );
}

function Routes() {
  const {isLogin, isDarkMode, hasSeenOnboarding} = useSelector(
    (state: RootState) => state.userReducer,
  );
  const scheme = useColorScheme();
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  const MyTheme = isDarkMode ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar backgroundColor={'black'} barStyle={'light-content'} />
      <Stack.Navigator
        initialRouteName={
          isLogin && hasSeenOnboarding ? 'RootStack' : 'Onboarding'
        }>
        {!isLogin && !hasSeenOnboarding ? (
          <Stack.Screen
            name="Onboarding"
            component={MyPager}
            options={{headerShown: false}}
          />
        ) : null}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen
          name="RootStack"
          component={RootStack}
          options={{headerShown: false}}
        />
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
        <Stack.Screen
          options={{headerShown: true, headerTitle: 'Chat'}}
          name="ChatScreen"
          component={ChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
