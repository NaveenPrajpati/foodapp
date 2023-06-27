import { View, Text, TextInput, Button, ToastAndroid, TouchableOpacity, Switch, ScrollView, Image, Modal, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import React, { useState } from 'react'

export default function AddFood({navigation}) {
const[showPickOption,setShowPickOption]=useState(false)


// const pickfromcamera=async()=>{
//     setShowPickOption(false)
//     // You can also use as a promise without 'callback':
//     const result = await launchCamera({mediaType:'photo'});
//     console.log(result)
// }
// const pickfromgallery=async()=>{
//     setShowPickOption(false)
//     // You can also use as a promise without 'callback':
//     const result = await launchImageLibrary({
//         mediaType:'photo'
//     });
//     console.log(result)
// }

  return (
    <ScrollView className='flex-1 bg-white'>
  
  <View className=' rounded-xl  p-10  flex-1 bg-white items-center '>

    {/* <View>

    <Text className='text-lg font-bold mb-4'>
      Add Food
         </Text>
    </View> */}

{/* <TouchableOpacity onPress={()=>setShowPickOption(true)}>
<Text>Pick image</Text>
</TouchableOpacity> */}

{/* <Modal 
visible={showPickOption}
onRequestClose={()=>setShowPickOption(false)}
>
        <Pressable
        onPress={() => setShowPickOption(false)}>
              <Text >Hide Modal</Text>
            </Pressable>
<TouchableOpacity onPress={pickfromgallery}>
    <Text>From Gallery</Text>
</TouchableOpacity>
<TouchableOpacity onPress={pickfromcamera}>
    <Text>From Camera</Text>
</TouchableOpacity>
</Modal> */}

    {/* <View className='flex-row items-center p-2 rounded-2xl mb-5  bg-slate-100'>
    <View className='rounded-full justify-center items-center bg-white h-8 w-8'>
    <Icon name='lock' size={20} color={'black'}/>
    </View>
    <TextInput
      className='rounded-md  p-1  w-full text-lg'
      placeholder="Name"
     onChangeText={(nativeEvent)=>setUserName(nativeEvent)}
    ></TextInput>
    </View> */}
    
    {/* <View className='flex-row items-center p-2 rounded-2xl mb-5  bg-slate-100'>
    <View className='rounded-full justify-center items-center bg-white h-8 w-8'>
    <Icon name='lock' size={20} color={'black'}/>
    </View>
    <TextInput
      className='rounded-md  p-1  w-full text-lg'
      placeholder="category"
      onChangeText={(nativeEvent)=>setEmail(nativeEvent)}
    ></TextInput>
    </View> */}
    {/* <View className='flex-row items-center p-2 rounded-2xl mb-5  bg-slate-100'>
    <View className='rounded-full justify-center items-center bg-white h-8 w-8'>
    <Icon name='lock' size={20} color={'black'}/>
    </View>
    <TextInput
      className='rounded-md  p-1  w-full text-lg'
      inputMode='numeric'
      placeholder="Price"
      onChangeText={(nativeEvent)=>setPhone(nativeEvent)}
    ></TextInput>
    </View> */}
    {/* <View className='flex-row items-center p-2 rounded-2xl mb-5  bg-slate-100'>
    <View className='rounded-full justify-center items-center bg-white h-8 w-8'>
    <Icon name='lock' size={20} color={'black'}/>
    </View>
    <TextInput
      className='rounded-md  p-1  w-full text-lg'
      inputMode='text'
      placeholder="Description"
      multiline
      onChangeText={(nativeEvent)=>setAddress(nativeEvent)}
    ></TextInput>
    </View> */}

    {/* <View className='flex-row items-center p-2 rounded-2xl mb-5  bg-slate-100'>
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
    </View> */}

    
  
{/*     
    <TouchableOpacity onPress={handleSignup} className='bg-black mb-5 p-2 rounded-3xl w-[60%] '>
    <Text className='text-white text-lg font-semibold text-center'>Signup</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>navigation.navigate('Login')} className=' w-full'>
    <Text className='text-blue-600'>have account? Login</Text>
    </TouchableOpacity> */}
   
    

   

   
  </View>
  
  </ScrollView>
  )
}