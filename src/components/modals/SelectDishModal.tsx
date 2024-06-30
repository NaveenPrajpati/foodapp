import {
  View,
  Text,
  Modal,
  Alert,
  Pressable,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {addDish, setTotalPrice} from '../../redux/slices/cartSlice';
import VectorIcon from '../VectorIcon';

type modalProp = {
  onPress: () => void;
  showDish: boolean;
  cb: () => void;
  showProduct: any;
};

export default function SelectDishModal({
  showProduct,
  onPress,
  showDish,
  cb,
}: modalProp) {
  const [quantity, setQuantity] = useState(1);
  const {dishes, totalPrice, customer} = useSelector(
    (state: RootState) => state.cartReducer,
  );

  const dispatch = useDispatch();

  function handleAdd() {
    dispatch(addDish({product: showProduct, quantity}));
    ToastAndroid.show('dist added', ToastAndroid.SHORT);
    setQuantity(1);
    cb();
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={showDish}
      onRequestClose={cb}>
      <View className="bg-black px-1 pt-1 justify-between flex-1 ">
        <View className="rounded-b-3xl bg-white relative flex-1">
          <Image
            source={{uri: showProduct?.imagePath[0]}}
            className="w-full h-1/2"
          />

          <View className="flex-row justify-between px-2 mt-4">
            <Text className="text-black">{showProduct?.name}</Text>
            <View className="flex flex-row items-center rounded-lg mr-5">
              <TouchableOpacity
                onPress={() => {
                  setQuantity(prev => (prev > 1 ? prev - 1 : prev));
                }}>
                <Text className="w-6 h-6 text-md bg-slate-200 text-center text-black">
                  -
                </Text>
              </TouchableOpacity>
              <View className="w-10 h-10 justify-center items-center bg-pink-200 ">
                <Text className=" text-lg font-semibold  text-black">
                  {quantity}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setQuantity(pre => pre + 1);
                }}>
                <Text className="w-6 h-6 text-md bg-slate-200 text-center text-black">
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text className="text-black">Price: ₹{showProduct?.price}</Text>

          <Text className="text-black text-lg font-semibold">
            {showProduct?.description}
          </Text>

          <Pressable className="absolute right-2 top-2 " onPress={cb}>
            <VectorIcon
              iconName="close"
              size={22}
              color="red"
              // style={{position: 'absolute'}}
            />
          </Pressable>
        </View>

        <View className="flex-row justify-between items-center bg-black px-5 py-1  h-20">
          <Text className="text-lg font-semibold text-white">
            ₹{showProduct?.price * quantity}
          </Text>
          <TouchableOpacity
            onPress={handleAdd}
            className="bg-green-400 mb-5 p-2 rounded-3xl ">
            <Text className="text-white text-lg font-semibold text-center">
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
