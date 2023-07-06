import { View, Text, FlatList, Image, Button, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeCartItem, setCheckOutPrice } from '../redux/slices/cartSlice'
import WarningModal from '../components/WarningModal'
import * as RootNavigation from '../navigation/RootNavigation';
import Icon2 from 'react-native-vector-icons/Feather';
import Navbar from '../components/Navbar'
import CartPriceCard from '../components/CartPriceCard'


export default function CartPage({ navigation }) {
  const [warning, setWarning] = useState(false)
  const { cartItem } = useSelector(state => state.cartReducer)
  const dispatch = useDispatch()
  const { isLogin} = useSelector(state => state.userReducer)

  const [shippingCharge, setShippingCharge] = useState(50)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    console.log(cartItem)
    for (let i = 0; i < cartItem.length; i++) {
      console.log(cartItem[i].product.price)
      setTotalPrice(total => total + (cartItem[i].quantity * cartItem[i].product.price))
    }
  }, [cartItem])


  function checkLogin() {
    if (isLogin) {
      console.log('go for payment')
      dispatch(setCheckOutPrice({
        cartPrice:totalPrice,
        shippingPrice:shippingCharge,
        totalPrice: Math.round(totalPrice + shippingCharge)
      }))
      
      navigation.navigate('Address')
    } else {
      console.log('login warning')
      // navigation.navigate('Login')
      setWarning(true)
    }
  }


  return (
    <View className='flex-1 bg-white'>
      {cartItem.length == 0 ?
        <View>
          <Text>cart is Empty</Text>
        </View> :
        <View className='flex-1 p-5'>
        <Navbar/>
          <View className='flex-1 justify-between'>
            <View className='flex-1'>
              <FlatList
                data={cartItem}
                renderItem={({ item, index }) => {
                  return (

                    <View className='flex-row gap-1 p-2 m-2 h-24 rounded-2xl bg-slate-50'>
                      <Image source={{ uri: item.product.image }} className='w-20 h-full rounded-xl'></Image>
                      <View className=' justify-between  flex-1 h-full '>
                        <View className='flex-row justify-between item-center'>
                          <Text className='text-black font-semibold '>{item.product.name}</Text>
                          <TouchableOpacity className=' ' onPress={() => dispatch(removeCartItem(item.product.id))}>
                            <Icon2 name='x' size={20} color={'black'} />
                          </TouchableOpacity>
                        </View>
                        <View className='flex-row justify-between items-center p-1'>
                          <Text className='text-black font-semibold text-lg'>₹{item.product?.price}</Text>
                          <View className='flex-row rounded-lg'>
                            <TouchableOpacity>
                              <Text className='w-5 h-5 rounded-full text-white text-md bg-black text-center'>-</Text>
                            </TouchableOpacity>
                            <View>
                              <Text className='w-6 h-5 text-md font-bold text-center'>{item.quantity}</Text>
                            </View>
                            <TouchableOpacity>
                              <Text className='w-5 h-5 rounded-full text-white text-md bg-black text-center'>+</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>

                    </View>

                  
                  )
                }}
              />
            </View>

            {/* price summary */}
            <View className=' p-2 items-center  '>
              <View className='flex-row items-center justify-between p-2 rounded-3xl mb-5 w-full bg-slate-100'>
                <View className='rounded-full justify-center items-center bg-white h-8 w-8'>
                  <Icon2 name='x' size={20} color={'black'} />
                </View>
                <TextInput
                  className='rounded-xl  p-1 text-lg'
                  placeholder="Promo code"
                  onChangeText={(nativeEvent) => setEmail(nativeEvent)}
                ></TextInput>
                <TouchableOpacity className='bg-black p-2 h-full rounded-2xl'>
                  <Text className='text-slate-200 font-semibold'>Apply</Text>
                </TouchableOpacity>
              </View>

              <View className='w-full'>
                <CartPriceCard name={'SubTotal'} price={totalPrice}/>
                <CartPriceCard name={'Delivery'} price={shippingCharge}/>
                <CartPriceCard name={'Total'} price={totalPrice + shippingCharge}/>
              </View>

              <TouchableOpacity onPress={checkLogin} className='bg-black mt-5 p-2 rounded-3xl w-[60%] '>
                <Text className='text-slate-200 text-lg font-semibold text-center'>Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      }
      {warning && <WarningModal message={'please login to checkout'} />}
    </View>
  )
}
