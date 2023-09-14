import { useState } from 'react';
import { Food, FoodInfo } from '../constant/foodInfo';
import { useDispatch, useSelector } from '../redux/hook';
import { editFridgeFood } from '../redux/slice/fridgeFoodsSlice';
import { Alert } from 'react-native';
import { editPantryFood } from '../redux/slice/pantryFoodsSlice';
import { alertPhrase } from '../constant/alertPhrase';
import { addFavorite, removeFavorite } from '../redux/slice/favoriteFoodsSlice';

export const useEditFood = ({ food }: { food: Food }) => {
  const [editedFood, setEditedFood] = useState(food);
  const [editing, setEditing] = useState(false);
  const { isFavorite } = useSelector((state) => state.isFavorite);

  const dispatch = useDispatch();

  const editFoodInfo = (newInfo: FoodInfo) => {
    return setEditedFood({ ...editedFood, ...newInfo });
  };

  const onEditSumbit = (
    foodId: string,
    setModalVisible?: (modalVisible: boolean) => void
  ) => {
    const { expiredDate, purchaseDate } = editedFood;
    const { wrongDate } = alertPhrase;

    if (new Date(expiredDate).getTime() < new Date(purchaseDate).getTime()) {
      return Alert.alert(wrongDate.title, wrongDate.msg);
    }

    isFavorite
      ? dispatch(addFavorite(editedFood))
      : dispatch(removeFavorite(editedFood));

    if (!food.compartmentNum && setModalVisible) {
      dispatch(editPantryFood({ foodId, editedFood }));
      setModalVisible(false);
    } else {
      dispatch(editFridgeFood({ foodId, editedFood }));
      setEditing(false);
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
