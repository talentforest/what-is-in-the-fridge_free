import { CompartmentNum, Space } from '../constant/fridgeInfo';
import { useSelector } from '../redux/hook';

export default function useGetFoodList() {
  const { allFoods } = useSelector((state) => state.allFoods);

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
