import {
  FlatList,
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {BaseUrl, socket} from '../services/endPoints';
import {useSelector} from 'react-redux';
import VectorIcon from '../components/VectorIcon';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {formatDate} from '../utils/utilityFunctions';
import {RootState} from '../redux/store';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [expandDetails, setExpandDetails] = useState('');
  const {isLogin, userData, deliveryAddress} = useSelector(
    (state: RootState) => state.userReducer,
  );

  function getOrders() {
    axios
      .get(BaseUrl + `/customer/getAllOrders/${userData._id}`)
      .then(res => {
        // console.log(res.data);
        setOrders(res.data.orders);
      })
      .catch(err => console.log(err));
  }

  useFocusEffect(
    useCallback(() => {
      getOrders();
      socket.emit('join', 'customer', {customerId: userData._id});
      const handleOrderStatusUpdate = () => {
        getOrders();
      };

      socket.on('updatedOrderStatus', handleOrderStatusUpdate);

      return () => {
        socket.off('updatedOrderStatus', handleOrderStatusUpdate);
      };
    }, [socket]),
  );

  return (
    <View>
      <FlatList
        data={orders}
        renderItem={({item, index}) => (
          <View
            className=" p-2 m-2  rounded-2xl bg-slate-50"
            style={{elevation: 1}}>
            <View className=" ">
              <View className=" flex-row justify-between w-full items-center">
                <Text className="text-black text-lg font-semibold">
                  Price: ₹{item.totalPrice}
                </Text>
                <Text className="text-black font-semibold">
                  {formatDate(item.orderDate)}
                </Text>
              </View>

              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-black">
                    Total items: {item.dishes.length}
                  </Text>
                  <Text className="text-black font-semibold">
                    {item.status}
                  </Text>
                </View>
                <VectorIcon
                  iconName={
                    expandDetails == index.toString()
                      ? 'keyboard-arrow-up'
                      : 'keyboard-arrow-down'
                  }
                  iconPack="MaterialIcons"
                  size={30}
                  color="black"
                  onPress={() =>
                    setExpandDetails(pre => {
                      if (pre) return '';
                      else return index.toString();
                    })
                  }
                />
              </View>
            </View>

            {expandDetails == index.toString() && (
              <View>
                {item.dishes.map((it, index) => (
                  <View key={index} className="flex-row gap-x-2 h-12 mt-1">
                    <Image
                      source={{uri: it.dishId.imagePath[0]}}
                      className="w-12 h-full rounded-lg"
                    />
                    <View>
                      <Text className="text-black text-lg font-semibold">
                        {it.dishId.name}
                      </Text>
                      <Text className="text-black  font-semibold">
                        ₹{it.dishId.price} x {it.quantity}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({});
