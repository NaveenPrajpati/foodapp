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
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/Feather';
import InputTag from '../../components/elements/InputTag';
import {BaseUrl} from '../../services/endPoints';
import axios from 'axios';
import {Formik} from 'formik';
import {SignupSchema} from './signupValidation';
import {
  requestLocationPermission,
  showToast,
} from '../../utils/utilityFunctions';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../services/operations/authOperations';

export default function Signup({navigation}) {
  const dispatch = useDispatch();

  const handleSignup = async values => {
    await requestLocationPermission();
    Keyboard.dismiss();
    Geolocation.getCurrentPosition(info => console.log(info));
    const customerData = {
      name: values.username,
      phone: values.phone,
      email: values.email,
      password: values.password,
      // address: values.address,
    };

    // console.log(customerData);

    const resultAction = dispatch(registerUser(customerData));

    if (registerUser.fulfilled.match(resultAction)) {
      const user = resultAction.payload;
      showToast('success', `Updated ${user.name}`);
      navigation.navigate('RootStack');
    } else {
      if (resultAction.payload) {
        // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
        // Note: this would also be a good place to do any handling that relies on the `rejectedWithValue` payload, such as setting field errors
        showToast(
          'error',
          `Update failed: ${resultAction.payload.errorMessage}`,
        );
      } else {
        showToast('error', `Update failed: ${resultAction.error.message}`);
      }
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

            {/* <InputTag
              iconName="address-book"
              placeholder="Address"
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
            />
            {touched.address && errors.address && (
              <Text style={{color: 'red'}}>{errors.address}</Text>
            )} */}

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
