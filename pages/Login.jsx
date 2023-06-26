import { View, Text, TextInput, Button, TouchableOpacity, TouchableOpacityBase, ToastAndroid, Switch } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin, setUserData } from '../redux/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login({navigation}) {
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const {isLogin}=useSelector(state=>state.userReducer)
  const [isEnabled, setIsEnabled] = useState(false);
  
  
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    
    }
 
  const dispatch=useDispatch()

  const handleLogin = async() => {
   
    const user = await firestore().collection('Users').where('email','==',email).get();
    console.log(user.docs[0]._data)
  
    let data=user.docs[0]._data
    let id=user.docs[0].id
    console.log(id)

    
    if(password==data.password){
   
    
    dispatch(setLogin(true))
    dispatch(setUserData({
      id:id,
      email:data.email,
      role:data.role,
      address:data.address
    }))
    


        const jsonValue = JSON.stringify({
         
          email:data.email,
          id:id,
          address:data.address,
          role:data.role
        })
       AsyncStorage.setItem('userData', jsonValue)
     
    
      console.log('Done.')
    

    ToastAndroid.show('login success',ToastAndroid.BOTTOM)
    navigation.goBack()
    }
    ToastAndroid.show('login fail',ToastAndroid.BOTTOM)

  };

  return (
    <View className='border rounded-xl mt-20 mx-4 p-5'>


      <Text className='text-lg font-bold mb-4'>
        Login
      </Text>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <TextInput
        className='border border-gray-500 rounded-md  p-2 mb-2 w-full'
        placeholder="Email"
        onChangeText={(nativeEvent)=>setEmail(nativeEvent)}
      ></TextInput>
      <TextInput
        className='border border-gray-500 rounded-md w-full p-2 mb-4'
        placeholder="Password"
        onChangeText={(nativeEvent)=>setPassword(nativeEvent)}
      ></TextInput>
      
      <TextInput className=' p-2 rounded-sm '/>
      
      <TouchableOpacity onPress={handleLogin} className='bg-blue-500  p-1 rounded-md'>
      <Text className='text-white text-lg font-semibold'>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity>
      <Text className='text-blue-600 text-right'>not have account?</Text>
      </TouchableOpacity>
      <View> 
        <TouchableOpacity onPress={()=>navigation.navigate('Signup')} className='bg-blue-500  p-1 rounded-md'>
          <Text className='text-white text-lg font-semibold'>signup</Text>
        </TouchableOpacity>
      </View>

     
    </View>
  )
}