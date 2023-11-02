import { Food } from '../constant/foodInfo';
import { useDispatch, useSelector } from '../redux/hook';
import {
  addItemsToShoppingList,
  setShoppingList,
} from '../redux/slice/shoppingListSlice';
import { select } from '../redux/slice/selectedFoodSlice';
import { useRoute } from '@react-navigation/native';
import { setAllFridgeFoods } from '../redux/slice/fridgeFoodsSlice';
import { setFavoriteList } from '../redux/slice/favoriteFoodsSlice';
import { AnimationState } from './animation/useSetAnimationState';
import { toggleShowBtn } from '../redux/slice/showBtnSlice';
import { setPantry } from '../redux/slice/pantryFoodsSlice';
import { alertPhraseWithCheckList } from '../constant/alertPhrase';
import { useFindFood } from './useFindFood';
import { setAlertInfo, toggleAlertModal } from '../redux/slice/alertModalSlice';

interface Props {
  checkedList: Food[];
  setCheckedList: (checkedList: Food[]) => void;
  setModalVisible?: (modalVisible: boolean) => void;
}

export const useHandleTableItem = ({
  checkedList,
  setCheckedList,
  setModalVisible,
}: Props) => {
  const {
    alertInfo: { title: alertTitle },
  } = useSelector((state) => state.alertModal);
  const { fridgeFoods } = useSelector((state) => state.fridgeFoods);
  const { pantryFoods } = useSelector((state) => state.pantryFoods);

  const { isFavoriteItem } = useFindFood();

  const route = useRoute();

  const dispatch = useDispatch();

  const {
    deleteExpiredFoods,
    unSettingFavoriteFoods,
    deleteFromShoppingList,
    addToShoppingList,
  } = alertPhraseWithCheckList(checkedList);

  const onDeleteConfirmPress = (
    setAnimationState: (state: AnimationState) => void
  ) => {
    setAnimationState('slideup-out');
    dispatch(toggleShowBtn(false));
  };

  const alertPress = (alertPhrase: { title: string; msg: string }) => {
    const { title, msg } = alertPhrase;
    dispatch(toggleAlertModal(true));
    dispatch(setAlertInfo({ title, msg, btns: ['취소', '삭제'] }));
    return;
  };

  const onDeleteExpiredFoodPress = (animationState: AnimationState) => {
    if (animationState === 'none') return alertPress(deleteExpiredFoods); // 확인 누르면 애니메이션 상태 전환

    if (animationState === 'slideup-out') {
      const findFridgeFoodInCheckList = (fridgeFood: Food) => {
        return checkedList
          .filter((checkedFood) => checkedFood.space !== '팬트리')
          .find((checkedfood) => checkedfood.name === fridgeFood.name);
      };

      const findPantryFoodInCheckList = (pantryFood: Food) => {
        return checkedList
          .filter((checkedFood) => checkedFood.space === '팬트리')
          .find((checkedfood) => checkedfood.name === pantryFood.name);
      };

      const filteredFridge = fridgeFoods.filter(
        (fridgeFood) => !findFridgeFoodInCheckList(fridgeFood)
      );

      const filteredPantry = pantryFoods.filter(
        (pantryFood) => !findPantryFoodInCheckList(pantryFood)
      );

      dispatch(setPantry(filteredPantry));
      dispatch(setAllFridgeFoods(filteredFridge));
    }
    setCheckedList([]);
  };

  const getInfoByRoute = (route: string) => {
    return route === 'ShoppingList'
      ? { phrase: deleteFromShoppingList, fn: setShoppingList }
      : { phrase: unSettingFavoriteFoods, fn: setFavoriteList };
  };

  // 팬트리 | 쇼핑리스트 | 자주 먹는 식료품 - 아이템 삭제
  const onDeleteFoodPress = (
    animationState: AnimationState,
    allTableItems: Food[]
  ) => {
    const { name } = route;
    if (animationState === 'none')
      return alertPress(getInfoByRoute(name).phrase); // 확인 누르면 애니메이션 상태 전환

    if (animationState === 'slideup-out' && allTableItems) {
      const filteredCheckItem = allTableItems.filter(
        (food) =>
          !checkedList.find((checkedFood) => checkedFood.name === food.name)
      );
      dispatch(getInfoByRoute(name).fn(filteredCheckItem));
    }
    setCheckedList([]);
  };

  const onAddShoppingListBtnPress = () => {
    if (checkedList.length === 0) return;

    dispatch(addItemsToShoppingList(checkedList));
    if (setCheckedList) {
      const { title, msg } = addToShoppingList;
      dispatch(toggleAlertModal(true));
      dispatch(setAlertInfo({ title, msg, btns: ['확인'] }));
      return;
    }
  };

  const onAddToFridgePress = (selectedFood: Food) => {
    const favoriteItem = isFavoriteItem(selectedFood.name);
    const food = favoriteItem?.id ? favoriteItem : selectedFood;

    dispatch(select(food));
    setModalVisible && setModalVisible(true);
  };

  const onConfirmPress = (
    setAnimationState?: (state: AnimationState) => void
  ) => {
    if (
      (alertTitle === '자주 먹는 식료품 해제' ||
        alertTitle === '소비기한 주의 식료품 삭제' ||
        alertTitle === '장보기 식료품 삭제') &&
      setAnimationState
    ) {
      onDeleteConfirmPress(setAnimationState);
      dispatch(toggleAlertModal(false));
      return;
    }

    if (
      alertTitle === '장보기 목록 추가' ||
      alertTitle === '식료품 한번에 추가'
    ) {
      setCheckedList([]);
      dispatch(toggleAlertModal(false));
      return;
    }
    if (
      alertTitle === '카테고리 변경 알림' ||
      alertTitle === '이미 존재하는 식료품 알림' ||
      alertTitle === '식료품 개수 초과' ||
      alertTitle === '식료품 추가 완료'
    ) {
      dispatch(toggleAlertModal(false));
      return;
    }
  };

  return {
    onDeleteFoodPress,
    onDeleteExpiredFoodPress,
    onAddShoppingListBtnPress,
    onAddToFridgePress,
    onDeleteConfirmPress,
    onConfirmPress,
  };
};
