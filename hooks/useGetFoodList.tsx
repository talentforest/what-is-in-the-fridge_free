import { Space } from '../constant/fridgeInfo';
import { useSelector } from '../redux/hook';

export default function useGetFoodList() {
  const { fridgeFoods, freezerFoods } = useSelector((state) => state.allFoods);

  const allFoods = [...fridgeFoods, ...freezerFoods];

  const getFoodList = (itemNum: number, space: Space) => {
    return allFoods.filter(
      (food) => food.space === space && food.compartmentNum === `${itemNum}번`
    );
  };

  return {
    getFoodList,
  };
}
