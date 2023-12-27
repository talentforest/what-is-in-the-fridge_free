import { View } from 'react-native';
import { Text } from '../components/common/native-component';
import { useDispatch, useSelector } from '../redux/hook';
import { toggleNotification } from '../redux/slice/notificationSlice';
import { useGetFoodList } from '../hooks';
import { getLeftDays, getNameListCanMarkEtc } from '../util';
import { notificationContents } from '../constant/notificationContents';

import Container from '../components/common/Container';
import ToggleBtn from '../components/buttons/ToggleBtn';
import * as Notifications from 'expo-notifications';
import tw from 'twrnc';
import TimeBtn from '../components/buttons/TimeBtn';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function SettingNotification() {
  const { notification, approachDate } = useSelector(
    (state) => state.notification
  );

  const dispatch = useDispatch();

  const onTogglePress = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: '소비기한 만료 식료품 안내',
        body: '소비기한이 만료된 식료품이 있습니다',
      },
      trigger: {
        seconds: 2,
      },
    });

    const { threeLeftDaysFoods, expiredFoods } = useGetFoodList();

    const reminderFoods = [...expiredFoods, ...threeLeftDaysFoods];

    function getReminderFoodsState() {
      if (reminderFoods.length === 0) return;

      const allExpired = reminderFoods.every(
        (food) => getLeftDays(food.expiredDate) < 0
      );
      const allThreeDaysLeft = reminderFoods.every(
        (food) =>
          0 <= getLeftDays(food.expiredDate) &&
          getLeftDays(food.expiredDate) < 4
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

    const schedulePushNotification = async () => {
      const content = notificationContents?.find(
        (contents) => contents.id === getReminderFoodsState()
      );

      if (content) {
        const { title, body } = content;

        await Notifications.scheduleNotificationAsync({
          content: {
            title,
            body: `${getNameListCanMarkEtc(reminderFoods, 3)}${body}`,
          },
          trigger: null,
        });
      }

      toggleNotificationSetting();
    };

    return (
      <Container>
        <View style={tw`mx-2`}>
          <View style={tw`py-1.5 flex-row justify-between items-center`}>
            <Text style={tw`text-slate-800`}>소비기한 주의 식료품 알림</Text>

            <View style={tw`h-6.5`}>
              <ToggleBtn
                active={notification}
                onTogglePress={
                  notification
                    ? toggleNotificationSetting
                    : schedulePushNotification
                }
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

                  <View
                    style={tw`border border-slate-600 bg-white px-2.5 py-1 rounded-lg `}
                  >
                    <Text fontSize={16} style={tw`text-slate-600`}>
                      {`${approachDate}일`}
                    </Text>
                  </View>
                </View>

                <Text fontSize={15} style={tw`text-blue-400`}>
                  {`소비기한이 ${approachDate}일 남은 식료품들을 알려드려요`}
                </Text>
              </View>
            </View>
          ) : (
            <></>
          )}
        </View>
      </Container>
    );
  };
}
