import { useSelector } from '../redux/hook';
import useExpiredFoods from './useExpiredFoods';

// 유통기한 3일 이내 식품 리스트 알림
export default function useNotification() {
  const { notificationList } = useSelector((state) => state.notificationList);
  const { allLeftAndExpiredFoods } = useExpiredFoods();

  return allLeftAndExpiredFoods;
}
