import { getLeftDays } from '../util';
import { Food } from '../constant/foods';
import { useSelector } from '../redux/hook';
import { CompartmentNum, Space } from '../constant/fridgeInfo';

export default function useExpiredFoods() {
  const { allFoods } = useSelector((state) => state.allFoods);

  const checkExpired = (expiredDate: string) => {
    return 0 > getLeftDays(expiredDate);
  };
  const checkLeftThreeDays = (expiredDate: string) => {
    return 0 <= getLeftDays(expiredDate) && getLeftDays(expiredDate) < 4;
  };

  const threeDaysLeftFoods = allFoods?.filter((food: Food) => {
    return (
      0 <= getLeftDays(food.expiredDate) && getLeftDays(food.expiredDate) < 4
    );
  });

  const expiredFoods = allFoods?.filter((food: Food) => {
    return getLeftDays(food.expiredDate) < 0;
  });

  const allLeftAndExpiredFoods = [...threeDaysLeftFoods, ...expiredFoods];

  const getExpiredFoods = (space: Space, compartmentNum?: CompartmentNum) => {
    return allFoods.filter((food) => {
      const checkSpace = food.space === space;
      const checkCompartmentNum = food.compartmentNum === compartmentNum;
      const checkLeftDays = getLeftDays(food.expiredDate) < 4;

      if (compartmentNum)
        return checkSpace && checkCompartmentNum && checkLeftDays;

      return checkSpace && checkLeftDays;
    });
  };

  const freezerLeftExpiredFoods = allLeftAndExpiredFoods.filter((food) =>
    food.space.includes('냉동')
  );

  const fridgeLeftExpiredFoods = allLeftAndExpiredFoods.filter((food) =>
    food.space.includes('냉장')
  );

  return {
    checkExpired,
    checkLeftThreeDays,
    freezerLeftExpiredFoods,
    fridgeLeftExpiredFoods,
    allLeftAndExpiredFoods,
    getExpiredFoods,
  };
}
