import {View, Text, TouchableOpacity, ScrollView, Keyboard} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import InputTag from '../../components/elements/InputTag';
import {loginUser} from '../../services/operations/authOperations';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {RootState} from '../../redux/store';
import {showToast} from '../../utils/utilityFunctions';
import {LoginSchema} from './validation';

interface FormValueTypes {
  phone: string;
  password: string;
}

export default function Login() {
  const {isLogin, status, userData} = useSelector(
    (state: RootState) => state.userReducer,
  );

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'succeeded' && isLogin) {
      navigation.navigate('RootStack');
      showToast('success', 'Welcome', 'login successfull');
    }
  }, [isLogin, navigation]);

  const handleLogin = async values => {
    Keyboard.dismiss();
    dispatch(loginUser({phone: values.phone, password: values.password}));
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <Formik
        initialValues={{phone: '', password: ''}}
        // validationSchema={LoginSchema}
        onSubmit={handleLogin}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
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
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
            />
            {touched.phone && errors.phone && (
              <Text className=" text-red-600">{errors.phone}</Text>
            )}
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgetPassword')}
              className="justify-end mb-1 flex-row w-full">
              <Text className="text-blue-600">forget password?</Text>
            </TouchableOpacity>

            <InputTag
              placeholder="Password"
              iconName="lock"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text className=" text-red-600">{errors.password}</Text>
            )}
            <TouchableOpacity
              onPress={() => navigation.navigate('Signup')}
              className="justify-end mb-5 flex-row w-full">
              <Text className="text-blue-600">not have account?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit as any}
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
