import { useSelector } from '../redux/hook';
import { CompartmentNum, Space } from '../constant/fridgeInfo';
import { useCallback } from 'react';
import { getFormattedDate } from '../util';

export default function useExpiredFoods() {
  const { allFoods } = useSelector((state) => state.allFoods);

  const getLeftDays = useCallback((expiryDate: string) => {
    const diffDate =
      new Date(expiryDate).getTime() -
      new Date(getFormattedDate(new Date())).getTime();
    const leftDays = diffDate / (1000 * 60 * 60 * 24);
    return Math.round(leftDays);
  }, []);

  // 여기서 함수를 남발해서 그런 것 같다.
  // expired가 매개변수로 들어가니 바뀔때마다 매번 연산해야되는구나.

  const allExpiredFoods = allFoods.filter(
    (food) => getLeftDays(food.expiredDate) < 4
  );

  const filterExpiredFoods = (
    space: '냉동실' | '냉장실' | Space,
    compartmentNum?: CompartmentNum
  ) => {
    return allExpiredFoods.filter((food) => {
      if (space === '냉동실') return food.space.includes('냉동실');
      if (space === '냉장실') return food.space.includes('냉장실');

      const matchSpace = food.space === space;
      const matchCompartmentNum = food.compartmentNum === compartmentNum;

      if (compartmentNum) return matchSpace && matchCompartmentNum;
      return matchSpace;
    });
  };

  const checkExpired = (expiredDate: string) => {
    return 0 > getLeftDays(expiredDate);
  };

  const checkLeftThreeDays = (expiredDate: string) => {
    return 0 <= getLeftDays(expiredDate) && getLeftDays(expiredDate) < 4;
  };

  return {
    allExpiredFoods,
    filterExpiredFoods,
    getLeftDays,
    checkExpired,
    checkLeftThreeDays,
  };
}
