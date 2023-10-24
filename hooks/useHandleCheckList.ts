import { useState } from 'react';
import { useDispatch, useSelector } from '../redux/hook';
import { toggleShowBtn } from '../redux/slice/showBtnSlice';
import { Food } from '../constant/foodInfo';

export const useHandleCheckList = () => {
  const [checkedList, setCheckedList] = useState<Food[]>([]);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);

  const dispatch = useDispatch();

  const isFavoriteItem = (name: string) => {
    // 자주 먹는 식료품인지는 이름으로 검사
    return favoriteFoods.find((favoriteFood) => favoriteFood.name === name);
  };

  const onEntireBoxPress = (list: Food[]) => {
    const editList = list.map((food) => isFavoriteItem(food.name) || food);
    const allChecked = checkedList.length === editList.length;

    dispatch(toggleShowBtn(true));
    return setCheckedList(allChecked ? [] : list);
  };

  const isCheckedItem = (id: string) => {
    return checkedList.find((food) => food.id === id);
  };

  const onCheckBoxPress = (food: Food) => {
    const clearItemInList = checkedList.filter((item) => item.id !== food.id);
    if (checkedList.length === 0) {
      dispatch(toggleShowBtn(true));
    }
    return setCheckedList(
      isCheckedItem(food.id) ? clearItemInList : [...checkedList, food]
    );
  };

  return {
    checkedList,
    setCheckedList,
    onCheckBoxPress,
    onEntireBoxPress,
    isCheckedItem,
  };
};
