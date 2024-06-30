import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../components/Container';
import VectorIcon from '../components/VectorIcon';
import InputTag from '../components/elements/InputTag';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {BaseUrl} from '../services/endPoints';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDishes} from '../services/operations/dishOperations';
import SelectDishModal from '../components/modals/SelectDishModal';
import {RootState} from '../redux/store';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import {fastFoodArray} from '../components/constants/sampleData';
import Header from '../components/Header';

const Dashboard = () => {
  const navigation = useNavigation();
  const [showDish, setShowDish] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const dispatch = useDispatch();
  const {allDishes, status, error, loading, addDishStatus} = useSelector(
    state => state.dashboard,
  );

  const {dishes, totalPrice, customer} = useSelector(
    (state: RootState) => state.cartReducer,
  );
  console.log(dishes);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDishes({}));
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <Text>Loading...</Text>;
  }

  if (status === 'failed') {
    return <Text>Error: {error}</Text>;
  }

  return (
    <Container>
      <Header />
      <View className="  flex-row justify-between items-center">
        <Text
          className={`${
            isEnabled ? ' text-green-500' : ' text-black'
          } text-lg font-bold`}>
          Kitch Is Live
        </Text>
      </View>

      {/* search bar */}
      <View className="flex-row justify-between p-1 items-center bg-slate-50 rounded-xl m-1">
        <View className=" rounded-full bg-white h-8 w-8 items-center justify-center">
          <Icon2
            name="search"
            size={20}
            color="black"
            className="rounded-lg"></Icon2>
        </View>
        <TextInput
          onChangeText={nativeEvent => {}}
          onFocus={() => {}}
          placeholder="What do you want to eat?"
          className=" placeholder:text-sm placeholder:font-semibold w-[80%] rounded-lg p-1 "
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
      <View className="  mt-10">
        <View className="flex-row justify-between items-center">
          <Text className="text-black">Categories</Text>
          <TouchableOpacity>
            <Text className=" text-blue-400">See All</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between mt-5 p-2">
          {fastFoodArray.map((item, index) => (
            <View key={index}>
              {item.image}
              <Text>{item.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* feature dish card  */}
      <View className="  mt-10">
        <View className="flex-row justify-between items-center">
          <Text className="text-black">Feature Dish</Text>
          <TouchableOpacity>
            <Text className=" text-blue-400">See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal className=" p-4">
          <TouchableOpacity className="  items-center p-2  rounded-xl bg-slate-100 h-56 w-56 mx-4">
            <Image
              source={require('../assets/images/daal.jpg')}
              className=" h-[80%] w-full rounded-lg"
            />
            <View className="flex-row justify-between p-1">
              <Text className="text-red-600 m-2">rating</Text>
              <Text className="text-red-600 m-2">Slide1</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className=" items-center p-2  rounded-xl bg-slate-50 h-56 w-56 mx-4">
            <Image
              source={require('../assets/images/chole.jpg')}
              className=" h-[80%] w-full rounded-lg"
            />
            <View className="flex-row justify-between p-1">
              <Text className="text-slate-600 m-2">rating</Text>
              <Text className="text-slate-600 m-2">Slide1</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View className=" flex-row flex-wrap  my-5">
        {allDishes?.map((item, index) => (
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
              <Text className="text-black">₹{item.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Text className="text-black text-xl ">MyDishes</Text>
      {/* <FlatList
        data={allDishes}
        numColumns={2}
        contentContainerStyle={{}}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={({item, index}) => (
          <Pressable
            onPress={() => {
              setSelectedItem(item);
              setShowDish(true);
            }}
            className=" relative m-1 shadow-lg  shadow-black rounded-md  bg-yellow-400 w-40">
            <Image
              source={{uri: item.imagePath[0]}}
              className=" h-36  rounded-lg mr-1"
            />
            <Text className="text-black font-semibold ml-1">{item.name}</Text>
          </Pressable>
        )}
      /> */}
      {showDish && (
        <SelectDishModal
          showDish={showDish}
          onPress={() => {}}
          cb={() => {
            setShowDish(false);
          }}
          showProduct={selectedItem}
        />
      )}
    </Container>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
