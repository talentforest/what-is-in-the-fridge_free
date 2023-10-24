import { Alert, View } from 'react-native';
import {
  Food,
  initialFridgeFood,
  initialPantryFood,
} from '../../constant/foodInfo';
import { StorageType, Space, CompartmentNum } from '../../constant/fridgeInfo';
import { useState } from 'react';
import { useDispatch, useSelector } from '../../redux/hook';
import { addAtOnceStep } from '../../constant/formInfo';
import { Text } from '../../components/common/native-component';
import { select, selectNone } from '../../redux/slice/selectedFoodSlice';
import { alertPhraseWithCheckList } from '../../constant/alertPhrase';
import { validFoodObj } from '../../util/validFoodObj';
import { addPantryFoods } from '../../redux/slice/pantryFoodsSlice';
import { removeShoppingListFoods } from '../../redux/slice/shoppingListSlice';
import { addFridgeFoods } from '../../redux/slice/fridgeFoodsSlice';
import { useFindFood } from '../../hooks';

import SpaceBtn from '../../components/buttons/SpaceBtn';
import Modal from '../../components/modal/Modal';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import CurrentPosition from '../add-at-once-modal/CurrentPositionBox';
import FoodItem from '../add-at-once-modal/FoodItem';
import SelectPositionBox from '../add-at-once-modal/SelectPositionBox';
import EditingBox from '../add-at-once-modal/EditingBox';
import tw from 'twrnc';

interface Props {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  checkedList: Food[];
  setCheckedList: React.Dispatch<React.SetStateAction<Food[]>>;
}

export type Position = `${Space} ${CompartmentNum}`;

export default function AddAtOnceModal({
  modalVisible,
  setModalVisible,
  checkedList,
  setCheckedList,
}: Props) {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);
  const { selectedFood } = useSelector((state) => state.selectedFood);

  const [currentStorage, setCurrentStorage] = useState<StorageType | ''>('');
  const [fridgePosition, setFridgePosition] =
    useState<Position>('냉장실 안쪽 1번');
  const [currentStep, setCurrentStep] = useState(addAtOnceStep[0]);
  const [isEditing, setIsEditing] = useState(false);

  const { isFavoriteItem } = useFindFood();

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

    setCheckedList((prev) =>
      prev.map((food) => {
        const favoriteItem = isFavoriteItem(food.name); // id, category 정보만 필요

        return currentStorage === '팬트리'
          ? validFoodObj({
              ...initialPantryFood,
              id: favoriteItem?.id || food.id,
              name: food.name,
              category: favoriteItem?.category || food.category,
              space: '팬트리',
            })
          : ({
              ...initialFridgeFood,
              id: favoriteItem?.id || food.id,
              name: food.name,
              category: favoriteItem?.category || food.category,
              space,
              compartmentNum,
            } as Food);
      })
    );
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

  const dispatch = useDispatch();

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

  return (
    <Modal
      title={currentStep.name}
      isVisible={modalVisible}
      animationIn='fadeIn'
      closeModal={() => {
        setModalVisible(false);
        setCurrentStorage('');
        setFridgePosition('냉장실 안쪽 1번');
        setCurrentStep({ step: 1, name: '한번에 추가할 공간' });
        setIsEditing(false);
        dispatch(selectNone());
      }}
    >
      <View style={tw`bg-stone-100 px-5 pb-4 rounded-b-2xl`}>
        {/* 1단계 */}
        {currentStep.step === 1 && (
          <View>
            <View style={tw`flex-row gap-1.5`}>
              {(['냉장고', '팬트리'] as StorageType[]).map((storage) => (
                <SpaceBtn
                  key={storage}
                  btnName={storage}
                  onPress={() => setCurrentStorage(storage)}
                  active={storage == currentStorage}
                />
              ))}
            </View>

            {!!currentStorage && (
              <View style={tw`mt-0.5`}>
                <View style={tw`gap-1`}>
                  <CurrentPosition position={position} active={true} />

                  <SelectPositionBox
                    active={currentStorage === '냉장고'}
                    fridgePosition={fridgePosition}
                    onFridgePositionPress={onFridgePositionPress}
                  />
                </View>
                <View style={tw`mt-4`}>
                  <SubmitBtn
                    btnName='다음 단계'
                    color='gray'
                    onPress={onNextStepPress}
                    textSize={16}
                    tailIcon='chevron-right'
                  />
                </View>
              </View>
            )}
          </View>
        )}

        {/* 2단계 */}
        {currentStep.step === 2 && (
          <View>
            <CurrentPosition
              position={position}
              onBackPress={onBackStepPress}
              active={currentStorage !== ''}
            />

            <View style={tw`mt-6 mb-1`}>
              <Text style={tw`text-sm text-indigo-600`}>
                {!isEditing
                  ? '추가할 식료품 정보 목록'
                  : '선택한 식료품 정보 수정'}
              </Text>
            </View>

            {checkedList.map((food) => (
              <FoodItem
                key={food.id}
                food={food}
                isEditing={isEditing}
                onFoodItemPress={onFoodItemPress}
                active={
                  selectedFood.name !== '' && selectedFood.name !== food.name
                }
              />
            ))}

            <EditingBox
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              setCheckedList={setCheckedList}
            />

            {!isEditing && (
              <View style={tw`gap-2 mt-6`}>
                <SubmitBtn
                  iconName='plus'
                  btnName='한번에 추가'
                  color='blue'
                  onPress={onSubmitPress}
                />
              </View>
            )}
          </View>
        )}
      </View>
    </Modal>
  );
}
