import { useDispatch, useSelector } from '../redux/hook';
import { removeFromShoppingList } from '../redux/slice/shoppingListSlice';
import { addFridgeFood } from '../redux/slice/fridgeFoodsSlice';
import { select } from '../redux/slice/selectedFoodSlice';
import { addToPantry } from '../redux/slice/pantryFoodsSlice';
import { Food } from '../constant/foodInfo';
import { alertPhrase, alertPhraseWithFood } from '../constant/alertPhrase';
import {
  addFavorite,
  editFavorite,
  removeFavorite,
} from '../redux/slice/favoriteFoodsSlice';
import { setAlertInfo, toggleAlertModal } from '../redux/slice/alertModalSlice';
import { beforePurchaseDate } from '../util';

export const useAddShoppingListFood = () => {
  const { selectedFood } = useSelector((state) => state.selectedFood);
  const { isFavorite } = useSelector((state) => state.isFavorite);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const { isMemoOpen } = useSelector((state) => state.isMemoOpen);

  const dispatch = useDispatch();

  const onChange = (info: { [key: string]: string | boolean }) => {
    dispatch(select({ ...selectedFood, ...info }));
  };

  const isFavoriteItem = (name: string) =>
    favoriteFoods.find((food) => food.name === name);

  const { wrongDate, noMemo } = alertPhrase;

  const onSubmit = (
    setModalVisible: (visible: boolean) => void,
    setCheckedList: (checkedList: Food[]) => void
  ) => {
    const { expiredDate, purchaseDate, space, memo } = selectedFood;

    if (beforePurchaseDate(purchaseDate, expiredDate)) {
      const { title, msg } = wrongDate;
      dispatch(toggleAlertModal(true));
      dispatch(setAlertInfo({ title, msg, btns: ['확인'] }));
      return;
    }

    if (isMemoOpen && memo === '') {
      const { title, msg } = noMemo;
      dispatch(toggleAlertModal(true));
      dispatch(setAlertInfo({ title, msg, btns: ['확인'] }));
      return;
    }

    isFavorite
      ? dispatch(addFavorite(selectedFood))
      : dispatch(removeFavorite(selectedFood.name));

    if (isFavoriteItem(selectedFood.name)) dispatch(editFavorite(selectedFood));

    dispatch(
      selectedFood.space === '팬트리'
        ? addToPantry(selectedFood)
        : addFridgeFood(selectedFood)
    );
    dispatch(removeFromShoppingList({ name: selectedFood.name }));

    const position =
      selectedFood.space === '팬트리'
        ? `${space}`
        : `${space} ${selectedFood.compartmentNum}칸`;

    const {
      successAdd: { title },
    } = alertPhraseWithFood(selectedFood);

    dispatch(toggleAlertModal(true));
    dispatch(
      setAlertInfo({
        title,
        msg: `${selectedFood.name} 식료품이 ${position}에 추가되었어요.`,
        btns: ['확인'],
      })
    );

    setModalVisible(false);
    setCheckedList([]);
  };

  return {
    selectedFood,
    onChange,
    onSubmit,
  };
};
