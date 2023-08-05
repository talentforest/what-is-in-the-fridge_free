import { useDispatch } from 'react-redux';
import { useSelector } from '../redux/hook';
import { useRoute } from '@react-navigation/native';
import { Food } from '../constant/foods';
import { setAllFoods } from '../redux/slice/allFoodsSlice';
import { setFavoriteList } from '../redux/slice/favoriteFoodsSlice';
import { setShoppingList } from '../redux/slice/shoppingList';
import { Alert } from 'react-native';

export default function useDeleteTableItem(
  checkedList: Food[],
  setCheckList: (food: Food[]) => void
) {
  const { allFoods } = useSelector((state) => state.allFoods);

  const route = useRoute();
  const dispatch = useDispatch();

  const changeFavState = () => {
    return allFoods.map((food) => {
      const favFood = checkedList.some((item) => item.id === food.id);
      return favFood ? { ...food, favorite: false } : food;
    });
  };

  const deleteGuide = () => {
    if (route.name === 'FavoriteFoods') {
      return {
        title: '자주 먹는 식료품 해제',
        guide: `총 ${checkedList.length}개의 식료품을 자주 먹는 식료품에서 해제하시겠습니까?`,
      };
    }
    if (route.name === 'ExpiredFoods') {
      return {
        title: '유통기한 주의 식료품 삭제',
        guide: `총 ${checkedList.length}개의 식료품을 냉장고에서 삭제하시겠습니까?`,
      };
    }
    return {
      title: '식료품 삭제',
      guide: `총 ${checkedList.length}개의 식료품을 목록에서 삭제하시겠습니까?`,
    };
  };

  const onDeleteAlert = (filteredArr: Food[]) => {
    const onDelete = (filteredArr: Food[]) => {
      if (route.name === 'ExpiredFoods') {
        dispatch(setAllFoods(filteredArr));
      }
      if (route.name === 'FavoriteFoods') {
        dispatch(setAllFoods(changeFavState()));
        dispatch(setFavoriteList(filteredArr));
      }
      if (route.name === 'ShoppingList') {
        dispatch(setShoppingList(filteredArr));
      }
      setCheckList([]);
    };
    return Alert.alert(deleteGuide().title, deleteGuide().guide, [
      { text: '취소', style: 'destructive' },
      {
        text: route.name === 'FavoriteFoods' ? '해제' : '삭제',
        onPress: () => onDelete(filteredArr),
        style: 'default',
      },
    ]);
  };

  const onDeletePress = (list: Food[]) => {
    const filteredArr = list.filter(
      (food) => !checkedList.some((checkFood) => checkFood.id === food.id)
    );
    onDeleteAlert(filteredArr);
  };

  return {
    onDeletePress,
  };
}
