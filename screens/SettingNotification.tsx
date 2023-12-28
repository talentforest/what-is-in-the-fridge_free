import { Pressable, View } from 'react-native';
import { Text } from '../components/common/native-component';
import { useDispatch, useSelector } from '../redux/hook';
import { toggleNotification } from '../redux/slice/notificationSlice';
import { useGetFoodList } from '../hooks';
import { getLeftDays, getNameListCanMarkEtc } from '../util';
import { notificationContents } from '../constant/notificationContents';
import { useEffect, useState } from 'react';
import { PATHNAME_ALLFOODS, prefix } from '../constant/link';

import Container from '../components/common/Container';
import ToggleBtn from '../components/buttons/ToggleBtn';
import * as Notifications from 'expo-notifications';
import TimeBtn from '../components/buttons/TimeBtn';
import DayBtn from '../components/buttons/DayBtn';
import tw from 'twrnc';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const NOTIFICATION_CHANNEL_ID = '소비기한 주의 식료품 알림';

export default function SettingNotification() {
  const [dayPickerVisible, setDayPickerVisible] = useState(false);
  const { notification, approachDate, time } = useSelector(
    (state) => state.notification
  );

  const dispatch = useDispatch();

  const { getLessLeftDayFoods } = useGetFoodList();

  useEffect(() => {
    if (notification) {
      scheduleNotificationEveryDay();
    }
  }, [notification, time, approachDate]);

  const reminderFoods = getLessLeftDayFoods(approachDate);

  function getReminderFoodsState() {
    if (reminderFoods.length === 0) return;

    const allExpired = reminderFoods.every(
      (food) => getLeftDays(food.expiredDate) < 0
    );
    const allThreeDaysLeft = reminderFoods.every(
      (food) =>
        0 <= getLeftDays(food.expiredDate) && getLeftDays(food.expiredDate) < 4
    );

    if (allExpired && !allThreeDaysLeft) {
      return '소비기한 만료';
    }
    if (allThreeDaysLeft && !allExpired) {
      return '소비기한 임박';
    }
    return '소비기한 주의';
  }

  const toggleNotificationSetting = () =>
    dispatch(toggleNotification(!notification));

  const scheduleNotificationEveryDay = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();

    const content = notificationContents?.find(
      (contents) => contents.id === getReminderFoodsState()
    );

    if (content) {
      const { title, body } = content;

      const [hour, minute] = time.split(':').map((item) => +item);

      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body: `${getNameListCanMarkEtc(reminderFoods, 3)}${body}`,
          data: { url: `${prefix}${PATHNAME_ALLFOODS}` },
        },
        trigger: {
          hour,
          minute,
          repeats: true,
          channelId: NOTIFICATION_CHANNEL_ID,
        },
      });
    }
  };

  return (
    <Pressable style={tw`flex-1`} onPress={() => setDayPickerVisible(false)}>
      <Container>
        <View style={tw`mx-2`}>
          <View style={tw`py-1.5 flex-row justify-between items-center`}>
            <Text style={tw`text-slate-800`}>{NOTIFICATION_CHANNEL_ID}</Text>

            <View style={tw`h-6.5`}>
              <ToggleBtn
                active={notification}
                onTogglePress={toggleNotificationSetting}
                width={23}
                color='gray'
                toggleBtnNames={['', '']}
              />
            </View>
          </View>

          {notification ? (
            <View style={tw`mt-6 gap-3`}>
              <View style={tw`py-0.5 flex-row justify-between items-center`}>
                <Text fontSize={16} style={tw`text-slate-600`}>
                  알림 시간
                </Text>
                <TimeBtn />
              </View>

              <View>
                <View style={tw`py-0.5 flex-row justify-between items-center`}>
                  <Text fontSize={16} style={tw`text-slate-600`}>
                    임박 날짜
                  </Text>
                  <DayBtn
                    dayPickerVisible={dayPickerVisible}
                    setDayPickerVisible={setDayPickerVisible}
                  />
                </View>

                <Text fontSize={15} style={tw`text-blue-400`}>
                  {`소비기한이 ${approachDate}일 이하로 남은 식료품들을 알려드려요`}
                </Text>
              </View>
            </View>
          ) : (
            <></>
          )}
        </View>
      </Container>
    </Pressable>
  );
}
