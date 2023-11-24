import { useState } from 'react';
import { useDispatch, useSelector } from '../redux/hook';
import {
  addFridgeFood,
  editFridgeFood,
  removeFridgeFood,
} from '../redux/slice/food-list/fridgeFoodsSlice';
import {
  addToPantry,
  editPantryFood,
  removePantryFood,
} from '../redux/slice/food-list/pantryFoodsSlice';
import {
  addFavorite,
  removeFavorite,
} from '../redux/slice/food-list/favoriteFoodsSlice';
import { search } from '../redux/slice/food/searchedFoodSlice';
import { useFindFood } from './useFindFood';
import {
  checkSameStorage,
  isFridgeFood,
  isPantryFood,
} from '../util/checkFoodSpace';
import { beforePurchaseDate } from '../util';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../navigation/Navigation';
import { useHandleAlert } from './useHandleAlert';
import { showOpenFoodDetailModal } from '../redux/slice/modalVisibleSlice';
import UUIDGenerator from 'react-native-uuid';

export const useEditFood = () => {
  const [editing, setEditing] = useState(false);

  const { isFavorite } = useSelector((state) => state.isFavorite);
  const { formFood, originalFood } = useSelector((state) => state.formFood);
  const {
    alertInfo: { title: alertTitle },
  } = useSelector((state) => state.alertModal);

  const myUuid = UUIDGenerator.v4();

  const navigation = useNavigation<NavigateProp>();

  const dispatch = useDispatch();

  const { isFavoriteItem } = useFindFood();

  const {
    alertWithFood,
    alertNoNameInForm,
    alertWrongDateInForm,
    setAlert,
    //
  } = useHandleAlert();

  const afterChangedPositionAlert = () => {
    const { alertMoveStorage } = alertWithFood(formFood);
    setAlert(alertMoveStorage);
  };

  const onEditSumbit = () => {
    const {
      id,
      expiredDate,
      purchaseDate,
      name: newName,
      space: newSpace,
    } = formFood;

    if (newName === '') {
      setAlert(alertNoNameInForm);
      return;
    }
    if (beforePurchaseDate(purchaseDate, expiredDate)) {
      setAlert(alertWrongDateInForm);
      return;
    }

    const editedName = newName !== formFood.name;
    const setId = !editedName
      ? id
      : editedName && isFavoriteItem(newName) // 수정한 이름이 이미 자주 먹는 식료품인 경우에는 자주 먹는 식료품 정보의 id
      ? isFavoriteItem(newName).id
      : (myUuid as string); // 이름이 수정되었고 완전히 새로운 식료품인 경우에는 새로운 id

    const food = { ...formFood, id: setId };

    // Form 정보대로 자주 먹는 식료품 목록 설정
    isFavorite
      ? dispatch(addFavorite(food))
      : dispatch(removeFavorite(newName));

    // 수정한 식료품 객체(food)를 각각의 맞는 공간에 추가
    const originSpace = originalFood.space;

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

    dispatch(showOpenFoodDetailModal(false));

    // 위치가 변경된 경우에만 search 세팅 후 navigation 이동
    const sameSpace = originSpace === newSpace;
    const sameCompartmentNum =
      formFood?.compartmentNum === originalFood?.compartmentNum;

    if (!sameSpace || !sameCompartmentNum) {
      dispatch(search(formFood.name));
    }

    if (originSpace !== newSpace) {
      afterChangedPositionAlert();
    }
  };

  return {
    formFood,
    editing,
    setEditing,
    onEditSumbit,
  };
};
