import {View, Text, TextInput} from 'react-native';
import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import ButtonMy from '../components/elements/ButtonMy';
import VectorIcon from '../components/VectorIcon';
import InputTag from '../components/elements/InputTag';
import {editUser} from '../services/operations/userOperation';

const AddressList = () => {
  const {userData} = useSelector((state: RootState) => state.userReducer);
  const [showInput, setShowInput] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const inputRef = useRef<TextInput>(null);
  const dispatch = useDispatch();

  function handlePress() {
    if (showInput) {
      dispatch(
        editUser({userId: userData._id, data: {addAddress: newAddress}}),
      );
      setShowInput(false);
    } else {
      setShowInput(true);
      // inputRef.current?.focus();
    }
  }

  function handleDeletePress(item) {
    dispatch(editUser({userId: userData._id, data: {removeAddress: item}}));
  }

  return (
    <View className="bg-white p-2">
      {userData?.address.map((item, index) => (
        <View
          key={index}
          style={{elevation: 2}}
          className=" bg-blue-500 mt-2 p-2 flex-row justify-between">
          <Text className="font-semibold text-white">{item}</Text>
          <VectorIcon
            iconName="delete"
            iconPack="MaterialIcons"
            size={20}
            color="white"
            onPress={() => handleDeletePress(item)}
          />
        </View>
      ))}

      {showInput && (
        <InputTag
          ref={inputRef}
          onChangeText={setNewAddress}
          placeholder={'Add New Address'}
        />
      )}

      <ButtonMy
        textButton={`${showInput ? 'Update Address' : 'Add Address'}`}
        onPress={handlePress}
      />
    </View>
  );
};

export default AddressList;
