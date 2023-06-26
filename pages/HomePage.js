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

export default function HomePage() {
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
    <View className=' p-1'>
    <View className='flex-row bg-slate-200 rounded-xl px-1 justify-between items-center'>
    <TouchableOpacity className='cursor-pointer' onPress={() => dispatch(setdrawer(false))}>
    <Icon2 name='x' size={30} color={'black'}/>
    </TouchableOpacity>
      <Text className='text-lg'>WishList Items</Text>
     </View>
   


    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={200}
      drawerPosition={'left'}
      renderNavigationView={navigationView}
      className=' bg-black'>
      <View className='flex:1 p-5 rounded-b-3xl bg-white flex-1'>
      
      {/* navbar */}
       <View className='flex-row justify-between p-1 items-center '>
       <View className=' rounded-full bg-white h-8 w-8 items-center justify-center'>
       <Icon name="menu" size={30} color="black"  className='rounded-lg'></Icon>
       </View>
    <Text className=' text-red-400'>username</Text>
     <Image source={require('../images/people02.png')}  className='h-8 w-8 rounded-full'/>
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

{fastFoodArray.map((item)=>(
  <View>
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
<View className='flex-row justify-between items-center mt-5 p-2'>

<Swiper  showsButtons >
<View className='  items-center p-2  rounded-md bg-slate-50'>
<Image source={require('../images/daal.jpg')}  className=' h-44 w-[70%] rounded-lg'/>
<Text className='text-red-600 m-2'>Slide1</Text>

</View>
<View className=' items-center p-2  rounded-md bg-slate-50'>
<Image source={require('../images/chole.jpg')}  className=' h-44 w-[70%] rounded-lg'/>
<Text className='text-red-600 m-2'>Slide1</Text>

</View>
</Swiper>
  </View>

       
      </View>

<View>


</View>

      </View>


    </DrawerLayoutAndroid>
  )
}


