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

export const formatDate = (dateStr: string) => {
  // Create a new Date object from the date string
  const date = new Date(dateStr);

  // Extract date components
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = String(date.getUTCFullYear()).slice(-2);

  // Extract time components
  let hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'
  const strHours = String(hours).padStart(2, '0');

  // Format the date and time
  const formattedDate = `${day}/${month}/${year} ${strHours}:${minutes} ${ampm}`;

  return formattedDate; // Output: 050724 07:51 AM
};
