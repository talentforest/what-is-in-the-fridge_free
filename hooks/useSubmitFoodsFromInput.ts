import { Alert, Keyboard } from 'react-native';
import { useDispatch, useSelector } from '../redux/hook';
import { addFavorite } from '../redux/slice/favoriteFoodsSlice';
import { Food, initialFridgeFood } from '../constant/foodInfo';
import { Category } from '../constant/foodCategories';
import { addToShoppingList } from '../redux/slice/shoppingListSlice';
import { AnimationState } from './animation/useSetAnimationState';
import UUIDGenerator from 'react-native-uuid';

export const useSubmitFoodsFromInput = () => {
  const { pantryFoods } = useSelector((state) => state.pantryFoods);
  const { fridgeFoods } = useSelector((state) => state.fridgeFoods);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);

  const dispatch = useDispatch();
  const myUuid = UUIDGenerator.v4();

  const findFood = (name: string) => {
    return [...pantryFoods, ...fridgeFoods].find((food) => food.name === name);
  };

  const onSubmitFavoriteListItem = (
    inputValue: string,
    category: Category,
    setInputValue: (value: string) => void,
    setShowCaution: (caution: boolean) => void
  ) => {
    if (inputValue === '') return Keyboard.dismiss();

    const existFavoriteFood = favoriteFoods.find(
      (food) => food.name === inputValue
    );
    if (existFavoriteFood) return setShowCaution(true);

    if (findFood(inputValue)) {
      Alert.alert(
        '동일 식료품 존재 알림',
        `동일한 이름의 식료품이 ${
          findFood(inputValue)?.space
        }에 있습니다. 해당 카테고리 정보로 저장됩니다.`,
        [
          {
            text: '저장',
            onPress: () => {
              dispatch(addFavorite(findFood(inputValue) as Food));
            },
            style: 'default',
          },
        ]
      );
    } else {
      dispatch(
        addFavorite({
          ...initialFridgeFood,
          id: myUuid as string,
          name: inputValue,
          category,
        })
      );
    }
    setInputValue('');
  };

  const onSubmitShoppingListItem = (
    name: string,
    setAnimationState: (state: AnimationState) => void
  ) => {
    const { expiredDate, purchaseDate } = initialFridgeFood;

    const food = Object.keys(findFood(name) || {}).length
      ? ({
          ...findFood(name),
          expiredDate,
          purchaseDate,
        } as Food)
      : {
          ...initialFridgeFood,
          id: myUuid as string,
          name,
        };

    dispatch(addToShoppingList(food));
    setAnimationState('slidedown-in');
  };

  return {
    onSubmitFavoriteListItem,
    onSubmitShoppingListItem,
  };
};
