import { useDispatch } from 'react-redux';
import { Food } from '../constant/foodInfo';
import { select, selectNone } from '../redux/slice/selectedFoodSlice';
import { useSelector } from '../redux/hook';
import { useState } from 'react';
import { Space, StorageType } from '../constant/fridgeInfo';
import { Position } from '../screen-component/modal/AddAtOnceModal';
import { addAtOnceStep } from '../constant/formInfo';
import { useFindFood } from './useFindFood';
import { validFoodObj } from '../util/validFoodObj';
import { alertPhraseWithCheckList } from '../constant/alertPhrase';
import { Alert } from 'react-native';
import { addPantryFoods } from '../redux/slice/pantryFoodsSlice';
import { addFridgeFoods } from '../redux/slice/fridgeFoodsSlice';
import { removeShoppingListFoods } from '../redux/slice/shoppingListSlice';

interface Props {
  checkedList: Food[];
  setCheckedList: (checkedList: Food[]) => void;
  setModalVisible: (modalVisible: boolean) => void;
}

export const useAddAtOnce = ({
  checkedList,
  setCheckedList,
  setModalVisible,
}: Props) => {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);

  const [currentStorage, setCurrentStorage] = useState<StorageType | ''>('');
  const [fridgePosition, setFridgePosition] =
    useState<Position>('냉장실 안쪽 1번');
  const [currentStep, setCurrentStep] = useState(addAtOnceStep[0]);
  const [isEditing, setIsEditing] = useState(false);

  const { isFavoriteItem } = useFindFood();

  const dispatch = useDispatch();

  const getCompartmentNum = (position: Position) => {
    const foodCompartmentNum = +position.slice(7, 8);
    const space = position.slice(0, 6) as Space;
    const maxCompartmentsNum = fridgeInfo.compartments[space];

    return foodCompartmentNum > maxCompartmentsNum
      ? `${maxCompartmentsNum}번`
      : `${foodCompartmentNum}번`;
  };

  const onFridgePositionPress = (position: Position) => {
    const space = position.slice(0, 6);
    const compartmentNum = getCompartmentNum(position);
    setFridgePosition(`${space} ${compartmentNum}` as Position);
  };

  const onBackStepPress = () => {
    setCurrentStep({ step: 1, name: '한번에 추가할 공간' });
    dispatch(selectNone());
    setIsEditing(false);
  };

  const onNextStepPress = () => {
    const space = fridgePosition.slice(0, 6);
    const compartmentNum = fridgePosition.slice(-2);

    const editedCheckList = checkedList.map((food) => {
      const isFavoriteFood = isFavoriteItem(food.name); // category 정보만 필요
      const editedFood = {
        ...food,
        category: isFavoriteFood?.category || food.category,
      };
      return currentStorage === '팬트리'
        ? validFoodObj({ ...editedFood, space: '팬트리' })
        : ({ ...editedFood, space, compartmentNum } as Food);
    });

    setCheckedList(editedCheckList);
    setCurrentStep({ step: 2, name: '추가할 식료품 정보' });
  };

  const onSubmitPress = () => {
    const {
      confirmAddAll: { title, msg },
    } = alertPhraseWithCheckList(checkedList);

    Alert.alert(title, msg, [
      {
        text: '한번에 추가',
        onPress: () => {
          dispatch(
            currentStorage === '팬트리'
              ? addPantryFoods(checkedList)
              : addFridgeFoods(checkedList)
          );
          dispatch(removeShoppingListFoods(checkedList));
          Alert.alert('추가 완료', '성공적으로 추가되었습니다!');
          setModalVisible(false);
          setCheckedList([]);
        },
        style: 'default',
      },
      { text: '취소', style: 'destructive' },
    ]);
  };

  const onFoodItemPress = (selectedFood: Food) => {
    if (!isEditing && setIsEditing) {
      dispatch(select(selectedFood));
      setIsEditing(true);
    }
    if (isEditing) {
      setIsEditing(false);
      dispatch(selectNone());
    }
  };

  const position =
    currentStorage === '팬트리' ? `${currentStorage}` : `${fridgePosition}칸`;

  const closeModal = () => {
    setModalVisible(false);
    setCurrentStorage('');
    setFridgePosition('냉장실 안쪽 1번');
    setCurrentStep({ step: 1, name: '한번에 추가할 공간' });
    setIsEditing(false);
    dispatch(selectNone());
  };

  return {
    position,
    fridgePosition,
    currentStep,
    currentStorage,
    setCurrentStorage,
    isEditing,
    setIsEditing,
    onFridgePositionPress,
    onFoodItemPress,
    onSubmitPress,
    onNextStepPress,
    onBackStepPress,
    closeModal,
  };
};
