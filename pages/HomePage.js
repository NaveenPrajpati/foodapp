import { View, Text, Image,  Modal, Button, TouchableOpacity, DrawerLayoutAndroid, ScrollView, ToastAndroid, TextInput, StyleSheet, useWindowDimensions, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCartItem, setWishItem} from '../redux/slices/cartSlice'
import { setdrawer } from '../redux/slices/navbarSlice'
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Entypo';
import Swiper from 'react-native-swiper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fastFoodArray } from '../components/constants/sampleData'

export default function HomePage({navigation}) {
  const [products, setProducts] = useState([])
  const [showProduct, setShowProduct] = useState()
  const [filterProduct, setFilterProduct] = useState([])
  const [modVisible, setModVisible] = useState(false)
  const[count,setCount]=useState(1)

  const { isSearch, searchParam, openDrawer } = useSelector(state => state.navbarReducer)
  const dispatch = useDispatch()
  const { wishItem } = useSelector(state => state.cartReducer)
  const drawer = useRef()
 


  const handledecrease=()=>{
    if(count>1)
setCount(count-1)
  }
  const handleincrease=()=>{
    
setCount(count+1)
  }

  // useEffect(() => {
  //   fetch('https://fakestoreapi.com/products')
  //     .then(res=> res.json())
  //     .then(json=> {
     
  //       setProducts(json)
  //     })
  //     .catch(error => console.log(error))
  // }, [])

  useEffect(() => {
    if (openDrawer)
      drawer.current.openDrawer()
    else
      drawer.current.closeDrawer()

  }, [openDrawer])

  const navigationView = () => (
    <View className='bg-black text-slate-400 p-1 flex-1 items-center justify-between'>
    <View className='flex-row  rounded-xl px-1 justify-between items-center'>
      
    <TouchableOpacity className='bg-gray-500  rounded-full' onPress={() => dispatch(setdrawer(false))}>
    <Icon2 name='x' size={30} color={'white'}/>
    </TouchableOpacity>
     </View>

    {false && <View className=''>
     <View className='flex-row gap-2 mb-10'>
     <Icon2 name='x' size={20} color={'gray'}/>
     <Text className='text-md text-gray-400 font-semibold'>My orders</Text>
     </View>
     <View className='flex-row gap-2 mb-10'>
     <Icon2 name='x' size={20} color={'gray'}/>
     <Text className='text-md text-gray-400 font-semibold'>My Profile</Text>
     </View>
     <View className='flex-row gap-2 mb-10'>
     <Icon2 name='x' size={20} color={'gray'}/>
     <Text className='text-md text-gray-400 font-semibold'>Address</Text>
     </View>
     <View className='flex-row gap-2 mb-10'>
     <Icon2 name='x' size={20} color={'gray'}/>
     <Text className='text-md text-gray-400 font-semibold'>Contact Us</Text>
     </View>
     <View className='flex-row gap-2 mb-10'>
     <Icon2 name='x' size={20} color={'gray'}/>
     <Text className='text-md text-gray-400 font-semibold'>Setting</Text>
     </View>
     </View>}
    {true && <View className=''>
     <View className='flex-row gap-2 mb-10' onPress={()=>navigation.navigate('AddFood')}>
     <Icon2 name='x' size={20} color={'gray'}/>
     <Text className='text-md text-gray-400 font-semibold'>Add Food</Text>
     </View>
     <View className='flex-row gap-2 mb-10' onPress={()=>navigation.navigate('FoodList')}>
     <Icon2 name='x' size={20} color={'gray'}/>
     <Text className='text-md text-gray-400 font-semibold'>All Foods</Text>
     </View>
     <View className='flex-row gap-2 mb-10'>
     <Icon2 name='x' size={20} color={'gray'}/>
     <Text className='text-md text-gray-400 font-semibold'>Address</Text>
     </View>
     <View className='flex-row gap-2 mb-10'>
     <Icon2 name='x' size={20} color={'gray'}/>
     <Text className='text-md text-gray-400 font-semibold'>Contact Us</Text>
     </View>
     <View className='flex-row gap-2 mb-10'>
     <Icon2 name='x' size={20} color={'gray'}/>
     <Text className='text-md text-gray-400 font-semibold'>Setting</Text>
     </View>
     </View>}
   
     <TouchableOpacity className='flex-row mb-2'>
     <Icon2 name='x' size={20} color={'gray'}/>
     <Text className='text-md text-gray-400 font-semibold'>Logout</Text>
     </TouchableOpacity>

    </View>
  );

  return (
   
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={200}
      drawerPosition={'left'}
      renderNavigationView={navigationView}
      className=' bg-black'>
    
      <ScrollView className='flex:1 p-5 rounded-b-3xl bg-white flex-1'>
      {/* navbar */}
       <View className='flex-row justify-between p-1 items-center '>
       <View className=' rounded-full bg-white h-8 w-8 items-center justify-center'>
       <Icon name="menu" size={30} color="black"  className='rounded-lg' onPress={() => dispatch(setdrawer(true))}></Icon>
       </View>
    <Text className=' text-red-400'>username</Text>
    <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
     <Image source={require('../images/people02.png')}  className='h-8 w-8 rounded-full'/>
    </TouchableOpacity>
       </View>

{/* search bar */}
<View className='flex-row justify-between p-1 items-center bg-slate-50 rounded-xl m-1'>
<View className=' rounded-full bg-white h-8 w-8 items-center justify-center'>
       <Icon2 name="search" size={20} color="black"  className='rounded-lg'></Icon2>
       </View>
    <TextInput placeholder='What do you want to eat?'
     className=' placeholder:text-sm placeholder:font-semibold w-[80%] rounded-lg p-1 '/>
    <Icon3 name="menu-fold" size={20} color="black"  className='rounded-lg'></Icon3>
     
</View>

{/* categorie card */}
<View className='  mt-10'>
<View className='flex-row justify-between items-center'>
  <Text>Categories</Text>
  <TouchableOpacity>
  <Text className=' text-blue-400'>See All</Text>
  </TouchableOpacity>
</View>
<View className='flex-row justify-between mt-5 p-2'>

{fastFoodArray.map((item,index)=>(
  <View key={index}>
    {item.image}
    <Text>{item.name}</Text>
  </View>
))}

  </View>

</View>

<View className='  mt-10'>
<View className='flex-row justify-between items-center'>
  <Text>Feature Dish</Text>
  <TouchableOpacity>
  <Text className=' text-blue-400'>See All</Text>
  </TouchableOpacity>
</View>

<Swiper className=' h-64 justify-center items-center' showsButtons
 showsPagination={false} >
<View className='  items-center p-1  rounded-xl bg-slate-100'>
<Image source={require('../images/daal.jpg')}  className=' h-44 w-[70%] rounded-lg'/>
<View className='flex-row justify-between p-1'>
<Text className='text-red-600 m-2'>rating</Text>
<Text className='text-red-600 m-2'>Slide1</Text>
</View>

</View>
<View className=' items-center p-2  rounded-xl bg-slate-50'>
<Image source={require('../images/chole.jpg')}  className=' h-44 w-[70%] rounded-lg'/>
<View className='flex-row justify-between p-1'>
<Text className='text-slate-600 m-2'>rating</Text>
<Text className='text-slate-600 m-2'>Slide1</Text>
</View>

</View>
</Swiper>
     
      </View>


<View>
<Text>
  askjslaflsajf safjsvjs 
</Text>

</View>

      </ScrollView>


 
    </DrawerLayoutAndroid>
  )
}


