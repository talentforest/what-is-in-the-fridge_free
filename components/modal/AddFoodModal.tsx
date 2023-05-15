import { CompartmentType } from '../../constant/fridgeInfo';
import { Text } from '../native-component';
import { Dimensions, ScrollView, View } from 'react-native';
import { Food } from '../../constant/foods';
import RNModal from './component/Modal';
import FoodForm from '../form/FoodForm';
import SubmitBtn from '../form/SubmitBtn';
import useAddFood from '../../hooks/useAddFood';
import tw from 'twrnc';
import FormSpaceItem from '../form/FormSpaceItem';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/Navigation';

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
  const navigation = useNavigation();
  const routes = navigation.getState().routes;
  const currRoute = routes[routes.length - 1].name as keyof RootStackParamList;

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
      <Text styletw='text-indigo-700 mt-2'>
        * 이미 냉장고에 추가한 식료품은 추가할 수 없습니다.
      </Text>
      <ScrollView
        contentContainerStyle={tw`justify-between w-full`}
        style={tw`mt-4 flex-row flex-wrap w-full max-h-[${
          Dimensions.get('window').height / 1.8
        }px]`}
      >
        {selectedFood && currRoute === 'FavoriteFoods' && (
          <View style={tw`items-center my-4`}>
            <Text styletw='text-6xl py-2'>{selectedFood.image}</Text>
            <Text>{selectedFood.name}</Text>
          </View>
        )}
        {!compartment && (
          <FormSpaceItem editedFood={newFood} editFoodInfo={addFoodInfo} />
        )}
        <FoodForm
          selectedFood={selectedFood}
          food={newFood}
          changeFoodInfo={addFoodInfo}
        />
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
