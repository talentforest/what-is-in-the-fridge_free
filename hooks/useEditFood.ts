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
import { addFavorite, removeFavorite } from '../redux/slice/favoriteFoodsSlice';
import { Space } from '../constant/fridgeInfo';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../navigation/Navigation';
import { search } from '../redux/slice/searchedFoodSlice';
import { useFindFood } from './useFindFood';
import {
  checkSameStorage,
  isFridgeFood,
  isPantryFood,
} from '../util/checkFoodSpace';
import UUIDGenerator from 'react-native-uuid';

export const useEditFood = () => {
  const { isFavorite } = useSelector((state) => state.isFavorite);
  const { isMemoOpen } = useSelector((state) => state.isMemoOpen);
  const { selectedFood } = useSelector((state) => state.selectedFood);

  const [editedFood, setEditedFood] = useState(selectedFood);
  const [editing, setEditing] = useState(false);

  const myUuid = UUIDGenerator.v4();

  const navigation = useNavigation<NavigateProp>();
  const dispatch = useDispatch();
  const { isFavoriteItem } = useFindFood();

  useEffect(() => {
    setEditedFood(selectedFood);
  }, [selectedFood]);

  const editFoodInfo = (newInfo: FoodInfo) =>
    setEditedFood({ ...editedFood, ...newInfo });

  const afterChangedPositionAlert = (newSpace: Space) => {
    const { moveStorage } = alertPhraseWithFood(editedFood);
    return Alert.alert(moveStorage.title, moveStorage.msg, [
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
  };

  const onEditSumbit = (setModalVisible: (visible: boolean) => void) => {
    const {
      id,
      expiredDate,
      purchaseDate,
      memo,
      name: newName,
      space: newSpace,
    } = editedFood;

    // check valid
    const { noName, wrongDate, noMemo } = alertPhrase;
    if (newName === '') return Alert.alert(noName.title, noName.msg);
    const isWrongDate =
      new Date(expiredDate).getTime() < new Date(purchaseDate).getTime();
    if (isWrongDate) return Alert.alert(wrongDate.title, wrongDate.msg);
    if (isMemoOpen && memo === '') return Alert.alert(noMemo.title, noMemo.msg);

    // change id by isEditedName, isFavoriteItem(newName)
    const isEditedName = newName !== selectedFood.name;
    const setId = !isEditedName
      ? id
      : isEditedName && isFavoriteItem(newName) // 수정한 이름이 이미 자주 먹는 식료품인 경우 해당 정보의 id
      ? isFavoriteItem(newName).id
      : (myUuid as string); // 이름이 수정된 경우에는 새로운 id

    const food = { ...editedFood, id: setId };

    // 자주 먹는 식료품 정보대로 자주 먹는 식료품 목록 설정
    isFavorite
      ? dispatch(addFavorite(food))
      : dispatch(removeFavorite(newName));

    // 수정한 식료품 객체(food)를 각각의 맞는 공간에 추가
    const originSpace = selectedFood.space;
    if (checkSameStorage(originSpace, newSpace)) {
      dispatch(
        originSpace === '팬트리'
          ? editPantryFood({ id, food })
          : editFridgeFood({ id, food })
      );
    }
    if (!checkSameStorage(originSpace, newSpace)) {
      if (isPantryFood(newSpace)) {
        dispatch(removeFridgeFood(id));
        dispatch(addToPantry(food));
      }
      if (isFridgeFood(newSpace)) {
        dispatch(removePantryFood(id));
        dispatch(addFridgeFood(food));
      }
    }

    setEditing(false);
    setModalVisible(false);

    // 위치가 변경된 경우에만 search 세팅 후 navigation 이동
    const sameSpace = originSpace === newSpace;
    const sameCompartmentNum =
      selectedFood?.compartmentNum === editedFood?.compartmentNum;
    if (!sameSpace || !sameCompartmentNum) {
      dispatch(search(editedFood.name));
    }
    if (originSpace !== newSpace) {
      afterChangedPositionAlert(newSpace);
    }
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
