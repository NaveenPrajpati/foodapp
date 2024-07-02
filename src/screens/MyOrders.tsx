import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BaseUrl} from '../services/endPoints';
import {useSelector} from 'react-redux';
import VectorIcon from '../components/VectorIcon';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const {isLogin, userData, deliveryAddress} = useSelector(
    state => state.userReducer,
  );
  useEffect(() => {
    console.log('url-', BaseUrl + `/customer/getAllOrders/${userData._id}`);
    axios
      .get(BaseUrl + `/customer/getAllOrders/${userData._id}`)
      .then(res => {
        console.log(res.data);
        setOrders(res.data.orders);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <View>
      <Text>Info</Text>
      <FlatList
        data={orders}
        renderItem={({item, index}) => (
          <View
            className=" p-2 m-2  rounded-2xl bg-slate-50"
            style={{elevation: 1}}>
            <View className=" flex-row justify-between w-full">
              <Text className="text-black">Total Price {item.totalPrice}</Text>
              <Text className="text-black">{item.orderDate}</Text>
            </View>

            {item.dishes.map((it, index) => (
              <View className="flex-row h-20">
                <Image
                  source={{uri: it.dishId.imagePath[0]}}
                  className="w-20 h-full rounded-lg"
                />
                <View>
                  <Text className="text-black">{it.dishId.name}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({});
