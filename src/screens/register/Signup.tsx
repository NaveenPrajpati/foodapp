import {
  View,
  Text,
  TextInput,
  Button,
  ToastAndroid,
  TouchableOpacity,
  Switch,
  ScrollView,
  Image,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';

import Icon from 'react-native-vector-icons/Feather';
import InputTag from '../../components/elements/InputTag';
import {BaseUrl} from '../../services/endPoints';
import axios from 'axios';
import {Formik} from 'formik';
import {SignupSchema} from './signupValidation';
import {showToast} from '../../utils/utilityFunctions';

export default function Signup({navigation}) {
  const handleSignup = async values => {
    Keyboard.dismiss();

    const customerData = {
      name: values.username,
      phone: values.phone,
      email: values.email,
      password: values.password,
      address: values.address,
    };

    try {
      const response = await axios.post(
        BaseUrl + '/auth/registerCustomer',
        customerData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 201) {
        showToast(
          'success',
          'Registration successful!',
          'You have been registered successfully',
        );
        navigation.navigate('Login');
      } else {
        showToast(
          'error',
          'Registration failed',
          `Error: ${response.data.errors[0].msg}`,
        );
      }
    } catch (error) {
      console.error(error);
      showToast('error', 'An error occurred', 'Please try again.');
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <Formik
        initialValues={{
          username: '',
          email: '',
          phone: '',
          password: '',
          address: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSignup}>
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
              <Text className="text-lg font-bold mb-2 text-black">
                Register Here
              </Text>
              <Text className="text-black">Here you can create account</Text>
            </View>

            <InputTag
              placeholder="Name"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            {touched.username && errors.username && (
              <Text style={{color: 'red'}}>{errors.username}</Text>
            )}
            <InputTag
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={{color: 'red'}}>{errors.email}</Text>
            )}
            <InputTag
              iconName="phone"
              inputMode="numeric"
              placeholder="Phone"
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
            />
            {touched.phone && errors.phone && (
              <Text style={{color: 'red'}}>{errors.phone}</Text>
            )}

            <InputTag
              iconName="lock"
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={{color: 'red'}}>{errors.password}</Text>
            )}

            <InputTag
              iconName="address-book"
              placeholder="Address"
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
            />
            {touched.address && errors.address && (
              <Text style={{color: 'red'}}>{errors.address}</Text>
            )}

            <TouchableOpacity
              onPress={handleSubmit as any}
              className="bg-black mt-5 p-2 rounded-3xl w-[60%] ">
              <Text className="text-white text-lg font-semibold text-center">
                Signup
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              className=" w-full">
              <Text className="text-blue-600 ">have account? Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}
