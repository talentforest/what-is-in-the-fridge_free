import { useState } from 'react';
import { useDispatch, useSelector } from '../redux/hook';
import {
  addFridgeFood,
  editFridgeFood,
  removeFridgeFood,
} from '../redux/slice/fridgeFoodsSlice';
import {
  addToPantry,
  editPantryFood,
  removePantryFood,
} from '../redux/slice/pantryFoodsSlice';
import {
  AlertObj,
  AlertPhraseObj,
  alertPhrase,
  alertPhraseWithFood,
} from '../constant/alertPhrase';
import { addFavorite, removeFavorite } from '../redux/slice/favoriteFoodsSlice';
import { search } from '../redux/slice/searchedFoodSlice';
import { useFindFood } from './useFindFood';
import {
  checkSameStorage,
  isFridgeFood,
  isPantryFood,
} from '../util/checkFoodSpace';
import { setAlertInfo, toggleAlertModal } from '../redux/slice/alertModalSlice';
import { beforePurchaseDate } from '../util';
import UUIDGenerator from 'react-native-uuid';

export const useEditFood = () => {
  const [editing, setEditing] = useState(false);

  const { isFavorite } = useSelector((state) => state.isFavorite);
  const { formFood, originalFood } = useSelector((state) => state.formFood);
  const {
    alertInfo: { title: alertTitle },
  } = useSelector((state) => state.alertModal);

  const myUuid = UUIDGenerator.v4();

  const dispatch = useDispatch();

  const { isFavoriteItem } = useFindFood();

  const afterChangedPositionAlert = () => {
    const {
      moveStorage: { title, msg },
    } = alertPhraseWithFood(formFood);

    dispatch(toggleAlertModal(true));
    dispatch(setAlertInfo({ title, msg, btns: ['확인'] }));
  };

  const showAlert = (alert: AlertObj) => {
    const { title, msg } = alert;
    dispatch(toggleAlertModal(true));
    dispatch(setAlertInfo({ title, msg, btns: ['확인'] }));
  };

  const onEditSumbit = (setModalVisible: (visible: boolean) => void) => {
    const {
      id,
      expiredDate,
      purchaseDate,
      name: newName,
      space: newSpace,
    } = formFood;

    const { noName, wrongDate } = alertPhrase;
    if (newName === '') {
      showAlert(noName);
      return;
    }
    if (beforePurchaseDate(purchaseDate, expiredDate)) {
      showAlert(wrongDate);
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

    setModalVisible(false);

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

  const onAlertComfirmPress = () => {
    if (
      alertTitle === '이미 갖고 있는 식료품' ||
      alertTitle === '식료품 이름 미작성' ||
      alertTitle === '유효하지 않은 소비기한'
    ) {
      return dispatch(toggleAlertModal(false));
    }
    if (
      alertTitle === '식료품 이동 알림' ||
      alertTitle === '식료품 개수 한도 도달'
    ) {
      return dispatch(toggleAlertModal(false));
    }
  };

  return {
    formFood,
    editing,
    setEditing,
    onEditSumbit,
    onAlertComfirmPress,
  };
};
