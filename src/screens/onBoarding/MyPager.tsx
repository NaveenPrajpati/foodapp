import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Button, Image, Pressable} from 'react-native';
import PagerView from 'react-native-pager-view';
import {useDispatch} from 'react-redux';
import {setOnBoardingStatus} from '../../redux/slices/customerSlice';
import VectorIcon from '../../components/VectorIcon';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const MyPager = ({navigation}) => {
  const dispatch = useDispatch();
  const duration = 2000;
  const defaultAnim = useSharedValue(50);
  const linear = useSharedValue(100);

  const animatedDefault = useAnimatedStyle(() => ({
    transform: [{translateY: defaultAnim.value}],
  }));
  const animatedChanged = useAnimatedStyle(() => ({
    transform: [{translateX: linear.value}],
  }));
  useEffect(() => {
    linear.value = withRepeat(
      withTiming(-linear.value, {
        duration,
        easing: Easing.linear,
      }),
      -1,
      true,
    );
    defaultAnim.value = withRepeat(
      withTiming(-defaultAnim.value, {
        duration,
      }),
      -1,
      true,
    );
  }, []);

  const handleOnboardingFinish = () => {
    dispatch(setOnBoardingStatus(true));
    navigation.navigate('Login');
  };
  return (
    <View style={{flex: 1}}>
      <PagerView style={styles.viewPager} initialPage={0} useNext={false}>
        <View className="flex-1 relative" key="1">
          <Image
            source={require('../../assets/images/screen1.jpg')}
            className=" w-full h-full"
          />
          <Animated.View
            style={animatedDefault}
            className=" absolute text-lg items-center w-full h-full justify-end bottom-16 ">
            <Text className="text-red-500 font-bold bg-white py-2 px-8 text-2xl rounded-full opacity-70">
              Enjoy you favourite dishes
            </Text>
            <Animated.View
              style={animatedChanged}
              className={' p-2 rounded-md bg-white'}>
              <VectorIcon iconName="arrow-left" size={25} color="red" />
            </Animated.View>
          </Animated.View>
        </View>
        <View className="flex-1 relative" key="2">
          <Image
            source={require('../../assets/images/screen2.jpg')}
            className=" w-full h-full"
          />
          <View className=" absolute text-lg items-center w-full h-full justify-end bottom-16 ">
            <Text className="text-white font-bold bg-black/80 py-2 px-8 text-2xl rounded-full opacity-50">
              Enjoy you favourite dishes
            </Text>
            <Text className="text-black font-bold bg-white py-2 px-8 text-2xl rounded-full opacity-50 mt-2">
              <VectorIcon iconName="arrow-left" size={25} color="blue" /> Swipe{' '}
              <VectorIcon iconName="arrow-right" size={25} color="blue" />
            </Text>
          </View>
        </View>
        <View className="flex-1 relative" key="3">
          <Image
            source={require('../../assets/images/screen3.png')}
            className=" w-full h-full"
          />
          <View className=" absolute text-lg items-center w-full h-full justify-end bottom-16 ">
            <Text className="text-white font-bold bg-black py-2 px-8 text-2xl rounded-full opacity-80">
              Lets get started to enjoy Home food
            </Text>
            <Pressable
              onPress={handleOnboardingFinish}
              className="text-green-500 bg-white py-2 px-8  rounded-full  mt-2">
              <Text className=" text-2xl font-bold text-black">
                Get Started{' '}
              </Text>
            </Pressable>
          </View>
        </View>
      </PagerView>
    </View>
  );
};

export default MyPager;

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 20,
  },
});
