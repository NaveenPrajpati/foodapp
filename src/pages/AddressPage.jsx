import { View, Text, FlatList, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckoutPage from './CheckoutPage';
import Navbar from '../components/Navbar';
import Icon2 from 'react-native-vector-icons/Feather';
import { setDeliveryAdd, setUserOrders } from '../redux/slices/userSlice';


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
      console.log('data is=-',userData)

    },[])

    function readytoPlace(item){
      setAdd(item)
      dispatch(setDeliveryAdd(item))
    
    }


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
    <View className='p-5'>
    <Navbar/>
      <Text>Ship to</Text>
      {userData.address.length>=1? 
      <View>
      <FlatList
        data={userData.address}
        renderItem={({item,index})=>(
          <TouchableOpacity onPress={()=>{readytoPlace(item)}} className='flex-row gap-1 p-2 m-2 h-24 rounded-2xl bg-slate-50' >
                      <Image source={require('../images/locationImg.png')} className='w-20 h-full rounded-xl'></Image>
                      <View className=' justify-between  flex-1 h-full '>
                        <View className='flex-row justify-between item-center'>
                          <Text className='text-black font-semibold '>{item}</Text>
                          <TouchableOpacity className=' ' >
                            <Icon2 name='x' size={20} color={'black'} />
                          </TouchableOpacity>
                        </View>
                        <View className='flex-row justify-between items-center p-1'>
                          <Text className='text-black font-semibold text-lg'>{userData.name}</Text>
                         <Text>delete</Text>
                        </View>
                      </View>
            </TouchableOpacity>
        )}
      /></View>:
      <View>
      <Text>Address not present</Text>
      </View>
      }

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