import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  TouchableOpacityBase,
  ToastAndroid,
  Switch,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import { setLogin, setUserData } from '../redux/slices/customerSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import {BaseUrl} from '../../services/endPoints';
import InputTag from '../../components/elements/InputTag';
import {loginUser} from '../../services/operations/authOperations';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {Formik} from 'formik';
import {RootState} from '../../redux/store';

interface FormValueTypes {
  phone: string;
  password: string;
}

export default function Login(): FC<{}> {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const {isLogin, status} = useSelector(
    (state: RootState) => state.userReducer,
  );
  const [isEnabled, setIsEnabled] = useState(false);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'succeeded' && isLogin) {
      navigation.navigate('RootStack');
      Toast.show({
        type: 'success',
        text1: 'Welcome',
        text2: 'Login Successful👋',
      });
    }
  }, [isLogin, navigation]);

  const handleLogin = async () => {
    Keyboard.dismiss();

    dispatch(loginUser({phone, password}));
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <Formik
        initialValues={{phone: '', password: ''}}
        onSubmit={values => console.log(values)}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View className=" rounded-xl  p-10  flex-1 bg-white items-center ">
            <View>
              <Text className="text-lg text-black font-bold mb-1">Login</Text>
              <Text className="text-black">
                Here you can login to your account{' '}
              </Text>
            </View>

            <InputTag
              inputMode="numeric"
              placeholder="Phone"
              onChangeText={nativeEvent => setPhone(nativeEvent)}
            />

            <TouchableOpacity className="justify-end mb-1 flex-row w-full">
              <Text className="text-blue-600">forget password?</Text>
            </TouchableOpacity>

            <InputTag
              placeholder="Password"
              iconName="lock"
              secureTextEntry
              onChangeText={nativeEvent => setPassword(nativeEvent)}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('Signup')}
              className="justify-end mb-5 flex-row w-full">
              <Text className="text-blue-600">not have account?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogin}
              className="bg-black mb-5 p-2 rounded-3xl w-[60%] ">
              <Text className="text-white text-lg font-semibold text-center">
                Login
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}
