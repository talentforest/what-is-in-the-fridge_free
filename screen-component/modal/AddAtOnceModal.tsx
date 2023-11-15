import { View } from 'react-native';
import { Text } from '../../components/common/native-component';
import { Food } from '../../constant/foodInfo';
import { StorageType, Space, CompartmentNum } from '../../constant/fridgeInfo';
import { useDispatch, useSelector } from '../../redux/hook';
import { useAddAtOnce } from '../../hooks';
import { toggleAlertModal } from '../../redux/slice/alertModalSlice';

import SpaceBtn from '../../components/buttons/SpaceBtn';
import Modal from '../../components/modal/Modal';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import CurrentPosition from '../add-at-once-modal/CurrentPositionBox';
import FoodItem from '../add-at-once-modal/FoodItem';
import SelectPositionBox from '../add-at-once-modal/SelectPositionBox';
import EditingBox from '../add-at-once-modal/EditingBox';
import AlertModal from './AlertModal';
import tw from 'twrnc';
import FadeInMiddleModal from '../../components/modal/FadeInMiddleModal';

interface Props {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  checkedList: Food[];
  setCheckedList: React.Dispatch<React.SetStateAction<Food[]>>;
  onConfirmPress: () => void;
}

export type Position = `${Space} ${CompartmentNum}`;

export default function AddAtOnceModal({
  modalVisible,
  setModalVisible,
  checkedList,
  setCheckedList,
  onConfirmPress,
}: Props) {
  const {
    alertInfo: { title: alertTitle },
  } = useSelector((state) => state.alertModal);
  const { selectedFood } = useSelector((state) => state.selectedFood);

  const {
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
    onAlertPress,
  } = useAddAtOnce({ checkedList, setCheckedList, setModalVisible });

  const dispatch = useDispatch();

  // ShoppingList의 Alert 설정
  const onPress = () => {
    if (alertTitle === '식료품 한번에 추가') {
      onAlertPress();
      return;
    } else if (
      alertTitle === '추가 완료' ||
      alertTitle === '메모 미작성' ||
      alertTitle === '유효하지 않은 소비기한' ||
      alertTitle === '식료품 개수 한도 도달'
    ) {
      return dispatch(toggleAlertModal(false));
    } else {
      onConfirmPress();
    }
  };

  return (
    <>
      <FadeInMiddleModal
        title={currentStep.name}
        isVisible={modalVisible}
        closeModal={closeModal}
      >
        {/* 1단계 */}
        {currentStep.step === 1 && (
          <View>
            <View style={tw`flex-row gap-1`}>
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
                <View>
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
                    tailIcon
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

            <View style={tw`mt-4 mb-1`}>
              <Text fontSize={14} style={tw`text-blue-600`}>
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
      </FadeInMiddleModal>

      <AlertModal onPress={onPress} />
    </>
  );
}
