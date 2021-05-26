import messaging from '@react-native-firebase/messaging';

const requestCloudMessaging = async () => {
  const authorizationStatus = await messaging().requestPermission();
  return authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED;
};

export default requestCloudMessaging;
