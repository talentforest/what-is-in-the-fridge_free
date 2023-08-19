import { Food } from '../constant/foods';
import { Alert } from 'react-native';
import { useDispatch } from '../redux/hook';
import { addItemsToShoppingList } from '../redux/slice/shoppingList';
import { select } from '../redux/slice/selectedFoodSlice';
import useFavoriteFoods from './useFavoriteFoods';
import useCheckFood from './useCheckFood';

interface DeleteAlertGuide {
  title: string;
  desc: string;
  defaultBtnText: string;
  onPress: (filteredArr: Food[]) => void;
}

interface Props {
  deleteAlertGuide: DeleteAlertGuide;
  checkedList: Food[];
  setCheckedList: (checkedList: Food[]) => void;
  setModalVisible?: (modalVisible: boolean) => void;
}

export default function useHandleTableItem({
  deleteAlertGuide,
  checkedList,
  setCheckedList,
  setModalVisible,
}: Props) {
  const { checkFavorite } = useFavoriteFoods();
  const { checkExistFood } = useCheckFood();
  const dispatch = useDispatch();

  const onDeletePress = (allTableItems: Food[]) => {
    const { title, desc, defaultBtnText, onPress } = deleteAlertGuide;
    const filteredCheckItem = allTableItems.filter(
      (food) => !checkedList.some((checkFood) => checkFood.id === food.id)
    );
    return Alert.alert(title, desc, [
      {
        text: '취소',
        onPress: () => {
          setCheckedList([]);
        },
        style: 'destructive',
      },
      {
        text: defaultBtnText,
        onPress: () => {
          onPress(filteredCheckItem);
          setCheckedList([]);
        },
        style: 'default',
      },
    ]);
  };

  const onAddShoppingListPress = () => {
    if (checkedList.length === 0) return;
    dispatch(addItemsToShoppingList(checkedList));

    const foodNameList = checkedList.map((food) => food.name).join(', ');
    if (setCheckedList) {
      return Alert.alert(
        '장보기 목록 추가',
        `총 ${checkedList.length}개의 식료품(${foodNameList})이 장보기 목록에 추가되었습니다.`,
        [
          {
            text: '확인',
            onPress: () => setCheckedList([]),
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
    const favorite = checkFavorite(food);
    const selectedFoodInfo = { ...food, favorite } as Food;

    if (checkExistFood(selectedFoodInfo)) {
      return Alert.alert(
        `기존 식료품 삭제 알림`,
        `이미 냉장고에 ${selectedFoodInfo.name} 식료품이 있습니다. 기존 식료품을 삭제하고 새로 추가하시겠습니까?`,
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
}
