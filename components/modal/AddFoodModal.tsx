import { FoodLocation } from '../../constant/fridgeInfo';
import { Text } from '../native-component';
import { Dimensions, View } from 'react-native';
import { Food } from '../../constant/foods';
import { useState } from 'react';
import RNModal from './common/Modal';
import TabBtn from './add-food-modal.tsx/TabBtn';
import SearchTabContent from './add-food-modal.tsx/SearchTabContent';
import FormTabContent from './add-food-modal.tsx/FormTabContent';
import tw from 'twrnc';
import { useDispatch } from '../../redux/hook';
import { search } from '../../redux/slice/searchKeywordSlice';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  foodLocation?: FoodLocation;
  selectedFood?: Food;
}

export default function AddFoodModal({
  foodLocation,
  modalVisible,
  setModalVisible,
  selectedFood,
}: Props) {
  const [searchTab, setSearchTab] = useState(true);
  const dispatch = useDispatch();

  return (
    <RNModal
      title='식료품 추가'
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    >
      <Text styletw='text-slate-500 my-2'>
        * 이미 냉장고에 추가한 식료품은 추가할 수 없습니다.
      </Text>
      <View style={tw`h-[${Dimensions.get('window').height / 5.5}]px`}>
        <TabBtn searchTab={searchTab} setSearchTab={setSearchTab} />
        {foodLocation &&
          (searchTab ? (
            <SearchTabContent
              foodLocation={foodLocation}
              setModalVisible={setModalVisible}
            />
          ) : (
            <FormTabContent
              selectedFood={selectedFood}
              foodLocation={foodLocation}
              setModalVisible={setModalVisible}
            />
          ))}
      </View>
    </RNModal>
  );
}
