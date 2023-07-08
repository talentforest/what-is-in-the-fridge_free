import { CompartmentNum, Space } from '../constant/fridgeInfo';
import { useSelector } from '../redux/hook';

export default function useGetFoodList() {
  const { allFoods } = useSelector((state) => state.allFoods);

  const getFoodList = (space: Space, compartmentNum?: CompartmentNum) => {
    return allFoods.filter((food) => {
      if (compartmentNum) {
        const matchSpace = food.space === space;
        const matchCompartmentNum = food.compartmentNum === compartmentNum;

        return matchSpace && matchCompartmentNum;
      }

      return food.space === space;
    });
  };

  return {
    getFoodList,
  };
}
