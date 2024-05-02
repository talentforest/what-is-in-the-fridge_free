import { useDispatch, useSelector } from '../redux/hook';
import { initialFridgeFood, initialPantryFood } from '../constant/foodInfo';
import { addFridgeFood } from '../redux/slice/food-list/fridgeFoodsSlice';
import { FoodPosition } from '../constant/fridgeInfo';
import { addToPantry } from '../redux/slice/food-list/pantryFoodsSlice';
import {
  addFavorite,
  editFavorite,
} from '../redux/slice/food-list/favoriteFoodsSlice';
import { beforePurchaseDate } from '../util';
import {
  toggleExpiredItemClosed,
  toggleMemoOpen,
  togglePurchaseItemOpen,
} from '../redux/slice/food/isMemoOpenSlice';
import { setFormFood } from '../redux/slice/food/formFoodSlice';
import { useFindFood } from './useFindFood';
import { useHandleAlert } from './useHandleAlert';
import { showOpenAddFoodModal } from '../redux/slice/modalVisibleSlice';
import { addInFoodHistoryList } from '../redux/slice/food-list/foodHistoryListSlice';
import UUIDGenerator from 'react-native-uuid';

export const useAddFood = (currPosition?: FoodPosition) => {
  const initialFood = currPosition ? initialFridgeFood : initialPantryFood;

  const {
    openAddFoodModal: { modalVisible },
  } = useSelector((state) => state.modalVisible);
  const { formFood } = useSelector((state) => state.formFood);
  const { isFavorite } = useSelector((state) => state.isFavorite);
  const { isMemoOpen, isExpiredItemClosed, isPurchaseItemOpen } = useSelector(
    (state) => state.isFormItemOpen
  );

  const dispatch = useDispatch();
  const myUuid = UUIDGenerator.v4();

  const { isFavoriteItem, findFood } = useFindFood();

  const food = findFood(formFood.name);

  const {
    alertNoNameInForm,
    alertWrongDateInForm,
    alertWithFood,
    setAlert, //
  } = useHandleAlert();

  const onAddSubmit = () => {
    if (!modalVisible) return;

    const { name, category, expiredDate, purchaseDate } = formFood;

    if (name === '') {
      setAlert(alertNoNameInForm);
      return;
    }
    if (beforePurchaseDate(purchaseDate, expiredDate)) {
      setAlert(alertWrongDateInForm);
      return;
    }
    if (findFood(name)) {
      const { alertFoodPosition } = alertWithFood(food);
      setAlert(alertFoodPosition);
      return;
    }

    // 위의 validation 통과했다면 아래 로직 진행
    const foodToAdd = {
      ...formFood,
      id: isFavoriteItem(name)?.id || (myUuid as string),
      category: isFavoriteItem(name)?.category || category,
      space: currPosition?.space || '실온보관',
    };

    if (isFavoriteItem(name)) {
      // 자주 먹는 식료품인 식품을 냉장고나 실온보관에 추가할 때 자주 먹는 식료품 공간 정보도 변경.
      dispatch(editFavorite(foodToAdd));
    }

    if (isFavorite) {
      dispatch(addFavorite(foodToAdd));
    }

    if (currPosition) {
      const { compartmentNum } = currPosition;
      dispatch(addFridgeFood({ ...foodToAdd, compartmentNum }));
    } else {
      dispatch(addToPantry(foodToAdd));
    }

    dispatch(showOpenAddFoodModal(false));

    dispatch(addInFoodHistoryList(foodToAdd.name));

    if (isMemoOpen) {
      dispatch(toggleMemoOpen(false));
    }

    if (isExpiredItemClosed) {
      dispatch(toggleExpiredItemClosed(false));
    }

    if (isPurchaseItemOpen) {
      dispatch(togglePurchaseItemOpen(false));
    }

    dispatch(setFormFood(initialFood));
  };

  const closeAddFoodModal = () => {
    dispatch(setFormFood({ ...initialFood }));
    dispatch(showOpenAddFoodModal(false));
  };

  return {
    formFood,
    closeAddFoodModal,
    onAddSubmit,
  };
};
