import { View, Text, Image, Modal, Button, TouchableOpacity, DrawerLayoutAndroid, ScrollView, ToastAndroid, TextInput, StyleSheet, useWindowDimensions, FlatList, Dimensions, Pressable, Alert, ImageBackground } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCartItem, setWishItem } from '../redux/slices/cartSlice'
import { setIsSearch, setSearchParam, setdrawer } from '../redux/slices/navbarSlice'
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fastFoodArray } from '../components/constants/sampleData'
import firestore from '@react-native-firebase/firestore';
import ItemModal from '../components/ItemModal'
import Navbar from '../components/Navbar'




export default function HomePage({ navigation }) {
  const [products, setProducts] = useState([])
  const [showProduct, setShowProduct] = useState()
  const [filterProduct, setFilterProduct] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [count, setCount] = useState(1)

  const { isSearch, searchParam, openDrawer } = useSelector(state => state.navbarReducer)
  const { wishItem } = useSelector(state => state.cartReducer)
  const { userData } = useSelector(state => state.userReducer)
  const dispatch = useDispatch()
  const drawer = useRef()



  const handledecrease = () => {
    if (count > 1)
      setCount(count - 1)
  }
  const handleincrease = () => {

    setCount(count + 1)
  }

  async function getAllFoods() {
    try {

      const user = await firestore().collection('Foods').where('category', '==', 'Fast Food').get();
      const productsData = user.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data };
      });
  
      // console.log(productsData)
      setProducts(productsData);
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllFoods()

  }, [])

  useEffect(() => {
    if (openDrawer)
      drawer.current.openDrawer()
    else
      drawer.current.closeDrawer()

  }, [openDrawer])

  const navigationView = () =>
    (
      <View className='bg-black text-slate-400 p-1 flex-1 items-center justify-between'>
        <View className='flex-row  rounded-xl px-1 justify-between items-center'>

          <TouchableOpacity className='bg-gray-500  rounded-full' onPress={() => dispatch(setdrawer(false))}>
            <Icon2 name='x' size={30} color={'red'} />
          </TouchableOpacity>
        </View>

        {userData?.role!='admin' && <View className=''>
          <View className='flex-row gap-2 mb-10'>
            <Icon2 name='x' size={20} color={'gray'} />
            <Text className='text-md text-gray-400 font-semibold'>My orders</Text>
          </View>
          <View className='flex-row gap-2 mb-10'>
            <Icon2 name='x' size={20} color={'gray'} />
            <Text className='text-md text-gray-400 font-semibold'>My Profile</Text>
          </View>
          <View className='flex-row gap-2 mb-10'>
            <Icon2 name='x' size={20} color={'gray'} />
            <Text className='text-md text-gray-400 font-semibold'>Address</Text>
          </View>
          <View className='flex-row gap-2 mb-10'>
            <Icon2 name='x' size={20} color={'gray'} />
            <Text className='text-md text-gray-400 font-semibold'>Contact Us</Text>
          </View>
          <View className='flex-row gap-2 mb-10'>
            <Icon2 name='x' size={20} color={'gray'} />
            <Text className='text-md text-gray-400 font-semibold'>Setting</Text>
          </View>
        </View>}
        {userData?.role=='admin' && <View className=''>
          <TouchableOpacity className='flex-row gap-2 mb-10' onPress={() => navigation.navigate('AddFood')}>
            <Icon2 name='x' size={20} color={'gray'} />
            <Text className='text-md text-gray-400 font-semibold'>Add Food</Text>
          </TouchableOpacity>
          <View className='flex-row gap-2 mb-10' onPress={() => navigation.navigate('FoodList')}>
            <Icon2 name='x' size={20} color={'gray'} />
            <Text className='text-md text-gray-400 font-semibold'>All Foods</Text>
          </View>
          <View className='flex-row gap-2 mb-10'>
            <Icon2 name='x' size={20} color={'gray'} />
            <Text className='text-md text-gray-400 font-semibold'>Address</Text>
          </View>
          <View className='flex-row gap-2 mb-10'>
            <Icon2 name='x' size={20} color={'gray'} />
            <Text className='text-md text-gray-400 font-semibold'>Contact Us</Text>
          </View>
          <View className='flex-row gap-2 mb-10'>
            <Icon2 name='x' size={20} color={'gray'} />
            <Text className='text-md text-gray-400 font-semibold'>Setting</Text>
          </View>
        </View>}

        <TouchableOpacity className='flex-row mb-2'>
          <Icon2 name='x' size={20} color={'gray'} />
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
     
      >

      <ScrollView className='flex:1 p-5 rounded-b-3xl bg-white flex-1'>
        {/* navbar */}
        <Navbar/>

        {/* search bar */}
        <View className='flex-row justify-between p-1 items-center bg-slate-50 rounded-xl m-1'>
          <View className=' rounded-full bg-white h-8 w-8 items-center justify-center'>
            <Icon2 name="search" size={20} color="black" className='rounded-lg'></Icon2>
          </View>
          <TextInput onChangeText={(nativeEvent)=>dispatch(setSearchParam(nativeEvent))} onFocus={()=>setIsSearch(true)} placeholder='What do you want to eat?'
            className=' placeholder:text-sm placeholder:font-semibold w-[80%] rounded-lg p-1 ' />
          <TouchableOpacity onPress={()=>{
    dispatch(setIsSearch(false))
    dispatch(setSearchParam(''))
    }} className='rounded-full'>
          <Icon3 name="menu-fold" size={20} color="black" ></Icon3>
          </TouchableOpacity>
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

            {fastFoodArray.map((item, index) => (
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


          <ScrollView horizontal className=' p-4'>
            <TouchableOpacity className='  items-center p-2  rounded-xl bg-slate-100 h-56 w-56 mx-4'>
              <Image source={require('../images/daal.jpg')} className=' h-[80%] w-full rounded-lg' />
              <View className='flex-row justify-between p-1'>
                <Text className='text-red-600 m-2'>rating</Text>
                <Text className='text-red-600 m-2'>Slide1</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className=' items-center p-2  rounded-xl bg-slate-50 h-56 w-56 mx-4'>
              <Image source={require('../images/chole.jpg')} className=' h-[80%] w-full rounded-lg' />
              <View className='flex-row justify-between p-1'>
                <Text className='text-slate-600 m-2'>rating</Text>
                <Text className='text-slate-600 m-2'>Slide1</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>


        <View className=' flex-row flex-wrap  my-5'>

          {products?.map((item, index) => (
            <TouchableOpacity onPress={() => {
              setShowProduct(item)
              setModalVisible(true)
            }} key={index} className='shadow-md flex-grow shadow-slate-400 rounded-xl p-2 bg-white w-[45%] m-1'>
          
              <Image source={{uri: item.image}} className='h-28 w-full rounded-xl' />
              <View className='flex-row justify-between'>

                <Text>{item.name}</Text>
                <Text>₹{item.price}</Text>
              </View>

            </TouchableOpacity>
          ))}

        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View className='bg-black px-1 pt-1 justify-between flex-1 '>
            <View className='rounded-b-3xl bg-white relative flex-1' >


              <Image source={{ uri: showProduct?.image }} className='w-full h-[50%]' />

              <View className='flex-row justify-between px-2 mt-4'>
                <Text>{showProduct?.name} {showProduct?.rating}</Text>
                <View className='flex-row rounded-lg'>
                  <TouchableOpacity onPress={handledecrease}>
                    <Text className='w-5 h-5 text-md bg-slate-200 text-center'>-</Text>
                  </TouchableOpacity>
                  <View>
                    <Text className='w-5 h-5 text-md bg-pink-200 text-center'>{count}</Text>
                  </View>
                  <TouchableOpacity onPress={handleincrease}>
                    <Text className='w-5 h-5 text-md bg-slate-200 text-center'>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Text>{showProduct?.description}</Text>

              <Pressable
                className='absolute left-2 top-2 bg-white'
                onPress={() => setModalVisible(!modalVisible)}>
                <Text >Hide Modal</Text>
              </Pressable>
            </View>

            <View className='flex-row justify-between items-center bg-black px-5 py-1  h-20'>
              <Text className='text-lg font-semibold text-white'>₹{parseInt(showProduct?.price) * count}</Text>
              <TouchableOpacity onPress={()=>{
                dispatch(setCartItem({quantity:count,product:showProduct}))
                ToastAndroid.show('food added to cart',ToastAndroid.BOTTOM)
                }} className='bg-green-400 mb-5 p-2 rounded-3xl w-[60%] '>
                <Text className='text-white text-lg font-semibold text-center'>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>



    </DrawerLayoutAndroid>
  )
}


