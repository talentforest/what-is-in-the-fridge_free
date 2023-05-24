import { ScrollView, View } from 'react-native';
import { FoodLocation } from '../../../constant/fridgeInfo';
import { Food } from '../../../constant/foods';
import useAddFood from '../../../hooks/useAddFood';
import Form from '../form/Form';
import SubmitBtn from '../form/SubmitBtn';
import tw from 'twrnc';

interface Props {
  foodLocation: FoodLocation;
  selectedFood?: Food;
  setModalVisible: (modalVisible: boolean) => void;
}

export default function FormTabContent({
  foodLocation,
  setModalVisible,
}: Props) {
  const { newFood, addFoodInfo, onAddSubmit } = useAddFood({ foodLocation });

  return (
    <View style={tw`border border-t-0 border-slate-400 flex-1 bg-white p-4`}>
      <ScrollView>
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
      <SubmitBtn
        btnName='식료품 정보 추가하기'
        onPress={() => {
          onAddSubmit();
          setModalVisible(false);
        }}
      />
    </View>
  );
}
