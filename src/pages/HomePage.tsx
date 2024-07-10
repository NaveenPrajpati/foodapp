import {
  View,
  Text,
  Image,
  Modal,
  Button,
  TouchableOpacity,
  DrawerLayoutAndroid,
  ScrollView,
  ToastAndroid,
  TextInput,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  Dimensions,
  Pressable,
  Alert,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setCartItem, setWishItem} from '../redux/slices/cartSlice';
import {
  setIsSearch,
  setSearchParam,
  setdrawer,
} from '../redux/slices/navbarSlice';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fastFoodArray} from '../components/constants/sampleData';
import firestore from '@react-native-firebase/firestore';
import ItemModal from '../components/ItemModal';
import Navbar from '../components/Header';
import {setLogin, setUserData} from '../redux/slices/customerSlice';

export default function HomePage({navigation}) {
  const [products, setProducts] = useState([]);
  const [showProduct, setShowProduct] = useState();
  const [filterProduct, setFilterProduct] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [count, setCount] = useState(1);

  const {isSearch, searchParam, openDrawer} = useSelector(
    state => state.navbarReducer,
  );
  const {wishItem} = useSelector(state => state.cartReducer);
  const {userData, isLogin} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const drawer = useRef();

  const handledecrease = () => {
    if (count > 1) setCount(count - 1);
  };
  const handleincrease = () => {
    setCount(count + 1);
  };

  async function getAllFoods() {
    try {
      const user = await firestore()
        .collection('Foods')
        .where('category', '==', 'Fast Food')
        .get();
      const productsData = user.docs.map(doc => {
        const data = doc.data();
        const id = doc.id;
        return {id, ...data};
      });

      // console.log(productsData)
      setProducts(productsData);
    } catch (error) {
      console.log(error);
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');
      jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(jsonValue);
      dispatch(setUserData(jsonValue));
      setLogin(true);
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    if (!isLogin) getData();

    getAllFoods();
  }, []);

  useEffect(() => {
    if (openDrawer) drawer.current.openDrawer();
    else drawer.current.closeDrawer();
  }, [openDrawer]);

  return (
    <ScrollView className="flex:1 p-5 rounded-b-3xl bg-white flex-1"></ScrollView>
  );
}
