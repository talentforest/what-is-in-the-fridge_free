import { useDispatch, useSelector } from '../redux/hook';
import { removeFromShoppingList } from '../redux/slice/food-list/shoppingListSlice';
import { addFridgeFood } from '../redux/slice/food-list/fridgeFoodsSlice';
import { addToPantry } from '../redux/slice/food-list/pantryFoodsSlice';
import {
  addFavorite,
  editFavorite,
  removeFavorite,
} from '../redux/slice/food-list/favoriteFoodsSlice';
import { beforePurchaseDate } from '../util';
import { useFindFood } from './useFindFood';
import { toggleMemoOpen } from '../redux/slice/food/isMemoOpenSlice';
import { useHandleAlert } from './useHandleAlert';
import { setCheckedList } from '../redux/slice/food-list/checkListSlice';
import { showFormModal } from '../redux/slice/modalVisibleSlice';

export const useAddShoppingListFood = () => {
  const { formFood } = useSelector((state) => state.formFood);
  const { isFavorite } = useSelector((state) => state.isFavorite);
  const { isMemoOpen } = useSelector((state) => state.isMemoOpen);

  const { isFavoriteItem } = useFindFood();

  const closeFormModal = () => {
    dispatch(showFormModal(false));
  };

  const {
    alertWrongDateInForm,
    setAlert,
    alertWithFood, //
  } = useHandleAlert();

  const dispatch = useDispatch();

  const onShoppingListFoodSubmit = () => {
    const { expiredDate, purchaseDate } = formFood;

    if (beforePurchaseDate(purchaseDate, expiredDate)) {
      setAlert(alertWrongDateInForm);
      return;
    }

    // 위의 validation 통과했다면 아래 로직 진행
    isFavorite
      ? dispatch(addFavorite(formFood))
      : dispatch(removeFavorite(formFood.name));

    if (isFavoriteItem(formFood.name)) dispatch(editFavorite(formFood));

    dispatch(
      formFood.space === '팬트리'
        ? addToPantry(formFood)
        : addFridgeFood(formFood)
    );

    dispatch(removeFromShoppingList({ name: formFood.name }));

    const { alertSuccessAddFood } = alertWithFood(formFood);
    setAlert(alertSuccessAddFood);

    dispatch(showFormModal(false));

    if (isMemoOpen) {
      toggleMemoOpen(false);
    }

    dispatch(setCheckedList([]));
  };

  return {
    formFood,
    closeFormModal,
    onShoppingListFoodSubmit,
  };
};
