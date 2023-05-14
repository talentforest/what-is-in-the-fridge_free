import { useEffect, useRef, useState } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { Text } from '../components/native-component';
import { getISODate, getLocaleDate } from '../util';
import { DEEP_INDIGO } from '../constant/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';
import EmptyTag from '../components/common/EmptyTag';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

interface NotiContent {
  id: string;
  title: string;
  body: string;
  data: { data: string };
  date: string;
}

export default function Notification() {
  const [notificationArr, setNotificationArr] = useState<NotiContent[]>([
    {
      id: '1',
      title: '',
      body: '가지의 유통기한이 임박했습니다.',
      data: { data: '1' },
      date: getISODate(new Date()),
    },
    {
      id: '2',
      title: '2',
      body: '포도의 유통기한이 임박했습니다.',
      data: { data: '2' },
      date: getISODate(new Date()),
    },
    {
      id: '3',
      title: '3',
      body: '오렌지의 유통기한이 임박했습니다.',
      data: { data: '3' },
      date: getISODate(new Date()),
    },
    {
      id: '4',
      title: '4',
      body: '오이의 유통기한이 임박했습니다.',
      data: { data: '4' },
      date: getISODate(new Date()),
    },
  ]);
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      if (
        typeof notificationListener.current !== 'undefined' &&
        typeof responseListener.current !== 'undefined'
      ) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return (
    <>
      {notificationArr.length === 0 ? (
        <View style={tw`flex-1 p-4 gap-1 bg-neutral-50`}>
          <EmptyTag tagName='알림이 없습니다' />
        </View>
      ) : (
        <>
          <Text styletw='p-4 text-indigo-600'>유통기한 알림</Text>
          <ScrollView style={tw`p-4 pt-0`} contentContainerStyle={tw`gap-2`}>
            {notificationArr.map((notification) => (
              <View
                style={tw`border border-slate-400 flex-row gap-3 items-center p-4 rounded-lg bg-white`}
                key={notification.id}
              >
                <Icon name='food-variant-off' size={24} color={DEEP_INDIGO} />
                <View style={tw`gap-2`}>
                  <Text>{notification.body}</Text>
                  <Text styletw='text-xs text-slate-400'>
                    {getLocaleDate(notification.date)}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </>
      )}
    </>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '유통기한 알림',
      body: '가지의 유통기한이 임박했습니다.',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
