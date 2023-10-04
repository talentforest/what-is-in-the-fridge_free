import { useEffect, useState } from 'react';
import { FoodInfo } from '../constant/foodInfo';
import { useDispatch, useSelector } from '../redux/hook';
import { editFridgeFood } from '../redux/slice/fridgeFoodsSlice';
import { Alert } from 'react-native';
import { editPantryFood } from '../redux/slice/pantryFoodsSlice';
import { alertPhrase } from '../constant/alertPhrase';
import {
  addFavorite,
  editFavorite,
  removeFavorite,
} from '../redux/slice/favoriteFoodsSlice';

export const useEditFood = () => {
  const { isFavorite } = useSelector((state) => state.isFavorite);
  const { isMemoOpen } = useSelector((state) => state.isMemoOpen);
  const { selectedFood } = useSelector((state) => state.selectedFood);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);

  const [editedFood, setEditedFood] = useState(selectedFood);
  const [editing, setEditing] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setEditedFood(selectedFood);
  }, [selectedFood]);

  const editFoodInfo = (newInfo: FoodInfo) =>
    setEditedFood({ ...editedFood, ...newInfo });

  const isFavoriteItem = (name: string) =>
    favoriteFoods.find((food) => food.name === name);

  const onEditSumbit = (foodId: string) => {
    const { expiredDate, purchaseDate, memo } = editedFood;

    const { wrongDate, noMemo } = alertPhrase;
    if (new Date(expiredDate).getTime() < new Date(purchaseDate).getTime())
      return Alert.alert(wrongDate.title, wrongDate.msg);

    if (isMemoOpen && memo === '') return Alert.alert(noMemo.title, noMemo.msg);

    dispatch(isFavorite ? addFavorite(editedFood) : removeFavorite(editedFood));
    dispatch(
      !selectedFood.compartmentNum
        ? editPantryFood({ foodId, editedFood })
        : editFridgeFood({ foodId, editedFood })
    );

    if (isFavoriteItem(editedFood.name)) dispatch(editFavorite(editedFood));

    setEditing(false);
  };

  return {
    editing,
    setEditing,
    editedFood,
    setEditedFood,
    editFoodInfo,
    onEditSumbit,
  };
};
