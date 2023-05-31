import { useEffect, useRef, useState } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { Text } from '../components/native-component';
import { getLocaleDate } from '../util';
import { LIGHT_GRAY } from '../constant/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';
import EmptyTag from '../components/common/EmptyTag';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useSelector } from '../redux/hook';
import { Food } from '../constant/foods';
import useExpiredFoods from '../hooks/useExpiredFoods';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Notification() {
  const { notificationList } = useSelector((state) => state.notificationList);
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const { allLeftAndExpiredFoods } = useExpiredFoods();

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

    schedulePushNotification(allLeftAndExpiredFoods);

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
      {notificationList.length === 0 ? (
        <View style={tw`flex-1 p-4 gap-1 bg-neutral-50`}>
          <EmptyTag tagName='알림이 없습니다' />
        </View>
      ) : (
        <>
          <View style={tw`p-4 flex-row items-center justify-between`}>
            <Text styletw='text-indigo-600 text-base'>유통기한 알림</Text>
            <View
              style={tw`border bg-white border-slate-300 px-2 py-1 rounded-2xl`}
            >
              <Text styletw='text-sm'>전체 읽음</Text>
            </View>
          </View>
          <ScrollView
            style={tw`p-4 pt-0`}
            contentContainerStyle={tw`gap-2`}
            showsVerticalScrollIndicator={false}
          >
            {notificationList.map((notification) => (
              <View
                style={tw`border justify-between border-slate-300 flex-row gap-3 items-center p-4 rounded-lg bg-white`}
                key={notification.id}
              >
                <View style={tw`gap-2 flex-1`}>
                  <View style={tw`flex-row items-center gap-0.5`}>
                    <Icon
                      name='alert-octagram-outline'
                      size={16}
                      color={LIGHT_GRAY}
                    />
                    <Text styletw='text-xs text-slate-400'>유통기한</Text>
                  </View>
                  <Text>{notification.body}</Text>
                  <View style={tw`flex-row gap-2`}>
                    <Text styletw='text-xs text-slate-400'>
                      {getLocaleDate(notification.date)}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </>
      )}
    </>
  );
}

export async function schedulePushNotification(foods: Food[]) {
  const foodNameList = foods.map((food) => food.name).join(',');
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '유통기한 알림',
      body: `${foodNameList}의 유통기한이 3일 이내입니다.`,
      data: { data: 'ExpiredFoods' },
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
