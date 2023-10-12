import { useEffect, useState } from 'react';
import { FoodInfo } from '../constant/foodInfo';
import { useDispatch, useSelector } from '../redux/hook';
import {
  addFridgeFood,
  editFridgeFood,
  removeFridgeFood,
} from '../redux/slice/fridgeFoodsSlice';
import { Alert } from 'react-native';
import {
  addToPantry,
  editPantryFood,
  removePantryFood,
} from '../redux/slice/pantryFoodsSlice';
import { alertPhrase, alertPhraseWithFood } from '../constant/alertPhrase';
import {
  addFavorite,
  editFavorite,
  removeFavorite,
} from '../redux/slice/favoriteFoodsSlice';
import { Space } from '../constant/fridgeInfo';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../navigation/Navigation';
import { search } from '../redux/slice/searchedFoodSlice';

export const useEditFood = () => {
  const { isFavorite } = useSelector((state) => state.isFavorite);
  const { isMemoOpen } = useSelector((state) => state.isMemoOpen);
  const { selectedFood } = useSelector((state) => state.selectedFood);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);

  const [editedFood, setEditedFood] = useState(selectedFood);
  const [editing, setEditing] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation<NavigateProp>();

  useEffect(() => {
    setEditedFood(selectedFood);
  }, [selectedFood]);

  const editFoodInfo = (newInfo: FoodInfo) =>
    setEditedFood({ ...editedFood, ...newInfo });

  const isFavoriteItem = (name: string) =>
    favoriteFoods.find((food) => food.name === name);

  const fridgeFood = (space: Space) => {
    return space.includes('냉장실') || space.includes('냉동실');
  };

  const checkSameStorage = (originSpace: Space, newSpace: Space) => {
    const sameFridge = fridgeFood(originSpace) && fridgeFood(newSpace);
    const samePantry = !fridgeFood(originSpace) && !fridgeFood(newSpace);
    return samePantry || sameFridge;
  };

  const onEditSumbit = (
    foodId: string,
    setModalVisible: (visible: boolean) => void
  ) => {
    const { expiredDate, purchaseDate, memo, space: newSpace, id } = editedFood;

    const { wrongDate, noMemo } = alertPhrase;
    if (new Date(expiredDate).getTime() < new Date(purchaseDate).getTime())
      return Alert.alert(wrongDate.title, wrongDate.msg);

    if (isMemoOpen && memo === '') return Alert.alert(noMemo.title, noMemo.msg);

    dispatch(isFavorite ? addFavorite(editedFood) : removeFavorite(editedFood));

    if (isFavoriteItem(editedFood.name)) dispatch(editFavorite(editedFood));

    const originSpace = selectedFood.space;
    if (checkSameStorage(originSpace, newSpace)) {
      dispatch(
        newSpace === '팬트리'
          ? editPantryFood({ foodId, editedFood })
          : editFridgeFood({ foodId, editedFood })
      );
    } else {
      if (originSpace.includes('팬트리')) {
        dispatch(removePantryFood({ id }));
        dispatch(addFridgeFood(editedFood));
      }
      if (originSpace.includes('냉장실') || originSpace.includes('냉동실')) {
        dispatch(removeFridgeFood({ id }));
        dispatch(addToPantry(editedFood));
      }
    }
    // 위치가 변경된 경우에만
    if (
      originSpace !== newSpace ||
      selectedFood?.compartmentNum !== editedFood?.compartmentNum
    ) {
      dispatch(search(editedFood.name));
    }

    setEditing(false);
    setModalVisible(false);

    const {
      moveStorage: { title, msg },
    } = alertPhraseWithFood(editedFood);

    if (originSpace !== newSpace)
      return Alert.alert(title, msg, [
        {
          text: '취소',
          style: 'destructive',
        },
        {
          text: '확인',
          onPress: () => {
            editedFood.space === '팬트리'
              ? navigation.navigate('PantryFoods')
              : navigation.navigate('Compartments', { space: newSpace });
          },
          style: 'default',
        },
      ]);
    //
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
