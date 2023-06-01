import { useState } from 'react';
import { Food } from '../constant/foods';
import { useDispatch, useSelector } from '../redux/hook';
import { setShoppingList } from '../redux/slice/shoppingList';
import { Alert } from 'react-native';

export default function useHandleCheckList() {
  const [entireCheck, setEntireCheck] = useState(false);
  const [checkList, setCheckList] = useState<Food[]>([]);

  const { shoppingList } = useSelector((state) => state.shoppingList);
  const { allFoods } = useSelector((state) => state.allFoods);

  const dispatch = useDispatch();

  const onDeleteListPress = () => {
    const filteredArr = shoppingList.filter((item1) => {
      return !checkList.some((item2) => item2.id === item1.id);
    });

    dispatch(setShoppingList(filteredArr));
    setCheckList([]);
    setEntireCheck(false);
  };

  const onEntirePress = (list: Food[]) => {
    setEntireCheck((prev) => !prev);
    return !entireCheck ? setCheckList(list) : setCheckList([]);
  };

  const onExistFoodPress = (food: Food, onModalPress: (food: Food) => void) => {
    const existFood = allFoods.find((item) => item.name === food.name);
    return Alert.alert(
      `기존 식료품 삭제 알림`,
      `기존의 "${food.name}" 식료품을 삭제하고 새로 추가하시겠습니까?`,
      [
        {
          text: '취소',
          style: 'destructive',
        },
        {
          text: '삭제 후 추가',
          onPress: () => {
            if (existFood) {
              onModalPress(food);
            }
            return;
          },
          style: 'default',
        },
      ]
    );
  };

  return {
    entireCheck,
    setEntireCheck,
    checkList,
    setCheckList,
    onDeleteListPress,
    onEntirePress,
    onExistFoodPress,
  };
}
