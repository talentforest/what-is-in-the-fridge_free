import { Alert } from 'react-native';
import { useDispatch, useSelector } from '../redux/hook';
import { removeFromShoppingList } from '../redux/slice/shoppingListSlice';
import {
  addFridgeFood,
  removeFridgeFood,
} from '../redux/slice/fridgeFoodsSlice';
import { select } from '../redux/slice/selectedFoodSlice';
import { useRoute } from '@react-navigation/native';
import { addToPantry } from '../redux/slice/pantryFoodsSlice';
import { Food } from '../constant/foodInfo';
import { alertPhrase, alertPhraseWithFood } from '../constant/alertPhrase';
import UUIDGenerator from 'react-native-uuid';

export const useAddShoppingListFood = () => {
  const { fridgeFoods } = useSelector((state) => state.fridgeFoods);
  const { selectedFood } = useSelector((state) => state.selectedFood);

  const dispatch = useDispatch();
  const route = useRoute();

  const myUuid = UUIDGenerator.v4();

  const onChange = (info: { [key: string]: string | boolean }) => {
    dispatch(select({ ...selectedFood, ...info }));
  };

  const onSubmit = (
    setModalVisible: (visible: boolean) => void,
    setCheckedList: (checkedList: Food[]) => void
  ) => {
    const newIdFood = { ...selectedFood, id: myUuid as string };

    const existFood = fridgeFoods.find((food) => food.name === newIdFood.name);
    if (existFood) {
      if (route.name !== 'ShoppingList') {
        const { exist } = alertPhraseWithFood(existFood);
        return Alert.alert(exist.title, exist.msg);
      }
      dispatch(removeFridgeFood({ id: existFood.id }));
    }

    const { wrongDate } = alertPhrase;
    const { expiredDate, purchaseDate, compartmentNum, space } = newIdFood;
    if (new Date(expiredDate).getTime() < new Date(purchaseDate).getTime()) {
      return Alert.alert(wrongDate.title, wrongDate.msg);
    }

    dispatch(
      compartmentNum ? addFridgeFood(newIdFood) : addToPantry(newIdFood)
    );
    dispatch(removeFromShoppingList({ name: newIdFood.name }));

    const position = compartmentNum ? `${space} ${compartmentNum}` : `${space}`;
    const { successAdd } = alertPhraseWithFood(newIdFood);
    Alert.alert(successAdd.title, `${position}에 추가되었어요.`);

    setModalVisible(false);
    setCheckedList([]);
  };

  return {
    selectedFood,
    onChange,
    onSubmit,
  };
};
