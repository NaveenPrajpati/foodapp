import {
  View,
  Text,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import WarningModal from '../components/WarningModal';
import Icon2 from 'react-native-vector-icons/Feather';
import Navbar from '../components/Header';
import CartPriceCard from '../components/CartPriceCard';
import PriceSummery from '../components/PriceSummery';
import VectorIcon from '../components/VectorIcon';
import {removeDish} from '../redux/slices/cartSlice';
import {useNavigation} from '@react-navigation/native';

export default function CartPage() {
  const [warning, setWarning] = useState(false);
  const {dishes} = useSelector(state => state.cartReducer);
  const dispatch = useDispatch();
  const {isLogin} = useSelector(state => state.userReducer);

  const [shippingCharge, setShippingCharge] = useState(50);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < dishes.length; i++) {
      total = total + dishes[i].quantity * dishes[i].product.price;
    }
    setTotalPrice(total);
  }, [dishes]);

  function checkLogin() {
    // if (isLogin) {
    //   console.log('go for payment');
    //   dispatch(
    //     setCheckOutPrice({
    //       cartPrice: totalPrice,
    //       shippingPrice: shippingCharge,
    //       totalPrice: Math.round(totalPrice + shippingCharge),
    //     }),
    //   );
    //   navigation.navigate('Address');
    // } else {
    //   console.log('login warning');
    //   // navigation.navigate('Login')
    //   setWarning(true);
    // }
  }

  return (
    <View className="flex-1 bg-white">
      {dishes.length == 0 ? (
        <View>
          <Text>cart is Empty</Text>
        </View>
      ) : (
        <View className="flex-1 p-5">
          <View className="flex-1 justify-between">
            <View className="flex-1">
              <FlatList
                data={dishes}
                renderItem={({item, index}) => {
                  return (
                    <View className="flex-row gap-1 p-2 m-2 h-24 rounded-2xl bg-slate-50">
                      <Image
                        source={{uri: item.product.imagePath[0]}}
                        className="w-20 h-full rounded-xl"></Image>
                      <View className=" justify-between  flex-1 h-full ">
                        <View className="flex-row justify-between item-center">
                          <Text className="text-black font-semibold text-lg">
                            {item.product.name}
                          </Text>
                          <TouchableOpacity
                            className=" "
                            onPress={() => {
                              dispatch(removeDish(index));
                            }}>
                            <VectorIcon
                              iconName="close"
                              size={18}
                              color={'black'}
                            />
                          </TouchableOpacity>
                        </View>
                        <View className="flex-row justify-between items-center p-1">
                          <Text className="text-black font-semibold text-lg">
                            ₹ {item.product?.price}
                          </Text>
                          <View className="flex-row rounded-lg">
                            <TouchableOpacity>
                              <Text className="w-5 h-5 rounded-full text-white text-md bg-black text-center">
                                -
                              </Text>
                            </TouchableOpacity>
                            <View>
                              <Text className="w-6 h-5 text-md font-bold text-center text-black">
                                {item.quantity}
                              </Text>
                            </View>
                            <TouchableOpacity>
                              <Text className="w-5 h-5 rounded-full text-white text-md bg-black text-center">
                                +
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>

            {/* price summary */}
            <PriceSummery
              totalPrice={totalPrice}
              shippingCharge={shippingCharge}
              onCheckOutPress={() => {
                navigation.navigate('CheckoutPage', {
                  price: totalPrice + shippingCharge,
                });
              }}
            />
          </View>
        </View>
      )}
      {warning && <WarningModal message={'please login to checkout'} />}
    </View>
  );
}
