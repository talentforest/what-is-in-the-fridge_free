import { useEffect } from 'react';
import { useDispatch, useSelector } from '../redux/hook';
import { toggleNotification } from '../redux/slice/notificationSlice';
import { getNameListCanMarkEtc } from '../util';
import { useGetFoodList } from './useGetFoodList';
import { PATHNAME_ALLFOODS, prefix } from '../constant/link';
import {
  NOTIFICATION_CHANNEL_ID,
  notificationContents,
} from '../constant/notification';
import * as Notifications from 'expo-notifications';
import { useFindFood } from './useFindFood';

type cautionFoodsState =
  | undefined
  | '소비기한 만료'
  | '소비기한 임박'
  | '소비기한 주의';

export const useNotification = () => {
  const { notification, expiredSoonDay, time } = useSelector(
    (state) => state.notification
  );

  const { cautionFoods } = useGetFoodList();

  const { isExpiredFood, isExpiredSoonFood } = useFindFood();

  const dispatch = useDispatch();

  const toggleNotiSetting = async () =>
    dispatch(toggleNotification(!notification));

  const cautionFoodNames = getNameListCanMarkEtc(cautionFoods, 3);

  function getCautionFoodsState(): cautionFoodsState {
    if (cautionFoods.length === 0) return;

    const allExpired = cautionFoods.every((food) =>
      isExpiredFood(food.expiredDate)
    );
    const allThreeDaysLeft = cautionFoods.every((food) =>
      isExpiredSoonFood(food.expiredDate)
    );
    if (allExpired && !allThreeDaysLeft) return '소비기한 만료';

    if (allThreeDaysLeft && !allExpired) return '소비기한 임박';

    return '소비기한 주의';
  }

  const cancelNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  useEffect(() => {
    const initNotifications = async () => {
      await cancelNotifications();
      if (notification) {
        await scheduleDailyNotification();
      }
    };

    initNotifications();
  }, [notification, time, expiredSoonDay, cautionFoodNames]);

  const scheduleDailyNotification = async () => {
    cancelNotifications();

    const content = notificationContents?.find(
      ({ id }) => id === getCautionFoodsState()
    );

    // 소비기한 식료품이 있는 경우에만 재예약
    if (content) {
      const { title, body } = content;

      const [hour, minute] = time?.split(':').map((item) => +item);

      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body: `${cautionFoodNames}${body}`,
          data: {
            url: `${prefix}${PATHNAME_ALLFOODS}?filter=소비기한 주의`,
          },
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

  return {
    toggleNotiSetting,
    cancelNotifications,
  };
};
