import { FoodLocation } from '../../constant/fridgeInfo';
import { Text } from '../native-component';
import { ScrollView, View } from 'react-native';
import RNModal from './common/Modal';
import tw from 'twrnc';
import useAddFood from '../../hooks/useAddFood';
import Form from './form/Form';
import SubmitBtn from './form/SubmitBtn';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  foodLocation: FoodLocation;
}

export default function AddFoodModal({
  foodLocation,
  modalVisible,
  setModalVisible,
}: Props) {
  const { newFood, addFoodInfo, onAddSubmit } = useAddFood({ foodLocation });

  return (
    <RNModal
      title='식료품 추가'
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    >
      <Text styletw='text-slate-500 my-2'>
        * 이미 냉장고에 추가한 식료품은 추가할 수 없습니다.
      </Text>
      {foodLocation && (
        <ScrollView style={tw`my-4`}>
          <View style={tw`gap-5`}>
            <Form
              items={[
                '아이콘과 이름',
                '카테고리',
                '구매날짜',
                '유통기한',
                '즐겨찾는 식품인가요?',
              ]}
              food={newFood}
              changeInfo={addFoodInfo}
            />
          </View>
        </ScrollView>
      )}
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
