import { useDispatch, useSelector } from '../redux/hook';
import { removeFromShoppingList } from '../redux/slice/shoppingListSlice';
import { addFridgeFood } from '../redux/slice/fridgeFoodsSlice';
import { addToPantry } from '../redux/slice/pantryFoodsSlice';
import { Food } from '../constant/foodInfo';
import {
  AlertObj,
  alertPhrase,
  alertPhraseWithFood,
} from '../constant/alertPhrase';
import {
  addFavorite,
  editFavorite,
  removeFavorite,
} from '../redux/slice/favoriteFoodsSlice';
import { setAlertInfo, toggleAlertModal } from '../redux/slice/alertModalSlice';
import { beforePurchaseDate } from '../util';
import { useFindFood } from './useFindFood';
import { toggleMemoOpen } from '../redux/slice/isMemoOpenSlice';

export const useAddShoppingListFood = () => {
  const { formFood } = useSelector((state) => state.formFood);
  const { isFavorite } = useSelector((state) => state.isFavorite);
  const { isMemoOpen } = useSelector((state) => state.isMemoOpen);

  const dispatch = useDispatch();

  const { isFavoriteItem } = useFindFood();

  const showAlert = (alert: AlertObj) => {
    const { title, msg } = alert;
    dispatch(toggleAlertModal(true));
    dispatch(setAlertInfo({ title, msg, btns: ['확인'] }));
  };

  const onShoppingListFoodSubmit = (
    setModalVisible: (visible: boolean) => void,
    setCheckedList: (checkedList: Food[]) => void
  ) => {
    const { expiredDate, purchaseDate } = formFood;

    if (beforePurchaseDate(purchaseDate, expiredDate)) {
      showAlert(alertPhrase.wrongDate);
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

    showAlert(alertPhraseWithFood(formFood).successAdd);

    setModalVisible(false);

    if (isMemoOpen) {
      toggleMemoOpen(false);
    }

    setCheckedList([]);
  };

  return {
    formFood,
    onShoppingListFoodSubmit,
  };
};
