import { useState } from 'react';
import { Food } from '../constant/foods';

export default function useHandleCheckList() {
  const [checkedList, setCheckedList] = useState<Food[]>([]);

  const checkedFoodNameList = checkedList.map((food) => food.name).join(', ');

  const onEntireBoxPress = (list: Food[]) => {
    const allChecked = checkedList.length === list.length;
    return setCheckedList(allChecked ? [] : list);
  };

  const isCheckedItem = (id: string) => {
    return checkedList.find((food) => food.id === id);
  };

  const onCheckBoxPress = (food: Food) => {
    const clearItemInList = checkedList.filter((item) => item.id !== food.id);
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
    checkedFoodNameList,
  };
}
