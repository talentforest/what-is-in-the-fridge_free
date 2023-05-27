import { CompartmentNum, Space } from '../constant/fridgeInfo';
import { useSelector } from '../redux/hook';

export default function useGetFoodList() {
  const { fridgeFoods, freezerFoods } = useSelector((state) => state.allFoods);

  const allFoods = [...fridgeFoods, ...freezerFoods];

  const getFoodList = (space: Space, compartmentNum: CompartmentNum) => {
    const matchFoods = allFoods.filter(
      (food) => food.space === space && food.compartmentNum === compartmentNum
    );
    return matchFoods;
  };

  return {
    getFoodList,
  };
}
