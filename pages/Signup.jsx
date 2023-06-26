import { View, Text, TextInput, Button, ToastAndroid, TouchableOpacity, Switch } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import * as RootNavigation from '../navigation/RootNavigation';


export default function Signup() {

  const[username,setUserName]=useState('')
  const[role,setRole]=useState('')
  const[email,setEmail]=useState('')
  const[phone,setPhone]=useState('')
  const[password,setPassword]=useState('')
  const[address,setAddress]=useState([''])
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
  setIsEnabled(previousState => !previousState);

  }

    const handleSignup = () => {
        firestore()
  .collection('Users')
  .add({
    name: username,
    email:email,
    role:role,
    phone:phone,
    address:address,
    password:password
  })
  .then(() => {
    console.log('User added!');
    ToastAndroid.show('user register sucessFully',ToastAndroid.BOTTOM)
    RootNavigation.navigate('Login')
  });
      };

  return (
    <View className='border rounded-xl mt-20 mx-4 p-5'>
    <Text className='text-2xl font-bold mb-4'>Signup</Text>
    <View style={styles.container}>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
    <TextInput
      className='border border-gray-500 rounded-md  p-2 mb-2 w-full'
      placeholder="Name"
      onChangeText={(nativeEvent)=>setUserName(nativeEvent)}
    />
    <TextInput
      className='border border-gray-500 rounded-md  p-2 mb-2 w-full'
      placeholder="Email"
      keyboardType="email-address"
      onChangeText={(nativeEvent)=>setEmail(nativeEvent)}
    />
    <TextInput
      className='border border-gray-500 rounded-md  p-2 mb-2 w-full'
      placeholder="Role"
      onChangeText={(nativeEvent)=>setRole(nativeEvent)}
    />
    <TextInput
      className='border border-gray-500 rounded-md  p-2 mb-2 w-full'
      placeholder="Password"
      secureTextEntry
      onChangeText={(nativeEvent)=>setPassword(nativeEvent)}
      
    />
    <TextInput
      className='border border-gray-500 rounded-md  p-2 mb-2 w-full'
      placeholder="Confirm Password"
      secureTextEntry
    />


    <TouchableOpacity onPress={handleSignup} className='bg-blue-500  p-1 rounded-md'>
      <Text className='text-white text-lg font-semibold'>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity  className='mt-2'>
      <Text className='text-blue-500 text-center text-sm font-semibold'>Login?</Text>
      </TouchableOpacity>

  </View>
  )
}