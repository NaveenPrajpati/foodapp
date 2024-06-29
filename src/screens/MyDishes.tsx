import {
  FlatList,
  Image,
  StyleSheet,
  Switch,
  Text,
  TextInput,
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

const MyDishes = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const dispatch = useDispatch();
  const {allDishes, status, error} = useSelector(state => state.dashboard);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDishes());
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
      <View className=" flex-row items-center w-full  gap-x-4 p-2">
        <VectorIcon
          iconName="list"
          size={20}
          color="black"
          onPress={() => navigation.toggleDrawer()}
        />
        <TextInput
          placeholder="Search"
          placeholderTextColor={'#facc15'}
          className="border w-4/5 border-yellow-400 rounded-lg bg-yellow-100 p-2"
        />
      </View>
      <View className="  flex-row justify-between items-center">
        <Text
          className={`${
            isEnabled ? ' text-green-500' : ' text-black'
          } text-lg font-bold`}>
          Are We Live?
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#22c55e'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <Text className="text-black text-xl ">MyDishes</Text>
      <FlatList
        data={allDishes}
        numColumns={2}
        contentContainerStyle={{}}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={({item, index}) => (
          <View className=" relative m-1 shadow-lg  shadow-black rounded-md  bg-yellow-400 w-40">
            <Image
              source={{uri: item.imagePath[0]}}
              className=" h-36  rounded-lg mr-1"
            />
            <VectorIcon
              iconName="pencil"
              size={14}
              color="yellow"
              style={{
                position: 'absolute',
                right: -4,
                top: -4,
                backgroundColor: 'orange',
                padding: 2,
                borderRadius: 7,
              }}
            />
            <Text className="text-black font-semibold ml-1">{item.name}</Text>
          </View>
        )}
      />
    </Container>
  );
};

export default MyDishes;

const styles = StyleSheet.create({});
