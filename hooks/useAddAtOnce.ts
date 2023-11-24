import { useDispatch } from 'react-redux';
import { Food, initialFridgeFood } from '../constant/foodInfo';
import { useSelector } from '../redux/hook';
import { useState } from 'react';
import { Space, StorageType } from '../constant/fridgeInfo';
import { Position } from '../screen-component/modal/AddAtOnceModal';
import { useFindFood } from './useFindFood';
import { validFoodObj } from '../util/validFoodObj';
import { setFormFood } from '../redux/slice/food/formFoodSlice';
import { useHandleAlert } from './useHandleAlert';
import { setCheckedList } from '../redux/slice/food-list/checkListSlice';
import {
  changeAddAtOnceStep,
  showAddAtOnceModal,
} from '../redux/slice/modalVisibleSlice';
import { changeCategory } from '../redux/slice/food/categorySlice';

export const useAddAtOnce = () => {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);
  const { checkedList } = useSelector((state) => state.checkedList);

  const [currentStorage, setCurrentStorage] = useState<StorageType | ''>('');
  const [fridgePosition, setFridgePosition] =
    useState<Position>('냉장실 안쪽 1번');

  const [isEditing, setIsEditing] = useState(false);

  const { isFavoriteItem } = useFindFood();

  const { alertWithCheckList, setAlert } = useHandleAlert();

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

  const returnStepOne = () => {
    dispatch(changeAddAtOnceStep({ step: 1, name: '한번에 추가할 공간' }));
  };

  const onBackStepPress = () => {
    returnStepOne();
    dispatch(setFormFood(initialFridgeFood));
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

    dispatch(setCheckedList(editedCheckList));
    dispatch(changeAddAtOnceStep({ step: 2, name: '추가할 식료품 정보' }));
  };

  const position =
    currentStorage === '팬트리' ? `${currentStorage}` : `${fridgePosition}칸`;

  const onSubmitPress = () => {
    const { alertConfirmAddAll } = alertWithCheckList();
    setAlert(alertConfirmAddAll);
  };

  const onFoodItemPress = (selectedFood: Food) => {
    if (!isEditing && setIsEditing) {
      dispatch(setFormFood(selectedFood));
      setIsEditing(true);
    }
    if (isEditing) {
      setIsEditing(false);
      dispatch(setFormFood(initialFridgeFood));
    }
  };

  const closeModal = () => {
    dispatch(showAddAtOnceModal(false));
    setCurrentStorage('');
    setFridgePosition('냉장실 안쪽 1번');
    dispatch(changeAddAtOnceStep({ step: 1, name: '한번에 추가할 공간' }));
    setIsEditing(false);
    dispatch(setFormFood(initialFridgeFood));
    dispatch(changeCategory('신선식품류'));
  };

  return {
    position,
    fridgePosition,
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
