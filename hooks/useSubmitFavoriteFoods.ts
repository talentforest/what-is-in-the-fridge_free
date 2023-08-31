import { Alert, Keyboard } from 'react-native';
import { useDispatch, useSelector } from '../redux/hook';
import { addFavorite } from '../redux/slice/favoriteFoodsSlice';
import { setAllFoods } from '../redux/slice/allFoodsSlice';
import { initialFoodInfo } from '../constant/foods';
import { Category } from '../constant/foodCategories';
import UUIDGenerator from 'react-native-uuid';

export const useSubmitFavoriteFoods = () => {
  const { allFoods } = useSelector((state) => state.allFoods);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const dispatch = useDispatch();

  const myUuid = UUIDGenerator.v4();

  const existFavoriteFoods = favoriteFoods.filter(
    (favoriteFood) => !!allFoods.find((food) => food.name === favoriteFood.name)
  );

  const nonExistFavoriteFoods = favoriteFoods.filter(
    (favoriteFood) => !allFoods.find((food) => food.name === favoriteFood.name)
  );

  const findFavoriteListItem = (name: string) => {
    return favoriteFoods.find((favoriteFood) => favoriteFood.name === name);
  };

  const onSubmitFavoriteListItem = (
    inputValue: string,
    category: Category | '',
    setInputValue: (value: string) => void,
    setCategory: (category: Category | '') => void,
    setShowCaution: (caution: boolean) => void
  ) => {
    if (inputValue === '') return Keyboard.dismiss();

    // 카테고리를 설정하지 않았을 때
    if (category === '') return setShowCaution(true);

    // 자주 먹는 식료품 이미 있다면 알림
    if (findFavoriteListItem(inputValue)) {
      return Alert.alert(
        '자주 먹는 식료품 존재 알림',
        '이미 자주 먹는 식료품으로 존재하고 있습니다.',
        [
          {
            text: '확인',
            onPress: () => {
              setInputValue('');
              setCategory('');
            },
            style: 'default',
          },
        ]
      );
    }

    // 자주 먹는 식료품은 아닌데 냉장고에 있는 경우 -> 냉장고에 이미 있는 식료품을 찾아서 자주 먹는 식료품으로 변경
    const existFood = allFoods.find((food) => food.name === inputValue);
    if (existFood) {
      // 카테고리도 같이 바꾸기
      const changedFoodList = allFoods.map((food) =>
        existFood.name === food.name
          ? { ...existFood, favorite: true, category }
          : food
      );
      dispatch(addFavorite({ ...existFood, favorite: true, category }));
      dispatch(setAllFoods(changedFoodList));
    }

    // 냉장고에도 없는 아예 새로운 식료품을 새로 자주 먹는 식료품으로 추가할 때 -> 추가하기만
    if (!existFood) {
      dispatch(
        addFavorite({
          ...initialFoodInfo,
          id: myUuid as string,
          name: inputValue,
          favorite: true,
          category,
        })
      );
    }

    setCategory('');
    setInputValue('');
  };

  return {
    existFavoriteFoods,
    nonExistFavoriteFoods,
    findFavoriteListItem,
    onSubmitFavoriteListItem,
  };
};
