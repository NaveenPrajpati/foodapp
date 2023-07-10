import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import Icon2 from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';

export default function FoodList() {
  const [products, setProducts] = useState([])
  const dispatch = useDispatch()
  
  
  async function getAllFoods() {
    try {

      const user = await firestore().collection('Foods').get();
      const productsData = user.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data };
      });
      setProducts(productsData);
    }
    catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getAllFoods()
  },[])
  return (
    <View className='flex-1'>
              <FlatList
                data={products}
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
  )
}