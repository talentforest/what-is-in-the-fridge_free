import { useState } from 'react';
import { Food, FoodInfo } from '../constant/foods';
import { useDispatch } from '../redux/hook';
import { editFood } from '../redux/slice/allFoodsSlice';
import {
  addFavorite,
  editFavorite,
  removeFavorite,
} from '../redux/slice/favoriteFoodsSlice';

export default function useChangeFoodInfo({ food }: { food: Food }) {
  const [editedFood, setEditedFood] = useState(food);
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();

  const editFoodInfo = (newInfo: FoodInfo) => {
    return setEditedFood({ ...editedFood, ...newInfo });
  };

  const onEditSumbit = (foodId: string) => {
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
