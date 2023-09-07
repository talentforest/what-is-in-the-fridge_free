import { Food } from '../constant/foods';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from '../redux/hook';
import {
  addItemsToShoppingList,
  setShoppingList,
} from '../redux/slice/shoppingListSlice';
import { select } from '../redux/slice/selectedFoodSlice';
import { useRoute } from '@react-navigation/native';
import { setAllFoods } from '../redux/slice/allFoodsSlice';
import { setFavoriteList } from '../redux/slice/favoriteFoodsSlice';
import { AnimationState } from './animation/useSetAnimationState';
import { toggleShowBtn } from '../redux/slice/showBtnSlice';

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
  const { allFoods } = useSelector((state) => state.allFoods);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const dispatch = useDispatch();
  const route = useRoute();

  const changeFavStateInList = () => {
    return allFoods.map((food) => {
      const isFavoriteFood = checkedList.some(
        (item) => item.name === food.name
      );
      return isFavoriteFood ? { ...food, favorite: false } : food;
    });
  };

  const checkedFoodNameList = checkedList.map((food) => food.name).join(', ');

  const getDeleteAlert = () => {
    if (route.name === 'ExpiredFoods') {
      return {
        title: '유통기한 주의 식료품 제거',
        desc: `총 ${checkedList.length}개의 식료품(${checkedFoodNameList})을 냉장고에서 제거하시겠습니까?`,
        defaultBtnText: '제거',
        onPress: (filteredArr: Food[]) => dispatch(setAllFoods(filteredArr)),
      };
    }
    if (route.name === 'FavoriteFoods') {
      return {
        title: '자주 먹는 식료품 해제',
        desc: `총 ${checkedList.length}개의 식료품(${checkedFoodNameList})을 자주 먹는 식료품에서 해제하시겠습니까?`,
        defaultBtnText: '해제',
        onPress: (filteredArr: Food[]) => {
          dispatch(setAllFoods(changeFavStateInList()));
          dispatch(setFavoriteList(filteredArr));
        },
      };
    }
    return {
      title: '식료품 삭제',
      desc: `총 ${checkedList.length}개의 식료품(${checkedFoodNameList})을 장보기 목록에서 삭제하시겠습니까?`,
      defaultBtnText: '삭제',
      onPress: (filteredArr: Food[]) => dispatch(setShoppingList(filteredArr)),
    };
  };

  const onDeletePress = (
    allTableItems: Food[],
    setAnimationState?: (state: AnimationState) => void,
    animationState?: AnimationState
  ) => {
    const { title, desc, defaultBtnText, onPress } = getDeleteAlert();

    if (animationState === 'none' && setAnimationState) {
      return Alert.alert(title, desc, [
        {
          text: '취소',
          style: 'destructive',
        },
        {
          text: defaultBtnText,
          onPress: () => {
            setAnimationState('slideup-out');
            dispatch(toggleShowBtn(false));
          },
          style: 'default',
        },
      ]);
    }

    if (animationState === 'slideup-out') {
      const filteredCheckItem = allTableItems.filter(
        (food) => !checkedList.some((checkFood) => checkFood.id === food.id)
      );
      onPress(filteredCheckItem);
    }
    setCheckedList([]);
  };

  const onAddShoppingListPress = () => {
    if (checkedList.length === 0) return;
    dispatch(addItemsToShoppingList(checkedList));
    const foodNameList = checkedList.map((food) => food.name).join(', ');
    if (setCheckedList) {
      return Alert.alert(
        '장보기 목록 추가',
        `총 ${checkedList.length}개의 식료품(${foodNameList})이 장보기 목록에 추가되었어요.`,
        [
          {
            text: '확인',
            onPress: () => {
              setCheckedList([]);
            },
            style: 'default',
          },
        ]
      );
    }
  };

  const openAddFoodModal = (food: Food) => {
    dispatch(select(food));
    setModalVisible && setModalVisible(true);
  };

  const onAddToFridgePress = (food: Food) => {
    const favorite = !!favoriteFoods.find(
      (favoriteFood) => favoriteFood.name === food.name
    );
    const selectedFoodInfo = { ...food, favorite } as Food;

    const exist = allFoods.find((food) => food.name === selectedFoodInfo.name);
    if (exist) {
      return Alert.alert(
        `기존 식료품 삭제 안내`,
        `이미 냉장고에 ${selectedFoodInfo.name} 식료품이 존재해요. 기존 식료품을 삭제하고 새로 추가하시겠어요?`,
        [
          { text: '취소', style: 'destructive' },
          {
            text: '삭제 후 추가',
            onPress: () => openAddFoodModal(selectedFoodInfo),
            style: 'default',
          },
        ]
      );
    }
    return openAddFoodModal(selectedFoodInfo);
  };

  return {
    onDeletePress,
    onAddShoppingListPress,
    onAddToFridgePress,
  };
};
