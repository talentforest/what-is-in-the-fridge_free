import { Food } from '../../constant/foods';
import { Dimensions, ScrollView, View } from 'react-native';
import { Text } from '../native-component';
import RNModal from './component/Modal';
import tw from 'twrnc';
import useAddFood from '../../hooks/useAddFood';
import FoodForm from '../form/FoodForm';
import SubmitBtn from '../form/SubmitBtn';
import useChangeFoodInfo from '../../hooks/useChangeFoodInfo';
import FormImageItem from '../form/FormImageItem';
import FormSpaceItem from '../form/FormSpaceItem';
import { removeFromShoppingList } from '../../redux/slice/shoppingList';
import { useDispatch } from '../../redux/hook';

interface Props {
  food: Food;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}

export default function FoodSpaceModal({
  food,
  modalVisible,
  setModalVisible,
}: Props) {
  const { onSubmitFromSpaceModal } = useAddFood({});
  const { editedFood, editFoodInfo } = useChangeFoodInfo({ food });
  const dispatch = useDispatch();

  return (
    <RNModal
      title='냉장고에 추가하기'
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    >
      <ScrollView
        contentContainerStyle={tw`justify-between w-full`}
        style={tw`mt-4 flex-row flex-wrap w-full h-[${
          Dimensions.get('window').height / 1.6
        }px]`}
      >
        <Text styletw='text-rose-600 mb-4'>
          * 이미 냉장고에 추가한 식료품은 추가할 수 없습니다.
        </Text>
        <FormImageItem value={editedFood.image} changeFoodInfo={editFoodInfo} />
        <FormSpaceItem editedFood={editedFood} editFoodInfo={editFoodInfo} />
        <FoodForm food={editedFood} changeFoodInfo={editFoodInfo} />
      </ScrollView>
      <SubmitBtn
        btnName='식료품 정보 수정 완료'
        onPress={() => {
          onSubmitFromSpaceModal(editedFood.space, editedFood);
          setModalVisible(false);
          dispatch(removeFromShoppingList({ name: editedFood.name }));
        }}
      />
    </RNModal>
  );
}
