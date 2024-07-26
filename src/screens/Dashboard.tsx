import {
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Container from '../components/Container';
import VectorIcon from '../components/VectorIcon';
import InputTag from '../components/elements/InputTag';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import {BaseUrl, socket} from '../services/endPoints';
import {useDispatch, useSelector} from 'react-redux';

import SelectDishModal from '../components/modals/SelectDishModal';
import {RootState} from '../redux/store';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import {fastFoodArray, featureDish} from '../components/constants/sampleData';
import Header from '../components/Header';
import {formatDate, onDisplayNotification} from '../utils/utilityFunctions';
import {fetchKitchens} from '../services/operations/dishOperations';

const Dashboard = () => {
  const navigation = useNavigation();
  const [showDish, setShowDish] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [isEnabled, setIsEnabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [openingTime, setOpeningTime] = useState(new Date());
  const [selectedKitchen, setSelectedKitchen] = useState(0);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const dispatch = useDispatch();
  const {allDishes, status, error, loading, addDishStatus, allKitchens} =
    useSelector((state: RootState) => state.dashboard);

  const {dishes, totalPrice, customer} = useSelector(
    (state: RootState) => state.cartReducer,
  );
  const {isLogin, userData, deliveryAddress} = useSelector(
    (state: RootState) => state.userReducer,
  );

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      socket.on('connect', () => {
        console.log('Connected to WebSocket server');
      });

      socket.emit('joinRoom', userData._id);

      socket.on('newDishAdded', data => {
        console.log(`${data.dishName} Added by ${data.kitchenname}`);
        onDisplayNotification({
          title: data.dishName,
          body: `Added by ${data.kitchenname}`,
        });
      });

      socket.on('notification', notification => {
        console.log(notification);
        onDisplayNotification({
          title: notification.title,
          body: notification.body,
        });
      });

      socket.on('updatedOrderStatus', data => {
        onDisplayNotification({
          title: 'Order Status',
          body: `Change to ${data.status}`,
        });
      });
    }

    return () => {
      if (isFocused) {
        socket.off('connect');
      }
    }; // Cleanup on unmount
  }, [isFocused, socket]);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchKitchens({}));
      return () => {
        navigation.closeDrawer();
      };
    }, []),
  );

  if (status === 'loading') {
    return <Text>Loading...</Text>;
  }

  if (status === 'failed') {
    return <Text>Error: {error}</Text>;
  }

  // console.log(JSON.stringify(allKitchens, null, 2));

  return (
    <Container>
      <Header />
      <View className="  flex-row justify-between items-center">
        <Text
          className={`${
            isEnabled ? ' text-green-500' : ' text-black'
          } text-lg font-bold`}>
          Kitch Is {isOpen ? 'Open' : 'Closed'}
        </Text>
        {!isOpen && (
          <Text className="text-black">Open at: {formatDate(openingTime)}</Text>
        )}
      </View>

      {/* search bar */}
      <View className="flex-row justify-between p-1 items-center bg-slate-50 rounded-xl m-1">
        <View
          className=" rounded-full bg-white  items-center justify-center p-1"
          style={styles.imageContainer}>
          <VectorIcon
            iconName="search"
            iconPack="Feather"
            color="gray"
            size={20}
          />
        </View>
        <TextInput
          onChangeText={nativeEvent => {
            setSearchQuery(nativeEvent);
          }}
          onFocus={() => {}}
          placeholder="What do you want to eat?"
          placeholderTextColor={'gray'}
          className="text-black placeholder:text-sm placeholder:font-semibold w-[80%] rounded-lg p-1 "
        />
        <TouchableOpacity
          onPress={() => {
            // dispatch(setIsSearch(false));
            // dispatch(setSearchParam(''));
          }}
          className="rounded-full">
          <Icon3 name="menu-fold" size={20} color="black"></Icon3>
        </TouchableOpacity>
      </View>

      {/* categorie card */}
      <View className="  mt-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-black font-semibold text-lg">Kitchens</Text>
          <TouchableOpacity>
            <Text className=" text-blue-400 font-semibold ">See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="mt-1 p-2 gap-x-12">
          {allKitchens?.map((item, index) => (
            <Pressable
              onPress={() => setSelectedKitchen(index)}
              key={index}
              className=" items-center">
              <View
                className=" p-1 bg-white rounded-full"
                style={styles.imageContainer}>
                <Image
                  source={{uri: item?.kitchenImg}}
                  className="h-12 w-12 rounded-full"
                />
              </View>
              <Text className="font-semibold mt-3 text-black">
                {item?.kitchenname}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* feature dish card  */}
      <View className="  mt-5">
        <View className="flex-row justify-between items-center">
          <Text className="text-black text-lg font-semibold">Feature Dish</Text>
          <TouchableOpacity>
            <Text className=" text-blue-400 font-semibold">See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className=" py-2">
          {allKitchens[selectedKitchen]?.menuItems
            ?.filter(it => it.tags.includes('featured'))
            ?.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{elevation: 1}}
                className="  items-center p-2  rounded-xl bg-white mx-2">
                <Image
                  source={{uri: item.imagePath[0]}}
                  className=" rounded-2xl h-32 w-52"
                />
                <View className=" flex-row gap-x-20">
                  <Text className="text-slate-400 text-xs">{item.name}</Text>
                  <Text className="text-slate-400 text-xs">Veg</Text>
                </View>
                <View className="flex-row justify-between gap-x-3  border-t  border-t-slate-200">
                  <Text className="text-slate-600 text-xs">
                    {item.makingTime} min
                  </Text>
                  <Text className="text-yellow-500 text-xs">
                    Rating: {item.rating}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>

      <Text className="text-black text-lg font-semibold mt-5">MyDishes</Text>

      <View className=" flex-row flex-wrap">
        {allKitchens[selectedKitchen]?.menuItems
          ?.filter(it => it.name.startsWith(searchQuery))
          .map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedItem(item);
                setShowDish(true);
              }}
              key={index}
              className="shadow-md flex-grow shadow-slate-400 rounded-xl p-2 bg-white w-[45%] m-1">
              <Image
                source={{uri: item.imagePath[0]}}
                className="h-28 w-full rounded-xl"
              />
              <View className="flex-row justify-between">
                <Text className="text-black">{item.name}</Text>
                <Text className="text-black">
                  ₹{item?.availableOptions[0]?.price}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
      </View>

      {showDish && (
        <SelectDishModal
          showDish={showDish}
          onPress={() => {}}
          cb={() => {
            setShowDish(false);
          }}
          item={selectedItem}
        />
      )}
    </Container>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  imageContainer: {
    ...Platform.select({
      android: {
        elevation: 6, // Adjust the elevation for Android
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    }),
  },
});
