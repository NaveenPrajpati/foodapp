import {
  View,
  Text,
  Modal,
  Alert,
  Pressable,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {addDish, setTotalPrice, updateDish} from '../../redux/slices/cartSlice';
import VectorIcon from '../VectorIcon';
import Toast from 'react-native-toast-message';
import {showToast} from '../../utils/utilityFunctions';
import CheckBox from '@react-native-community/checkbox';

type modalProp = {
  onPress: () => void;
  showDish: boolean;
  cb: () => void;
  item: any;
};

export default function SelectDishModal({
  item,
  onPress,
  showDish,
  cb,
}: modalProp) {
  const [quantity, setQuantity] = useState(1);
  const [editIndex, setEditIndex] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [checkBox, setCheckBox] = useState(0);

  const {dishes, totalPrice, customer} = useSelector(
    (state: RootState) => state.cartReducer,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dishes.map((it, index) => {
      if (item._id == it.product._id) {
        setIsEdit(true);
        setQuantity(it.quantity);
        setCheckBox(it.option);
        setEditIndex(index);
      }
    });
  }, []);

  function handleAdd() {
    if (isEdit) {
      dispatch(
        updateDish({
          index: editIndex,
          dish: {
            product: item,
            quantity,
            option: checkBox,
          },
        }),
      );
    } else {
      dispatch(addDish({product: item, quantity, option: checkBox}));
    }
    showToast('info', 'Item added to cart');
    setQuantity(1);
    cb();
  }
  console.log(JSON.stringify(item, null, 2));
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={showDish}
      onRequestClose={cb}>
      <View className="bg-black px-1 pt-1 justify-between flex-1 ">
        <View className="rounded-b-3xl bg-white relative flex-1">
          <Image source={{uri: item?.imagePath}} className="w-full h-1/2" />
          <View className="p-2">
            <View className="flex-row justify-between  mt-4 items-center">
              <Text className="text-black text-lg font-medium capitalize">
                {item?.name}
              </Text>
              <View className="flex flex-row items-center rounded-lg mr-5">
                <TouchableOpacity
                  onPress={() => {
                    setQuantity(prev => (prev > 1 ? prev - 1 : prev));
                  }}
                  className=" bg-gray-200 h-8 w-8 justify-center items-center rounded-l-md">
                  <VectorIcon iconName="minus" color="black" size={10} />
                </TouchableOpacity>
                <View className="w-12 h-12 justify-center items-center bg-pink-200 rounded-md">
                  <Text className=" text-xl font-semibold  text-black">
                    {quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setQuantity(pre => pre + 1);
                  }}
                  className=" bg-gray-200 h-8 w-8 justify-center items-center rounded-r-md">
                  <VectorIcon iconName="plus" color="black" size={10} />
                </TouchableOpacity>
              </View>
            </View>
            {/* <Text className="text-black">Price: ₹{item?.price}</Text> */}

            <Text className="text-black text-sm  ">{item?.description}</Text>

            {true && (
              <View>
                <Text className="text-black text-lg font-medium">
                  Available options
                </Text>
                {item.availableOptions.map((it, index) => (
                  <View
                    key={index}
                    className="flex-row items-center gap-x-2 mt-1">
                    <CheckBox
                      className=" text-red-400"
                      tintColor="black"
                      style={{backgroundColor: 'black', borderRadius: 2}}
                      disabled={false}
                      value={checkBox == index}
                      onValueChange={newValue => {
                        setCheckBox(index);
                      }}
                    />
                    <Text className="text-gray-600 font-semibold">
                      {it.name} For ₹{it.price}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
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
            ₹{item?.availableOptions[checkBox]?.price * quantity}
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
