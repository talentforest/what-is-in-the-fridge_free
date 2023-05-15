import { CompartmentType } from '../../constant/fridgeInfo';
import { Text } from '../native-component';
import { Dimensions, ScrollView } from 'react-native';
import { Food } from '../../constant/foods';
import { useNavigation } from '@react-navigation/native';
import { RootNavParamList } from '../../navigation/Navigation';
import RNModal from './component/Modal';
import FoodForm from '../form/FoodForm';
import SubmitBtn from '../form/SubmitBtn';
import useAddFood from '../../hooks/useAddFood';
import tw from 'twrnc';

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
  const currRoute = routes[routes.length - 1].name as keyof RootNavParamList;

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
        <FoodForm
          selectedFood={selectedFood}
          food={newFood}
          changeFoodInfo={addFoodInfo}
          noBigFoodImg={currRoute === 'Compartments'}
          imageItem={!(currRoute === 'FavoriteFoods')}
          nameItem={currRoute === 'Compartments'}
          spaceItem={!(currRoute === 'Compartments')}
          categoryItem={!(currRoute === 'FavoriteFoods')}
          favoriteItem={!(currRoute === 'FavoriteFoods')}
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
