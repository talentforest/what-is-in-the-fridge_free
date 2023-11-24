import { View } from 'react-native';
import { Text } from '../../components/common/native-component';
import { StorageType, Space, CompartmentNum } from '../../constant/fridgeInfo';
import { useSelector } from '../../redux/hook';
import { useAddAtOnce } from '../../hooks';

import SpaceBtn from '../../components/buttons/SpaceBtn';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import CurrentPosition from '../add-at-once-modal/CurrentPositionBox';
import FoodItem from '../add-at-once-modal/FoodItem';
import SelectPositionBox from '../add-at-once-modal/SelectPositionBox';
import EditingBox from '../add-at-once-modal/EditingBox';
import AlertModal from './AlertModal';
import FadeInMiddleModal from '../../components/modal/FadeInMiddleModal';
import tw from 'twrnc';

export type Position = `${Space} ${CompartmentNum}`;

export default function AddAtOnceModal() {
  const { checkedList } = useSelector((state) => state.checkedList);
  const { formFood } = useSelector((state) => state.formFood);
  const { addAtOnceModal } = useSelector((state) => state.modalVisible);

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
  } = useAddAtOnce();

  return (
    <>
      <FadeInMiddleModal
        title={currentStep.name}
        isVisible={addAtOnceModal}
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
                active={formFood.name !== '' && formFood.name !== food.name}
              />
            ))}

            <EditingBox isEditing={isEditing} setIsEditing={setIsEditing} />

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

      <AlertModal />
    </>
  );
}
