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
} from 'react-native';
import React, {useState} from 'react';

import Icon from 'react-native-vector-icons/Feather';
import InputTag from '../../components/elements/InputTag';
import {BaseUrl} from '../../services/endPoints';
import axios from 'axios';

export default function Signup({navigation}) {
  const [username, setUserName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState('');
  const [address, setAddres] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);

  const handleSignup = async () => {
    if (!username || !phone || !password || !address) {
      ToastAndroid.show(
        'Please fill in all required fields',
        ToastAndroid.SHORT,
      );
      return;
    }

    const customerData = {
      name: username,
      phone: phone,
      email: email,
      password: password,
      address: address,
    };

    try {
      const response = await axios.post(
        BaseUrl + '/customer/registerCustomer',
        customerData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 201) {
        ToastAndroid.show('Registration successful!', ToastAndroid.SHORT);
        navigation.navigate('Login');
      } else {
        ToastAndroid.show(
          `Error: ${response.data.errors[0].msg}`,
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.error(error);
      ToastAndroid.show(
        'An error occurred. Please try again.',
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className=" rounded-xl  p-10  flex-1 bg-white items-center ">
        <View>
          <Text className="text-lg font-bold mb-2 text-black">
            Register Here
          </Text>
          <Text className="text-black">Here you can create account</Text>
        </View>

        <InputTag
          placeholder="Name"
          onChangeText={nativeEvent => setUserName(nativeEvent)}
        />
        <InputTag
          placeholder="Email"
          onChangeText={nativeEvent => setEmail(nativeEvent)}
        />
        <InputTag
          iconName="phone"
          inputMode="numeric"
          placeholder="Phone"
          onChangeText={nativeEvent => setPhone(nativeEvent)}
        />

        <InputTag
          iconName="lock"
          placeholder="Password"
          secureTextEntry
          onChangeText={nativeEvent => setPassword(nativeEvent)}
        />

        <InputTag
          iconName="address-book"
          placeholder="Address"
          onChangeText={nativeEvent => setAddres(nativeEvent)}
        />

        <TouchableOpacity
          onPress={handleSignup}
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
    </ScrollView>
  );
}
