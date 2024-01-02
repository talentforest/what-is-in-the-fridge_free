import { useEffect } from 'react';
import { notificationContents } from '../constant/notificationContents';
import { useDispatch, useSelector } from '../redux/hook';
import { toggleNotification } from '../redux/slice/notificationSlice';
import {
  getNameListCanMarkEtc,
  isExpiredFood,
  isLeftThreeDaysFood,
} from '../util';
import { useGetFoodList } from './useGetFoodList';

import * as Notifications from 'expo-notifications';
import { PATHNAME_ALLFOODS, prefix } from '../constant/link';

// 훅에 대한 설명
// 1. 알림을 설정
// 2. 알림에 알맞은 식료품 이름들 가져오기
// 3. 소비기한 주의 식료품을 수정하거나 삭제했을 때 알림 재예약

type cautionFoodsState =
  | undefined
  | '소비기한 만료'
  | '소비기한 임박'
  | '소비기한 주의';

export const NOTIFICATION_CHANNEL_ID = '소비기한 주의 식료품 알림';

export const useNotification = () => {
  const { notification, approachDate, time } = useSelector(
    (state) => state.notification
  );

  const { getLessLeftDayFoods } = useGetFoodList();

  const dispatch = useDispatch();

  const toggleNotiSetting = () => dispatch(toggleNotification(!notification));

  const [hour, minute] = time.split(':').map((item) => +item);

  const cautionFoods = getLessLeftDayFoods(approachDate);
  const cautionFoodNames = getNameListCanMarkEtc(cautionFoods);

  function getCautionFoodsState(): cautionFoodsState {
    if (cautionFoods.length === 0) return;

    const allExpired = cautionFoods.every((food) =>
      isExpiredFood(food.expiredDate)
    );
    const allThreeDaysLeft = cautionFoods.every((food) =>
      isLeftThreeDaysFood(food.expiredDate)
    );
    if (allExpired && !allThreeDaysLeft) return '소비기한 만료';

    if (allThreeDaysLeft && !allExpired) return '소비기한 임박';

    return '소비기한 주의';
  }

  const getNextNotificationInfo = async (hour: number, minute: number) => {
    const nextTriggerDate = await Notifications.getNextTriggerDateAsync({
      hour,
      minute,
      repeats: true,
      channelId: NOTIFICATION_CHANNEL_ID,
    });
    console.log('다음 알림:', new Date(nextTriggerDate).toLocaleString('ko'));
  };

  useEffect(() => {
    if (notification) {
      scheduleNotificationEveryDay(); // 알림이 켜진 상태라면 알림 예약
    }
    // compareCurrFoodStateToReservedState();
  }, [notification, time, approachDate, cautionFoodNames]);

  const compareCurrFoodStateToReservedState = async () => {
    const allSchedule = await Notifications.getAllScheduledNotificationsAsync();

    const reservedFoodNames = allSchedule[0]?.content.data.foods || '';

    const comparision = cautionFoodNames === reservedFoodNames;

    console.log(
      '현재 상태과 예약된 식료품 상태가 일치:',
      comparision,
      '/',
      cautionFoodNames,
      '/',
      reservedFoodNames
    );
  };

  const scheduleNotificationEveryDay = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();

    const content = notificationContents?.find(
      ({ id }) => id === getCautionFoodsState()
    );

    // 소비기한 식료품이 있는 경우에만 재예약
    if (content) {
      const { title, body } = content;

      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body: `${cautionFoodNames}${body}`,
          data: {
            url: `${prefix}${PATHNAME_ALLFOODS}?filter=소비기한 주의`,
            foods: cautionFoodNames,
          },
        },
        trigger: {
          hour,
          minute,
          repeats: true,
          channelId: NOTIFICATION_CHANNEL_ID,
        },
      });
      // 다음 알림 예약 확인
      // getNextNotificationInfo(hour, minute);
    }
  };

  return {
    cautionFoods,
    toggleNotiSetting,
    scheduleNotificationEveryDay,
  };
};
