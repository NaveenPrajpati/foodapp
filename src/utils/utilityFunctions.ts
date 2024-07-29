import {Image, PermissionsAndroid, ToastAndroid} from 'react-native';
import Toast from 'react-native-toast-message';
import notifee, {
  AndroidImportance,
  AuthorizationStatus,
  EventType,
} from '@notifee/react-native';
import NotificationSounds from 'react-native-notification-sounds';
import RNFS from 'react-native-fs';

export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'This app needs access to your location',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
      return true;
    } else {
      console.log('Location permission denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
};

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

type ToastType = 'success' | 'error' | 'info'; // Define allowed types
export const showToast = (type: ToastType, text1: string, text2?: string) => {
  Toast.show({
    type,
    text1,
    text2, // Pass optional text2 if provided
    position: 'top',
    visibilityTime: 2000,
    autoHide: true,
    // Additional props for customization (e.g., icon, style, etc.)
  });
};

type notificationPropType = {
  title: string;
  body: string;
};

export async function onDisplayNotification(payload: notificationPropType) {
  // Request permissions (required for iOS)
  const settings = await notifee.requestPermission();

  if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
    console.log('Permission settings:', settings);
  } else {
    console.log('User declined permissions');
  }

  // Retrieve a list of system notification sounds
  const soundsList = await NotificationSounds.getNotifications('notification');
  const soundFile = soundsList[0]?.url || 'ring1'; // Fallback to 'default' if no sound found

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'sound',
    name: 'Default Channel',
    sound: soundFile, // Ensure this matches your sound file name
    importance: AndroidImportance.HIGH,
    vibration: true,
  });

  await notifee.displayNotification({
    id: '123',
    title: payload.title || 'your order Status',
    body: payload.body || 'order place successfully',
    android: {
      channelId,
      color: '#6495ed',
      sound: 'default',
      pressAction: {
        id: 'default',
      },
    },
    ios: {
      sound: 'default',
    },
  });
}

export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date(); // Get current time

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const isTomorrow =
    date.getDate() === now.getDate() + 1 &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const strHours = String(hours).padStart(2, '0');

  if (isToday) {
    return `${strHours}:${minutes} ${ampm}`; // Only time for today
  } else if (isTomorrow) {
    return `Tom ${strHours}:${minutes} ${ampm}`; // "Tom" for tomorrow
  } else {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year} ${strHours}:${minutes} ${ampm}`; // Full date for other days
  }
};

export async function downloadButton() {
  const imageSource = require('../assets/images/qr.png');
  const resolvedAssetSource = Image.resolveAssetSource(imageSource);
  const imageUrl = resolvedAssetSource.uri;
  const destPath = `${RNFS.DownloadDirectoryPath}/qr.png`;

  try {
    const downloadOptions = {
      fromUrl: imageUrl,
      toFile: destPath,
    };
    await RNFS.downloadFile(downloadOptions).promise;
    showToast('success', 'Qr image download');
  } catch (error) {
    showToast('error', 'Failed to download image');
    console.log(error);
  }
}
