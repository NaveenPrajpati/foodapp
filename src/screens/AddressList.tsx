import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import ButtonMy from '../components/elements/ButtonMy';
import VectorIcon from '../components/VectorIcon';
import InputTag from '../components/elements/InputTag';
import {editUser} from '../services/operations/userOperation';
import Geolocation from '@react-native-community/geolocation';
import {Formik} from 'formik';
import MapPicker from '../components/MapPicker';
import {useNavigation} from '@react-navigation/native';
import {requestLocationPermission} from '../utils/utilityFunctions';

const AddressList = ({route}) => {
  const address = route.params?.address;
  const navigation = useNavigation();
  console.log(JSON.stringify(address, null, 2));

  const {userData} = useSelector((state: RootState) => state.userReducer);
  const [showInput, setShowInput] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [pickFromMap, setPickFromMap] = useState(false);
  const dispatch = useDispatch();
  const [location, setLocation] = useState(
    {longitude: parseFloat(address?.lon), latitude: parseFloat(address?.lat)} ||
      null,
  );

  function handlePress(values) {
    const data = {
      address: values.address,
      city: values.city,
      state: values.state,
      zip: values.zip,
      location: {
        coordinates: [location.longitude, location.latitude],
      },
    };

    if (showInput) {
      dispatch(editUser({userId: userData._id, data: {addAddress: data}}));
      setShowInput(false);
    } else {
      setShowInput(true);
      // inputRef.current?.focus();
    }
  }

  function handleDeletePress(id) {
    dispatch(
      editUser({userId: userData._id, data: {removeAddress: {_id: id}}}),
    );
  }

  const handleLocationConfirmed = region => {
    setLocation(region);
    // You can now save this location or use it as needed
  };

  return (
    <View className="bg-white p-2 flex-1">
      {userData?.address?.length != 0 && (
        <>
          {userData?.address.map((item, index) => (
            <View
              key={index}
              style={{elevation: 2}}
              className=" bg-blue-500 mt-2 p-2 flex-row justify-between">
              <Text className="font-semibold text-white">{item.address}</Text>
              <VectorIcon
                iconName="delete"
                iconPack="MaterialIcons"
                size={20}
                color="white"
                onPress={() => handleDeletePress(item._id)}
              />
            </View>
          ))}
        </>
      )}

      {showInput && (
        <Formik
          initialValues={{
            address: address?.address?.suburb || '',
            city: address?.address?.city || '',
            state: address?.address?.state || '',
            zip: address?.address?.postcode || '',
          }}
          // validationSchema={LoginSchema}
          onSubmit={handlePress}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
          }) => (
            <View>
              <InputTag
                onChangeText={handleChange('address')}
                placeholder={'Add New Address'}
                onBlur={handleBlur('address')}
                value={values.address}
              />
              {touched.address && errors.address && (
                <Text className=" text-red-600">{errors.address}</Text>
              )}
              <InputTag
                onChangeText={handleChange('city')}
                placeholder={'City'}
                onBlur={handleBlur('city')}
                value={values.city}
              />
              {touched.city && errors.city && (
                <Text className=" text-red-600">{errors.city}</Text>
              )}
              <InputTag
                onChangeText={handleChange('state')}
                placeholder={'State'}
                onBlur={handleBlur('state')}
                value={values.state}
              />
              {touched.state && errors.state && (
                <Text className=" text-red-600">{errors.state}</Text>
              )}
              <InputTag
                onChangeText={handleChange('zip')}
                placeholder={'Pincode'}
                onBlur={handleBlur('zip')}
                value={values.zip}
              />
              {touched.zip && errors.zip && (
                <Text className=" text-red-600">{errors.zip}</Text>
              )}

              <ButtonMy
                textButton={`pick from map`}
                onPress={() => {
                  requestLocationPermission();
                  navigation.navigate('MapPicker');
                }}
              />
              <ButtonMy
                textButton={`${'Add Address'}`}
                onPress={handleSubmit}
              />
            </View>
          )}
        </Formik>
      )}

      {!showInput && (
        <ButtonMy
          textButton={`${'Add Address'}`}
          onPress={() => setShowInput(true)}
        />
      )}
    </View>
  );
};

export default AddressList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  locationContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
});
