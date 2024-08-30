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
  StatusBar,
  ActivityIndicator,
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
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignup = async values => {
    // await requestLocationPermission();
    // Keyboard.dismiss();
    // Geolocation.getCurrentPosition(info => console.log(info));
    setLoading(true);
    const customerData = {
      name: values.username,
      phone: values.phone,
      email: values.email,
      password: values.password,
    };

    const resultAction = await dispatch(registerUser(customerData));
    setLoading(false);

    if (registerUser.fulfilled.match(resultAction)) {
      const user = resultAction.payload;
      showToast('success', `Account ${user.name}`);
      navigation.navigate('RootStack');
    } else {
      if (resultAction.payload) {
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
      <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
      <View className=" w-full rounded-b-[50px] bg-black p-10">
        <Text className="text-[30px] text-white font-bold mb-1">Register</Text>
        <Text className="text-white text-lg font-medium">
          And Enjoy delicious food{' '}
        </Text>
      </View>
      <Formik
        initialValues={{
          username: '',
          email: '',
          phone: '',
          password: '',
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
              iconPack="Entypo"
              iconName="email"
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

            <TouchableOpacity
              onPress={handleSubmit as any}
              disabled={loading}
              className="bg-black mt-5 p-2 rounded-3xl w-[60%] ">
              {loading ? (
                <ActivityIndicator color={'white'} size={25} />
              ) : (
                <Text className="text-white text-lg font-semibold text-center">
                  Signup
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              disabled={loading}
              onPress={() => navigation.navigate('Login')}
              className=" w-full mt-5">
              <Text className="text-blue-600 ">have account? Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}
