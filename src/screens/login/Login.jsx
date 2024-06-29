import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  TouchableOpacityBase,
  ToastAndroid,
  Switch,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import { setLogin, setUserData } from '../redux/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const {isLogin} = useSelector(state => state.userReducer);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    if (isEnabled) console.log('public');
    else console.log('admin');
  };

  const dispatch = useDispatch();

  const handleLogin = async () => {
    // const user = await firestore().collection(isEnabled ? 'Admin' : 'Users').where('email', '==', email).get();
    // console.log(user.docs[0]._data)
    // let data = user.docs[0]._data
    // let id = user.docs[0].id
    // console.log(id)
    // if (password == data.password) {
    //   dispatch(setUserData({
    //     id: id,
    //     email: data.email,
    //     name: data.name,
    //     role: data.role,
    //     phone: data.phone,
    //     address: data.address
    //   }))
    //   const jsonValue = JSON.stringify({
    //     id: id,
    //     email: data.email,
    //     name: data.name,
    //     role: data.role,
    //     phone: data.phone,
    //     address: data.address
    //   })
    //   AsyncStorage.setItem('userData', jsonValue)
    //   dispatch(setLogin(true))
    //   console.log('Done.')
    //   ToastAndroid.show('login success', ToastAndroid.BOTTOM)
    //   navigation.goBack()
    // }
    // ToastAndroid.show('login fail', ToastAndroid.BOTTOM)
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className=" rounded-xl  p-10  flex-1 bg-white items-center ">
        <View>
          <Image source={''} alt="image" />
          <Text className="text-lg text-black font-bold mb-1">Login</Text>
          <Text className="text-black">
            Here you can login to your account{' '}
          </Text>
        </View>

        {/* <View className="flex-row items-center p-2 rounded-2xl mb-5  bg-slate-100">
          <Text className="font-semibold">
            {isEnabled ? 'Admin' : 'Public'}
          </Text>

          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View> */}

        <View className="flex-row items-center p-2 rounded-2xl mb-5  bg-slate-100">
          <View className="rounded-full justify-center items-center bg-white h-8 w-8">
            <Icon name="lock" size={20} color={'black'} />
          </View>
          <TextInput
            className="rounded-md  p-1  w-full text-lg"
            placeholder="Email"
            onChangeText={nativeEvent => setEmail(nativeEvent)}></TextInput>
        </View>

        <TouchableOpacity className="justify-end mb-1 flex-row w-full">
          <Text className="text-blue-600">forget password?</Text>
        </TouchableOpacity>

        <View className="flex-row items-center p-2 rounded-2xl mb-5  bg-slate-100">
          <View className="rounded-full justify-center items-center bg-white h-8 w-8">
            <Icon name="lock" size={20} color={'black'} />
          </View>
          <TextInput
            className="rounded-md  p-1  w-full text-lg"
            placeholder="Password"
            onChangeText={nativeEvent => setPassword(nativeEvent)}></TextInput>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          className="justify-end mb-5 flex-row w-full">
          <Text className="text-blue-600">not have account?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogin}
          className="bg-black mb-5 p-2 rounded-3xl w-[60%] ">
          <Text className="text-white text-lg font-semibold text-center">
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
