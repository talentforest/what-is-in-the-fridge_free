import { Food } from '../constant/foodInfo';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from '../redux/hook';
import {
  addItemsToShoppingList,
  setShoppingList,
} from '../redux/slice/shoppingListSlice';
import { select } from '../redux/slice/selectedFoodSlice';
import { useNavigation, useRoute } from '@react-navigation/native';
import { setAllFridgeFoods } from '../redux/slice/fridgeFoodsSlice';
import { setFavoriteList } from '../redux/slice/favoriteFoodsSlice';
import { AnimationState } from './animation/useSetAnimationState';
import { toggleShowBtn } from '../redux/slice/showBtnSlice';
import { setPantry } from '../redux/slice/pantryFoodsSlice';
import {
  alertPhraseWithCheckList,
  alertPhraseWithFood,
} from '../constant/alertPhrase';
import { NavigateProp } from '../navigation/Navigation';
import { validFoodObj } from '../util/validFoodObj';

interface Props {
  checkedList: Food[];
  setCheckedList: (checkedList: Food[]) => void;
  setModalVisible?: (modalVisible: boolean) => void;
}

export const useHandleTableItem = ({
  checkedList,
  setCheckedList,
  setModalVisible,
}: Props) => {
  const { fridgeFoods } = useSelector((state) => state.fridgeFoods);
  const { pantryFoods } = useSelector((state) => state.pantryFoods);

  const navigation = useNavigation<NavigateProp>();
  const dispatch = useDispatch();
  const route = useRoute();

  const {
    deleteExpiredFoods,
    unSettingFavoriteFoods,
    deletePantryFoods,
    deleteFromShoppingList,
    addToShoppingList,
  } = alertPhraseWithCheckList(checkedList);

  const alertPress = (
    alertPhrase: { title: string; msg: string },
    setAnimationState: (state: AnimationState) => void
  ) => {
    const { title, msg } = alertPhrase;
    const onPress = () => {
      setAnimationState('slideup-out');
      dispatch(toggleShowBtn(false));
    };
    return Alert.alert(title, msg, [
      { text: '취소', style: 'destructive' },
      { text: '삭제', onPress, style: 'default' }, // 확인 누르면 애니메이션 상태 전환
    ]);
  };

  const onDeleteExpiredFoodPress = (
    setAnimationState: (state: AnimationState) => void,
    animationState: AnimationState
  ) => {
    if (animationState === 'none')
      return alertPress(deleteExpiredFoods, setAnimationState); // 확인 누르면 애니메이션 상태 전환

    if (animationState === 'slideup-out') {
      const findFridgeFoodInCheckList = (fridgeFood: Food) => {
        return checkedList
          .filter((checkedFood) => checkedFood.space !== '팬트리')
          .find((checkedfood) => checkedfood.name === fridgeFood.name);
      };

      const findPantryFoodInCheckList = (pantryFood: Food) => {
        return checkedList
          .filter((checkedFood) => checkedFood.space === '팬트리')
          .find((checkedfood) => checkedfood.name === pantryFood.name);
      };

      const filteredFridge = fridgeFoods.filter(
        (fridgeFood) => !findFridgeFoodInCheckList(fridgeFood)
      );

      const filteredPantry = pantryFoods.filter(
        (pantryFood) => !findPantryFoodInCheckList(pantryFood)
      );

      dispatch(setPantry(filteredPantry));
      dispatch(setAllFridgeFoods(filteredFridge));
    }
    setCheckedList([]);
  };

  const getInfoByRoute = (route: string) => {
    return route === 'PantryFoods'
      ? { phrase: deletePantryFoods, fn: setPantry }
      : route === 'ShoppingList'
      ? { phrase: deleteFromShoppingList, fn: setShoppingList }
      : { phrase: unSettingFavoriteFoods, fn: setFavoriteList };
  };

  // 팬트리 | 쇼핑리스트 | 자주 먹는 식료품 - 아이템 삭제
  const onDeleteFoodPress = (
    setAnimationState: (state: AnimationState) => void,
    animationState: AnimationState,
    allTableItems: Food[]
  ) => {
    const { name } = route;
    if (animationState === 'none')
      return alertPress(getInfoByRoute(name).phrase, setAnimationState); // 확인 누르면 애니메이션 상태 전환

    if (animationState === 'slideup-out' && allTableItems) {
      const filteredCheckItem = allTableItems.filter(
        (food) => !checkedList.find((checkedFood) => checkedFood.id === food.id)
      );
      dispatch(getInfoByRoute(name).fn(filteredCheckItem));
    }
    setCheckedList([]);
  };

  const onAddShoppingListBtnPress = () => {
    if (checkedList.length === 0) return;

    dispatch(addItemsToShoppingList(checkedList));

    const { title, msg } = addToShoppingList;
    if (setCheckedList) {
      return Alert.alert(title, msg, [
        { text: '취소', style: 'destructive' },
        {
          text: '확인',
          onPress: () => {
            setCheckedList([]);
            navigation.navigate('ShoppingList');
          },
          style: 'default',
        },
      ]);
    }
  };

  const onAddToFridgePress = (selectedFood: Food) => {
    const existFood = [...fridgeFoods, ...pantryFoods].find(
      (food) => food.name === selectedFood.name
    );

    if (existFood) {
      const {
        deleteExistFood: { title, msg },
      } = alertPhraseWithFood(existFood || selectedFood);

      return Alert.alert(title, msg, [
        { text: '취소', style: 'destructive' },
        {
          text: '삭제 후 다시 추가',
          onPress: () => {
            dispatch(select(selectedFood));
            setModalVisible && setModalVisible(true);
          },
          style: 'default',
        },
      ]);
    }

    dispatch(select(selectedFood));
    setModalVisible && setModalVisible(true);
  };

  return {
    onDeleteFoodPress,
    onDeleteExpiredFoodPress,
    onAddShoppingListBtnPress,
    onAddToFridgePress,
  };
};
