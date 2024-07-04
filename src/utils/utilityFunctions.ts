import {PermissionsAndroid, ToastAndroid} from 'react-native';
import Toast from 'react-native-toast-message';

export const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'This app needs access to your camera to take pictures.',
        buttonPositive: 'OK',
        buttonNegative: 'Cancel',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission granted');
      // Access the camera here
      return true;
    } else {
      console.log('Camera permission denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

// export const showToast = (message: string) => {
//   ToastAndroid.show(message, ToastAndroid.SHORT);
// };

export const showToastWithGravity = (message: string) => {
  ToastAndroid.showWithGravity(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,
  );
};

export const showToastWithGravityAndOffset = (message: string) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50,
  );
};

export const showToast = (
  type: string = 'success',
  text1: string,
  text2: string,
) => {
  Toast.show({
    type: type,
    text1: text1,
    text2: text2,
  });
};
