import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckoutPage from './CheckoutPage';


export default function AddressPage({navigation}) {
  const[localUserData,setlocalUserData]=useState({})
  const[add,setAdd]=useState('')
  const[viewAdd,setViewAdd]=useState(false)
  const[text,setText]=useState('')
  const dispatch=useDispatch()
  const {isLogin,userData}=useSelector(state=>state.userReducer)
    useEffect(()=>{
      const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('userData')
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
          // error reading value
        }
      }

     
      setlocalUserData(getData)
      console.log(userData)
     async function addAddress(){
     
      }

     
    },[])


    function handleAddress(){

      console.log(localUserData)
      console.log(localUserData._j.email)
      
      console.log(localUserData._j.address)
      let addd=localUserData._j.address
      addd.push(text)

      firestore()
      .collection('Users')
      .doc(localUserData._j.id)
      .update({
        address:addd
      })
      .then(() => {
        console.log('User updated!');
      });
      
    }

  return (
    <View>
      <Text>Select Address</Text>
      {localUserData?._j?.address?.length>1? 
      <View>
      <FlatList
        data={localUserData?._j?.address}
        renderItem={({item,index})=>(
          <TouchableOpacity key={index} onPress={()=>setAdd(item)} className='border rounded-md'>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      /></View>:<Text>Address not present</Text>}

      {viewAdd && <View className='p-1'>

      <TextInput onChangeText={(text)=>setText(text)} className='w-full p-1 rounded-md bg-yellow-200'></TextInput>
      <TouchableOpacity onPress={()=>handleAddress()}>
        <Text>add address</Text>
      </TouchableOpacity>

      </View>}
    
   {!viewAdd &&  <TouchableOpacity onPress={()=>setViewAdd(true)}>
      <Text className='text-red-400'>add Address</Text>
    </TouchableOpacity>}


   {add && <View>
      <CheckoutPage />
    </View>}


    </View>
  )
}