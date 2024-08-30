import {
  FlatList,
  Image,
  LayoutAnimation,
  Pressable,
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
import MapView from 'react-native-maps';
import SelectTag from '../components/elements/SelectTag';
import CancelModal from '../components/modals/CancelModal';
import {updateOrder} from '../services/operations/orderOperations';

const MyOrders = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [showCancel, setShowCancel] = useState(false);
  const navigation = useNavigation();
  const [expandDetails, setExpandDetails] = useState('');
  const [trackVisible, setTrackVisible] = useState(false);
  const {isLogin, userData} = useSelector(
    (state: RootState) => state.userReducer,
  );

  const {allOrders} = useSelector((state: RootState) => state.orders);
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

  // console.log(JSON.stringify(allOrders, null, 2));

  return (
    <View>
      <FlatList
        data={allOrders}
        ListEmptyComponent={() => (
          <View className=" justify-center items-center ">
            <Text className="text-black mt-10 text-lg font-medium">
              You have not order anything
            </Text>
          </View>
        )}
        renderItem={({item, index}) => (
          <View
            className=" p-2 m-2  rounded-2xl bg-slate-50"
            style={{elevation: 1}}>
            <View className=" ">
              <View className=" flex-row justify-between w-full items-center">
                <Text
                  className={`${
                    item.status == 'delivered'
                      ? 'text-green-400'
                      : item.status == 'pending'
                      ? 'text-red-400'
                      : item.status == 'preparing'
                      ? 'text-yellow-400'
                      : 'text-black'
                  } font-semibold text-lg`}>
                  {item.status} ({item.kitchen.kitchenname})
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
                    <Text className=" text-sm text-black">
                      Price: ₹{item.totalPrice}
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
                {item.status != 'delivered' && item.status != 'cancelled' && (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ChatScreen', {
                        room: item.kitchen,
                        item,
                      });
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
                        source={{uri: it.dishId.imagePath}}
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

            <View className=" flex-row space-x-2 justify-end items-end">
              {item.status == 'shipped' && (
                <Pressable
                  onPress={() => {
                    navigation.navigate('MapPicker', {
                      tracking: true,
                      pickup: item.kitchen.address.location.coordinates,
                      deliveryBoy:
                        item.deliveryDetails.deliveryMan.currentLocation
                          .coordinates,
                      destination:
                        item.customer.address[item.shippingAddress].location
                          .coordinates,
                    });
                  }}
                  className=" flex-row items-center space-x-1 p-1">
                  <VectorIcon
                    iconName="location-arrow"
                    size={20}
                    color="black"
                  />
                  <Text className=" text-black font-semibold">Track</Text>
                </Pressable>
              )}

              {item.status != 'cancelled' && (
                <TouchableOpacity
                  onPress={() => setShowCancel(true)}
                  className=" p-1">
                  <Text className=" text-red-500 font-semibold">Cancel</Text>
                </TouchableOpacity>
              )}
            </View>

            {showCancel && (
              <CancelModal
                onChangeText={e => setReview(e)}
                modalVisible={showCancel}
                setModalVisible={setShowCancel}
                onPress={() => {
                  dispatch(
                    updateOrder({
                      id: item._id,
                      data: {review, status: 'cancelled', role: 'customer'},
                    }),
                  );
                  setShowCancel(false);
                }}
              />
            )}
          </View>
        )}
      />
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
