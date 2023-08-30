import { useState } from 'react';
import { Food, FoodInfo } from '../constant/foods';
import { useDispatch } from '../redux/hook';
import { editFood } from '../redux/slice/allFoodsSlice';
import {
  addFavorite,
  editFavorite,
  removeFavorite,
} from '../redux/slice/favoriteFoodsSlice';
import { Alert } from 'react-native';
import { getFormattedDate } from '../util';

export default function useEditFood({ food }: { food: Food }) {
  const [editedFood, setEditedFood] = useState(food);
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();

  const editFoodInfo = (newInfo: FoodInfo) => {
    return setEditedFood({ ...editedFood, ...newInfo });
  };

  const onEditSumbit = (foodId: string) => {
    const { expiredDate, purchaseDate } = editedFood;
    if (new Date(expiredDate).getTime() < new Date(purchaseDate).getTime()) {
      return Alert.alert(
        '날짜 수정 알림',
        '유통기한이 구매일보다 이전일 수 없습니다.'
      );
    }

    // 수정일 경우에는 유통기한이 오늘보다 이전일 경우도 있을 것 같음.

    if (editedFood.favorite) {
      dispatch(editFavorite(editedFood));
      dispatch(addFavorite(editedFood));
    } else {
      dispatch(removeFavorite({ name: editedFood.name }));
    }
    dispatch(editFood({ foodId, editedFood }));
    setEditing(false);
  };

  return {
    editing,
    setEditing,
    editedFood,
    editFoodInfo,
    onEditSumbit,
  };
}
