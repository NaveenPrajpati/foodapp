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
import CardPageCard from '../components/CartPageCard';

export default function CartPage() {
  const [warning, setWarning] = useState(false);
  const {dishes} = useSelector(state => state.cartReducer);
  const dispatch = useDispatch();
  const {isLogin} = useSelector(state => state.userReducer);

  const [shippingCharge, setShippingCharge] = useState(50);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigation = useNavigation();

  // console.log(JSON.stringify(dishes, null, 2));

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < dishes.length; i++) {
      total =
        total +
        dishes[i].quantity *
          dishes[i].product.availableOptions[dishes[i]?.option]?.price;
    }
    setTotalPrice(total);
  }, [dishes]);

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
                renderItem={({item, index}) => (
                  <CardPageCard item={item} index={index} />
                )}
              />
            </View>

            {/* price summary */}
            <PriceSummery />
          </View>
        </View>
      )}
      {warning && <WarningModal message={'please login to checkout'} />}
    </View>
  );
}
