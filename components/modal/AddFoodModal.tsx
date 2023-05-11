import { CompartmentType } from '../../constant/fridgeInfo';
import { Text } from '../native-component';
import { Dimensions, ScrollView } from 'react-native';
import { Food } from '../../constant/foods';
import RNModal from './component/Modal';
import FoodForm from '../form/FoodForm';
import SubmitBtn from '../form/SubmitBtn';
import useAddFood from '../../hooks/useAddFood';
import tw from 'twrnc';
import FormSpaceItem from '../form/FormSpaceItem';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  compartment?: CompartmentType;
  selectedFood?: Food;
}

export default function AddFoodModal({
  compartment,
  modalVisible,
  setModalVisible,
  selectedFood,
}: Props) {
  const {
    newFood,
    addFoodInfo,
    onAddSubmit, //
  } = useAddFood({ selectedFood, compartment });

  return (
    <RNModal
      title='식료품 정보 입력'
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    >
      <ScrollView
        contentContainerStyle={tw`justify-between w-full`}
        style={tw`mt-4 flex-row flex-wrap w-full max-h-[${
          Dimensions.get('window').height / 1.4
        }px]`}
      >
        <Text styletw='text-orange-700 mb-4'>
          * 이미 냉장고에 추가한 식료품은 추가할 수 없습니다.
        </Text>
        {!compartment && (
          <FormSpaceItem editedFood={newFood} editFoodInfo={addFoodInfo} />
        )}
        <FoodForm food={newFood} changeFoodInfo={addFoodInfo} />
      </ScrollView>
      <SubmitBtn
        btnName='식료품 정보 추가하기'
        onPress={() => {
          onAddSubmit();
          setModalVisible(false);
        }}
      />
    </RNModal>
  );
}
