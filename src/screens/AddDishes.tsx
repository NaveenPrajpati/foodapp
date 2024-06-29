import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import InputTag from '../components/elements/InputTag';
import ButtonMy from '../components/elements/ButtonMy';
import VectorIcon from '../components/VectorIcon';
import ImagePicker from 'react-native-image-crop-picker';
import SelectPickerModal from '../components/modals/SelectPickerModal';
import {
  requestCameraPermission,
  showToastWithGravityAndOffset,
} from '../utils/utilityFunctions';
import SelectTag from '../components/elements/SelectTag';
import {dishCategories, dishStatus, dishTag} from '../utils/constants';
import Container from '../components/Container';
import axios from 'axios';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {BaseUrl} from '../services/endPoints';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addDish} from '../services/operations/dishOperations';

const AddDishes = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [showPickImage, setShowPickImage] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {allDishes, status, error, addDishStatus, addDishError} = useSelector(
    state => state.dashboard,
  );
  const [loading, setLoading] = useState(false);

  const [dishData, setDishData] = useState({
    name: '',
    description: '',
    available: true,
    tags: '',
    category: '',
    price: '',
    discount: '',
  });

  async function handleSubmit() {
    setLoading(true);
    const data = new FormData();
    if (selectedImages) {
      selectedImages.map(item => {
        data.append('photos', {
          name: item.fileName,
          type: item.type,
          uri:
            Platform.OS === 'ios' ? item.uri.replace('file://', '') : item.uri,
        });
      });
    }

    Object.keys(dishData).forEach(key => {
      data.append(key, dishData[key]);
    });

    setLoading(true);
    try {
      const resultAction = await dispatch(addDish(data));
      if (addDish.fulfilled.match(resultAction)) {
        showToastWithGravityAndOffset(resultAction.payload.message);
        navigation.navigate('MyDishes');
      } else {
        showToastWithGravityAndOffset(resultAction.payload);
      }
    } catch (error) {
      showToastWithGravityAndOffset(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleImagePicker(e: string) {
    setShowPickImage(false);
    if (e == 'camera') {
      if (await requestCameraPermission()) {
        // ImagePicker.openCamera({
        //   cropping: true,
        // }).then(image => {
        //   console.log(image);
        //   setSelectedImages(pre => [...pre, image]);
        // });
        launchCamera(
          {
            mediaType: 'photo',
          },
          res => {
            console.log(res);
            setSelectedImages(pre => [...pre, ...res.assets]);
          },
        );
      }
    } else {
      // ImagePicker.openPicker({
      //   cropping: true,
      // }).then(image => {
      //   console.log(image);
      //   setSelectedImages(pre => [...pre, image]);
      // });

      launchImageLibrary(
        {
          mediaType: 'photo',
          selectionLimit: 3,
        },
        res => {
          console.log(res);
          setSelectedImages(pre => [...pre, ...res.assets]);
        },
      );
    }
  }

  if (status === 'loading' || addDishStatus === 'loading' || loading) {
    return <Text>Loading...</Text>;
  }

  if (status === 'failed') {
    return <Text>Error: {error}</Text>;
  }

  return (
    <Container>
      <Text className=" text-black text-xl text-center font-bold">
        Add Dish
      </Text>
      <View className=" ">
        <InputTag
          placeholder="Enter"
          label="Enter Name"
          value={dishData.name}
          onChangeText={e => {
            setDishData(pre => {
              return {...pre, name: e};
            });
          }}
        />
        <InputTag
          placeholder="Enter Description"
          value={dishData.description}
          onChangeText={e => {
            setDishData(pre => {
              return {...pre, description: e};
            });
          }}
        />

        <View className=" my-1">
          <Text className="text-black font-semibold">Select Pictures</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              onPress={() => setShowPickImage(true)}
              className=" w-16 h-16 bg-gray-400 flex-col justify-center items-center rounded-md m-2">
              <VectorIcon iconName="plus" size={20} color="white" />
            </TouchableOpacity>
            {selectedImages?.map((item, index) => (
              <View
                key={index}
                className=" w-16 h-16 bg-gray-400 flex-col justify-center items-center rounded-md relative m-2">
                <VectorIcon
                  iconName="close"
                  size={14}
                  color="white"
                  style={{
                    position: 'absolute',
                    right: -5,
                    top: -5,
                    zIndex: 1,
                    backgroundColor: 'gray',
                    padding: 2,
                    borderRadius: 7,
                  }}
                  onPress={() => {
                    const arr = selectedImages.filter(
                      it => it.path != item.path,
                    );
                    setSelectedImages(arr);
                  }}
                />
                <Image
                  source={{uri: item?.uri}}
                  className="w-16 h-16 object-contain rounded-md"
                />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* <InputTag
          placeholder="Enter Description"
          value={dishData.description}
          onChangeText={e => {
            setDishData(pre => {
              return {...pre, description: e};
            });
          }}
        /> */}

        <SelectTag
          label="Select Status"
          placeholder={'Status'}
          onSelect={selectedItem => {
            setDishData(pre => {
              return {...pre, available: selectedItem};
            });
          }}
          data={dishStatus}
        />
        <SelectTag
          label="Select Tags"
          placeholder={'Select Tags'}
          onSelect={selectedItem => {
            setDishData(pre => {
              return {...pre, tags: selectedItem};
            });
          }}
          data={dishTag}
        />
        <SelectTag
          label="Select Category"
          placeholder={'Select Category'}
          onSelect={selectedItem => {
            setDishData(pre => {
              return {...pre, category: selectedItem};
            });
          }}
          data={dishCategories}
        />

        <InputTag
          label="Price"
          placeholder="Price"
          value={dishData.price}
          onChangeText={e => {
            setDishData(pre => {
              return {...pre, price: e};
            });
          }}
        />
        <InputTag
          label="Discount"
          placeholder="Discount"
          value={dishData.discount}
          onChangeText={e => {
            setDishData(pre => {
              return {...pre, discount: e};
            });
          }}
        />
      </View>
      <ButtonMy textButton="Add" onPress={handleSubmit} />
      <SelectPickerModal
        modalVisible={showPickImage}
        setModalVisible={setShowPickImage}
        handlePicker={handleImagePicker}
      />
    </Container>
  );
};

export default AddDishes;
