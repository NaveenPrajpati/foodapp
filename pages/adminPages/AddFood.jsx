import { View, Text, TextInput, Button, ToastAndroid, TouchableOpacity, Switch, ScrollView, Image, Modal, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import ImagePicker from 'react-native-image-crop-picker';
import SelectDropdown from 'react-native-select-dropdown'
import firestore from '@react-native-firebase/firestore';

import React, { useState } from 'react'

export default function AddFood({navigation}) {
const[showPickOption,setShowPickOption]=useState(false)
const[pickedImage,setPickedImage]=useState('')
const[name,setName]=useState('')
const[category,setCategory]=useState('')
const[price,setPrice]=useState(0)
const[discount,setDiscount]=useState(0)
const[rating,setRating]=useState(0)
const[tags,setTags]=useState('')
const[description,setDescription]=useState('')


const foodCategories = ["Main Course", "Fast Food", "Dessert"];


const pickfromcamera=async()=>{
    setShowPickOption(false)

}
const pickfromgallery=async()=>{
    setShowPickOption(false)
   
    ImagePicker.openPicker({
     
   
    }).then(image => {
      console.log(image);
      setPickedImage(image.path)
    });
}

const addfooditem=()=>{
  firestore()
  .collection('Foods')
  .add({
    name: name,
    description:description,
    price:price,
    discount:discount,
    category:category,
    tags:tags,
    image:pickedImage,
    rating:rating
  })
  .then(() => {
    console.log('User added!');
    ToastAndroid.show('Food added sucessFully',ToastAndroid.BOTTOM)
    navigation.navigate('Home')
  });
}

  return (
    <ScrollView className='flex-1 bg-white'>
  
  <View className=' rounded-xl  p-10  flex-1 bg-white items-center '>

    <View>

    <Text className='text-lg font-bold mb-4'>
      Add Food
         </Text>
    </View>

<TouchableOpacity onPress={()=>setShowPickOption(true)}>
<Text>Pick image</Text>
</TouchableOpacity>



<Image source={{uri:pickedImage}} className='h-20 w-20'/>
    <View className='flex-row items-center p-2 rounded-2xl mb-5  bg-slate-100'>
    <View className='rounded-full justify-center items-center bg-white h-8 w-8'>
    <Icon name='lock' size={20} color={'black'}/>
    </View>
    <TextInput
      className='rounded-md  p-1  w-full text-lg'
      placeholder="Name"
     onChangeText={(nativeEvent)=>setName(nativeEvent)}
    ></TextInput>
    </View>
    
    <View className='flex-row items-center p-2 rounded-2xl mb-5  bg-slate-100'>
    <View className='rounded-full justify-center items-center bg-white h-8 w-8'>
    <Icon name='lock' size={20} color={'black'}/>
    </View>
    <SelectDropdown
	data={foodCategories}
	onSelect={(selectedItem, index) => {
		console.log(selectedItem, index)
    setCategory(selectedItem)
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		// text represented after item is selected
		// if data array is an array of objects then return selectedItem.property to render after item is selected
		return selectedItem
	}}
	rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item
	}}
/>
    </View>

    <View className='flex-row items-center p-2 rounded-2xl mb-5  bg-slate-100'>
    <View className='rounded-full justify-center items-center bg-white h-8 w-8'>
    <Icon name='lock' size={20} color={'black'}/>
    </View>
    <TextInput
      className='rounded-md  p-1  w-full text-lg'
      inputMode='numeric'
      placeholder="Price"
      onChangeText={(nativeEvent)=>setPrice(nativeEvent)}
    ></TextInput>
    </View>



    <View className='flex-row items-center p-2 rounded-2xl mb-5  bg-slate-100'>
    <View className='rounded-full justify-center items-center bg-white h-8 w-8'>
    <Icon name='lock' size={20} color={'black'}/>
    </View>
    <TextInput
      className='rounded-md  p-1  w-full text-lg'
      inputMode='text'
      placeholder="Description"
      multiline
      onChangeText={(nativeEvent)=>setDescription(nativeEvent)}
    ></TextInput>
    </View>

    <View className='flex-row items-center p-2 rounded-2xl mb-5  bg-slate-100'>
    <View className='rounded-full justify-center items-center bg-white h-8 w-8'>
    <Icon name='lock' size={20} color={'black'}/>
    </View>
    <TextInput
      className='rounded-md  p-1  w-full text-lg'
      placeholder="Discount"
      onChangeText={(nativeEvent)=>setDiscount(nativeEvent)}
    ></TextInput>
    </View>

    <View className='flex-row items-center p-2 rounded-2xl mb-5  bg-slate-100'>
    <View className='rounded-full justify-center items-center bg-white h-8 w-8'>
    <Icon name='lock' size={20} color={'black'}/>
    </View>
    <TextInput
      className='rounded-md  p-1  w-full text-lg'
      placeholder="Tags"
      onChangeText={(nativeEvent)=>setTags(nativeEvent)}
    ></TextInput>
    </View>

    
  
    
    <TouchableOpacity onPress={addfooditem} className='bg-black mb-5 p-2 rounded-3xl w-[60%] '>
    <Text className='text-white text-lg font-semibold text-center'>Add Food</Text>
    </TouchableOpacity>

   
    

    <Modal 
visible={showPickOption}
onRequestClose={()=>setShowPickOption(false)}
transparent={true}
>
<View className='  flex-1 justify-center items-center'>
<View className=' bg-slate-300 p-10 rounded-lg justify-center items-center'>
        <Pressable
        onPress={() => setShowPickOption(false)}>
              <Text className='text-red-400  bg-white p-1  rounded-full'>X</Text>
            </Pressable>
<TouchableOpacity onPress={pickfromgallery} className='my-5 bg-blue-300 p-2 rounded-md'>
    <Text  className='text-white font-semibold'>From Gallery</Text>
</TouchableOpacity>
<TouchableOpacity onPress={pickfromcamera}>
    <Text>From Camera</Text>
</TouchableOpacity>
</View>
</View>
</Modal>

   
  </View>
  
  </ScrollView>
  )
}