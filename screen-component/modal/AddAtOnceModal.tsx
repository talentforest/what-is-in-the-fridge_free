import { View } from 'react-native';
import { Text } from '../../components/common/native-component';
import { Food } from '../../constant/foodInfo';
import { StorageType, Space, CompartmentNum } from '../../constant/fridgeInfo';
import { useSelector } from '../../redux/hook';
import { useAddAtOnce } from '../../hooks';

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
  } = useAddAtOnce({ checkedList, setCheckedList, setModalVisible });

  return (
    <Modal
      title={currentStep.name}
      isVisible={modalVisible}
      animationIn='fadeIn'
      closeModal={closeModal}
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
