import { useState } from 'react';
import { useDispatch } from '../redux/hook';
import { toggleShowBtn } from '../redux/slice/showBtnSlice';
import { Food, PantryFood } from '../constant/foodInfo';

export const useHandleCheckList = () => {
  const [checkedList, setCheckedList] = useState<(Food | PantryFood)[]>([]);

  const dispatch = useDispatch();

  const onEntireBoxPress = (list: (Food | PantryFood)[]) => {
    const allChecked = checkedList.length === list.length;
    dispatch(toggleShowBtn(true));
    return setCheckedList(allChecked ? [] : list);
  };

  const isCheckedItem = (id: string) => {
    return checkedList.find((food) => food.id === id);
  };

  const onCheckBoxPress = (food: Food | PantryFood) => {
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
