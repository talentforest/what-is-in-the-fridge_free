import { getLeftDays } from '../util';
import { Food } from '../constant/foods';
import { useSelector } from '../redux/hook';
import { CompartmentNum, Space } from '../constant/fridgeInfo';

export default function useExpiredFoods() {
  const { fridgeFoods, freezerFoods } = useSelector((state) => state.allFoods);

  const threeDaysLeftFridgeFoods = fridgeFoods.filter((food: Food) => {
    return (
      0 <= getLeftDays(food.expirationDate) &&
      getLeftDays(food.expirationDate) < 4
    );
  });

  const threeDaysLeftFreezerFoods = freezerFoods.filter((food: Food) => {
    return (
      0 <= getLeftDays(food.expirationDate) &&
      getLeftDays(food.expirationDate) < 4
    );
  });

  const allThreeDaysLeftFoods = [
    ...threeDaysLeftFridgeFoods,
    ...threeDaysLeftFreezerFoods,
  ];

  const expiredFridgeFoods = fridgeFoods.filter((food: Food) => {
    return getLeftDays(food.expirationDate) < 0;
  });

  const expiredFreezerFoods = freezerFoods.filter((food: Food) => {
    return getLeftDays(food.expirationDate) < 0;
  });

  const allExpiredFoods = [...expiredFridgeFoods, ...expiredFreezerFoods];

  const allLeftAndExpiredFoods = [...allThreeDaysLeftFoods, ...allExpiredFoods];

  const getExpiredFoodList = (space: Space, compartmentNum: CompartmentNum) => {
    const foodList = space.includes('냉동') ? freezerFoods : fridgeFoods;
    return foodList.filter((food) => {
      return (
        food.space === space &&
        food.compartmentNum === compartmentNum &&
        getLeftDays(food.expirationDate) < 4
      );
    });
  };

  return {
    threeDaysLeftFridgeFoods,
    threeDaysLeftFreezerFoods,
    allThreeDaysLeftFoods,
    expiredFridgeFoods,
    expiredFreezerFoods,
    allExpiredFoods,
    allLeftAndExpiredFoods,
    getExpiredFoodList,
  };
}
