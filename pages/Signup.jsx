import { View, Text, TextInput, Button, ToastAndroid, TouchableOpacity, Switch, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import * as RootNavigation from '../navigation/RootNavigation';
import Icon from 'react-native-vector-icons/Feather'
import auth from '@react-native-firebase/auth';

export default function Signup({navigation}) {

  const[username,setUserName]=useState('')
  const[role,setRole]=useState('')
  const[email,setEmail]=useState('')
  const[phone,setPhone]=useState()
  const[password,setPassword]=useState('')
  const[addres,setAddres]=useState([])
  const [isEnabled, setIsEnabled] = useState(false);
  
  
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    if(isEnabled){
      console.log('public')
      setRole('public')
    }
    else
    setRole('admin')
    console.log('admin')
    }

    const handleSignup = () => {
        firestore()
  .collection(isEnabled?'Admin':'Users')
  .add({
    name: username,
    email:email,
    role:'public',
    phone:phone,
    address:[],
    password:password,
    myOrders:[]
  })
  .then(() => {
    console.log('User added!');
    ToastAndroid.show('user register sucessFully',ToastAndroid.BOTTOM)
    RootNavigation.navigate('Login')
  });
      };

  return (
  <ScrollView className='flex-1 bg-white'>
  <View className=' rounded-xl  p-10  flex-1 bg-white items-center '>

<View>
<Image source={''} alt='image'/>
<Text className='text-lg font-bold mb-4'>
      Register Here
    </Text>
<Text>
Here you can login to your account </Text>

</View>

   <View className='flex-row items-center p-2 rounded-2xl mb-5  bg-slate-100'>
   <Text className='font-semibold'>
    {isEnabled?'Public':'Admin'}</Text>
   
    <Switch
      trackColor={{false: '#767577', true: '#81b0ff'}}
      thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={isEnabled}
    /></View>

    <View className='flex-row items-center p-2 rounded-2xl mb-5  bg-slate-100'>
    <View className='rounded-full justify-center items-center bg-white h-8 w-8'>
    <Icon name='lock' size={20} color={'black'}/>
    </View>
    <TextInput
      className='rounded-md  p-1  w-full text-lg'
      placeholder="Name"
     onChangeText={(nativeEvent)=>setUserName(nativeEvent)}
    ></TextInput>
    </View>
    
    <View className='flex-row items-center p-2 rounded-2xl mb-5  bg-slate-100'>
    <View className='rounded-full justify-center items-center bg-white h-8 w-8'>
    <Icon name='lock' size={20} color={'black'}/>
    </View>
    <TextInput
      className='rounded-md  p-1  w-full text-lg'
      keyboardType="email-address"
      placeholder="Email"
      onChangeText={(nativeEvent)=>setEmail(nativeEvent)}
    ></TextInput>
    </View>
    <View className='flex-row items-center p-2 rounded-2xl mb-5  bg-slate-100'>
    <View className='rounded-full justify-center items-center bg-white h-8 w-8'>
    <Icon name='lock' size={20} color={'black'}/>
    </View>
    <TextInput
      className='rounded-md  p-1  w-full text-lg'
      inputMode='numeric'
      placeholder="Phone"
      onChangeText={(nativeEvent)=>setPhone(nativeEvent)}
    ></TextInput>
    </View>
   

    <View className='flex-row items-center p-2 rounded-2xl mb-5  bg-slate-100'>
    <View className='rounded-full justify-center items-center bg-white h-8 w-8'>
    <Icon name='lock' size={20} color={'black'}/>
    </View>
    <TextInput
      className='rounded-md  p-1  w-full text-lg'
      placeholder="Password"
     secureTextEntry
      onChangeText={(nativeEvent)=>setPassword(nativeEvent)}
    ></TextInput>
    </View>

    <View className='flex-row items-center p-2 rounded-2xl mb-5  bg-slate-100'>
    <View className='rounded-full justify-center items-center bg-white h-8 w-8'>
    <Icon name='lock' size={20} color={'black'}/>
    </View>
    <TextInput
      className='rounded-md  p-1  w-full text-lg'
      placeholder="Confirm Password"
      secureTextEntry
    ></TextInput>
    </View>

    
  
    
    <TouchableOpacity onPress={handleSignup} className='bg-black mb-5 p-2 rounded-3xl w-[60%] '>
    <Text className='text-white text-lg font-semibold text-center'>Signup</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>navigation.navigate('Login')} className=' w-full'>
    <Text className='text-blue-600'>have account? Login</Text>
    </TouchableOpacity>
   
    

   

   
  </View>
  </ScrollView>
  )
}