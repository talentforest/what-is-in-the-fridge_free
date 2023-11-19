import { useDispatch, useSelector } from '../redux/hook';
import { initialFridgeFood, initialPantryFood } from '../constant/foodInfo';
import { addFridgeFood } from '../redux/slice/fridgeFoodsSlice';
import { FoodPosition } from '../constant/fridgeInfo';
import { addToPantry } from '../redux/slice/pantryFoodsSlice';
import {
  AlertObj,
  alertPhrase,
  alertPhraseWithFood,
} from '../constant/alertPhrase';
import { addFavorite, editFavorite } from '../redux/slice/favoriteFoodsSlice';
import { setAlertInfo, toggleAlertModal } from '../redux/slice/alertModalSlice';
import { beforePurchaseDate } from '../util';
import { toggleMemoOpen } from '../redux/slice/isMemoOpenSlice';
import { setFormFood } from '../redux/slice/formFoodSlice';
import { useFindFood } from './useFindFood';
import UUIDGenerator from 'react-native-uuid';

interface Props {
  setModalVisible: (modalVisible: boolean) => void;
  currPosition?: FoodPosition;
}

export const useAddFood = ({ currPosition, setModalVisible }: Props) => {
  const initialFood = currPosition ? initialFridgeFood : initialPantryFood;

  const { formFood } = useSelector((state) => state.formFood);
  const { isFavorite } = useSelector((state) => state.isFavorite);
  const { isMemoOpen } = useSelector((state) => state.isMemoOpen);

  const dispatch = useDispatch();
  const myUuid = UUIDGenerator.v4();

  const { isFavoriteItem, findFood } = useFindFood();

  const showAlert = (alert: AlertObj) => {
    const { title, msg } = alert;
    dispatch(toggleAlertModal(true));
    dispatch(setAlertInfo({ title, msg, btns: ['확인'] }));
  };

  const onAddSubmit = (
    setModalVisible: (visible: boolean) => void,
    modalVisible: boolean
  ) => {
    if (!modalVisible) return;

    const { name, category, expiredDate, purchaseDate } = formFood;

    const { noName, wrongDate } = alertPhrase;

    if (name === '') {
      showAlert(noName);
      return;
    }
    if (beforePurchaseDate(purchaseDate, expiredDate)) {
      showAlert(wrongDate);
      return;
    }
    if (findFood(name)) {
      showAlert(alertPhraseWithFood(findFood(name)).exist);
      return;
    }

    // 위의 validation 통과했다면 아래 로직 진행
    const foodToAdd = {
      ...formFood,
      id: isFavoriteItem(name)?.id || (myUuid as string),
      category: isFavoriteItem(name)?.category || category,
      space: currPosition?.space || '팬트리',
    };

    if (isFavoriteItem(name)) {
      // 자주 먹는 식료품인 식품을 냉장고나 팬트리에 추가할 때 자주 먹는 식료품 공간 정보도 변경.
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

    setModalVisible(false);

    if (isMemoOpen) {
      toggleMemoOpen(false);
    }

    dispatch(setFormFood(initialFood));
  };

  const closeAddFoodModal = () => {
    dispatch(setFormFood({ ...initialFood }));
    setModalVisible(false);
  };

  return {
    formFood,
    closeAddFoodModal,
    onAddSubmit,
  };
};
