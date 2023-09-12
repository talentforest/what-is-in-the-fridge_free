import { useState } from 'react';
import { Food, FoodInfo } from '../constant/foodInfo';
import { useDispatch } from '../redux/hook';
import { editFridgeFood } from '../redux/slice/fridgeFoodsSlice';
import {
  addFavorite,
  editFavorite,
  removeFavorite,
} from '../redux/slice/favoriteFoodsSlice';
import { Alert } from 'react-native';
import { editPantryFood } from '../redux/slice/pantryFoodsSlice';
import { alertPhrase } from '../constant/alertPhrase';

export const useEditFood = ({ food }: { food: Food }) => {
  const [editedFood, setEditedFood] = useState(food);
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();

  const editFoodInfo = (newInfo: FoodInfo) => {
    return setEditedFood({ ...editedFood, ...newInfo });
  };

  const onEditSumbit = (
    foodId: string,
    setModalVisible: (modalVisible: boolean) => void
  ) => {
    const { expiredDate, purchaseDate } = editedFood;
    const { wrongDate } = alertPhrase;
    if (new Date(expiredDate).getTime() < new Date(purchaseDate).getTime()) {
      return Alert.alert(wrongDate.title, wrongDate.msg);
    }
    if (editedFood.favorite) {
      dispatch(editFavorite(editedFood));
      dispatch(addFavorite(editedFood));
    } else {
      dispatch(removeFavorite({ name: editedFood.name }));
    }
    if (food.compartmentNum) {
      dispatch(editFridgeFood({ foodId, editedFood }));
      setEditing(false);
    } else {
      dispatch(editPantryFood({ foodId, editedFood }));
      setModalVisible(false);
    }
  };

  return {
    editing,
    setEditing,
    editedFood,
    editFoodInfo,
    onEditSumbit,
  };
};
