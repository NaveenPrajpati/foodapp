import {
  FlatList,
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import axios, {all} from 'axios';
import {BaseUrl, socket, updataOrderApi} from '../services/endPoints';
import {useDispatch, useSelector} from 'react-redux';
import VectorIcon from '../components/VectorIcon';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {formatDate, onDisplayNotification} from '../utils/utilityFunctions';
import {RootState} from '../redux/store';
import StarRating from 'react-native-star-rating-widget';
import {fetchOrders} from '../services/operations/dishOperations';
import InputTag from '../components/elements/InputTag';
import ButtonMy from '../components/elements/ButtonMy';

const MyOrders = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const navigation = useNavigation();
  const [expandDetails, setExpandDetails] = useState('');
  const {isLogin, userData, allOrders} = useSelector(
    (state: RootState) => state.userReducer,
  );
  const dispatch = useDispatch();
  const debounceTimeout = useRef(null);

  function getOrders() {
    console.log('getting order..');
    dispatch(fetchOrders({id: userData._id}));
  }

  function updateRatingReview(orderId) {
    if (rating != 0)
      axios
        .patch(updataOrderApi(orderId), {rating, review})
        .then(res => {
          setExpandDetails('');
          getOrders();
        })
        .catch(err => {
          console.log(err);
        });
  }

  useFocusEffect(
    useCallback(() => {
      getOrders();
      socket.emit('join', 'customer', {customerId: userData._id});
      const handleOrderStatusUpdate = (data: {status: any}) => {
        onDisplayNotification(data);
        getOrders();
      };

      socket.on('updatedOrderStatus', handleOrderStatusUpdate);

      return () => {
        socket.off('updatedOrderStatus', handleOrderStatusUpdate);
      };
    }, []),
  );

  return (
    <View>
      <FlatList
        data={allOrders}
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

                  <View className=" flex-row items-center space-x-2 ">
                    <Text
                      className={`${
                        item.status == 'delivered'
                          ? 'text-green-400'
                          : item.status == 'pending'
                          ? 'text-red-400'
                          : item.status == 'preparing'
                          ? 'text-yellow-400'
                          : 'text-black'
                      } font-semibold `}>
                      {item.status}
                    </Text>
                    {item.rating != 0 && (
                      <View className=" flex-row items-center space-x-1">
                        <VectorIcon iconName="star" color="#facc15" size={15} />
                        <Text className=" text-black  font-semibold ">
                          <Text className=" text-yellow-500 font-bold">
                            {item?.rating}
                          </Text>
                          /5
                        </Text>
                      </View>
                    )}
                  </View>
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

              {item.status == 'delivered' && item.rating == 0 && (
                <View className="">
                  <InputTag
                    placeholder="write review"
                    onChangeText={e => setReview(e)}
                  />
                  <View className=" flex-row items-center justify-between space-x-2">
                    <StarRating
                      rating={rating}
                      onChange={setRating}
                      maxStars={5}
                      starSize={20}
                      starStyle={{backgroundColor: '', marginHorizontal: 2}}
                      style={{backgroundColor: ''}}
                    />
                    <ButtonMy
                      onPress={() => updateRatingReview(item._id)}
                      textButton="submit"
                    />
                  </View>
                </View>
              )}
            </View>

            {expandDetails == index.toString() && (
              <>
                {item.status != 'delivered' && (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ChatScreen', {room: item.kitchen});
                    }}
                    className=" flex-row items-center justify-end space-x-1">
                    <VectorIcon
                      iconName="message"
                      iconPack="Entypo"
                      color="black"
                      size={20}
                    />
                    <Text className=" text-blue-400 font-medium">
                      Chat with kitchen
                    </Text>
                  </TouchableOpacity>
                )}
                <View className="">
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
                          {it.dishId.availableOptions[it.option]?.name} ₹
                          {it.dishId.availableOptions[it.option]?.price} x{' '}
                          {it.quantity}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({});
