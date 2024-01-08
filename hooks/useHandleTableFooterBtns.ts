import { Food, MAX_LIMIT, initialFridgeFood } from '../constant/foodInfo';
import { useDispatch, useSelector } from '../redux/hook';
import { useFindFood } from './useFindFood';
import { setFormFood } from '../redux/slice/food/formFoodSlice';
import { MAX_NUM_ADD_AT_ONCE, useHandleAlert } from './useHandleAlert';
import { useRouteName } from './useRouteName';
import {
  showAddAtOnceModal,
  showFormModal,
} from '../redux/slice/modalVisibleSlice';

export const useHandleTableFooterBtns = () => {
  const { checkedList } = useSelector((state) => state.checkedList);
  const { purchased } = useSelector((state) => state.purchaseState);

  const { isFavoriteItem, allFoods, findFood } = useFindFood();

  const { routeHome, routeFavoriteFoods } = useRouteName();

  const dispatch = useDispatch();

  const onAddToFridgePress = (selectedFood: Food) => {
    const favoriteItem = isFavoriteItem(selectedFood.name);
    const food = favoriteItem?.id ? favoriteItem : selectedFood;
    dispatch(setFormFood(food));
    dispatch(showFormModal(true));
  };

  const {
    alertWithCheckList,
    setAlert,
    alertReachedLimit,
    alertAlreadyHasFood,
    alertAddAtOnceLimit,
  } = useHandleAlert();

  const {
    alertDeleteExpiredFoods,
    alertAddToShoppingList,
    alertDeleteFromShoppingList,
    alertDeleteFavoriteFoods,
  } = alertWithCheckList();

  const deleteAlert = routeHome
    ? alertDeleteFromShoppingList
    : routeFavoriteFoods
    ? alertDeleteFavoriteFoods
    : alertDeleteExpiredFoods;

  const onDeleteBtnPress = () => setAlert(deleteAlert);

  const onAddShoppingListBtnPress = () => setAlert(alertAddToShoppingList);

  const onAddAtOnceBtnPress = () => {
    if (!purchased && allFoods.length + checkedList.length > MAX_LIMIT) {
      const limitReached = MAX_LIMIT === allFoods.length;
      const canAddNum = MAX_LIMIT - allFoods.length;
      const msg =
        canAddNum > 0
          ? `식료품 저장 최대 한도인 ${MAX_LIMIT}개를 초과하게 되므로 ${
              limitReached
                ? ''
                : `${canAddNum}개의 식료품만 더 추가하실 수 있어요.`
            } 식료품을 더 많이 추가하고 싶다면 한번만 결제하면 되는 이용권을 구매하러 가볼까요?`
          : alertReachedLimit.msg;
      setAlert({ ...alertReachedLimit, msg });
      return;
    }

    const hasCheckListFood = checkedList.some((food) => findFood(food.name));
    if (hasCheckListFood) {
      setAlert(alertAlreadyHasFood);
      return;
    }

    if (checkedList.length > MAX_NUM_ADD_AT_ONCE) {
      setAlert(alertAddAtOnceLimit);
      return;
    }
    dispatch(setFormFood(initialFridgeFood));
    dispatch(showAddAtOnceModal(true));
  };

  return {
    onAddToFridgePress,
    onDeleteBtnPress,
    onAddShoppingListBtnPress,
    onAddAtOnceBtnPress,
  };
};
