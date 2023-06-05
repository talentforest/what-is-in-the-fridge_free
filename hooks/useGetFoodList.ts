import { CompartmentNum, Space } from '../constant/fridgeInfo';
import { useSelector } from '../redux/hook';

export default function useGetFoodList() {
  const { allFoods } = useSelector((state) => state.allFoods);

  const getFoodList = (
    space: '냉동실' | '냉장실' | Space,
    compartmentNum?: CompartmentNum
  ) => {
    const matchFoods = allFoods.filter((food) => {
      if (compartmentNum) {
        const checkLocation =
          food.space === space && food.compartmentNum === compartmentNum;
        return checkLocation;
      }

      if (space === '냉동실') return food.space.includes('냉동');
      if (space === '냉장실') return food.space.includes('냉장');
    });

    return matchFoods;
  };

  return {
    getFoodList,
  };
}
