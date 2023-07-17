import { Text } from '../native-component';
import { Image, ScrollView, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import RNModal from './common/Modal';
import Form from './form/Form';
import useAddSelectFood from '../../hooks/useAddSelectFood';
import SubmitBtn from './form/SubmitBtn';
import tw from 'twrnc';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}

export default function AddSelectFoodModal({
  modalVisible,
  setModalVisible,
}: Props) {
  const { selectedFood, onChange, onSubmit } = useAddSelectFood();
  const route = useRoute();

  return (
    <RNModal
      title='식료품 추가'
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    >
      <Text style={tw`text-slate-500 my-2`}>
        * 이미 냉장고에 추가한 식료품은 추가할 수 없습니다.
      </Text>

      {route.name === 'FavoriteFoods' && (
        <View style={tw`items-center gap-2`}>
          {selectedFood.image.includes('http') ? (
            <Image
              style={tw`h-20 w-20 rounded-md`}
              source={{ uri: selectedFood.image }}
            />
          ) : (
            <Text fontSize={22} style={tw`pt-4`}>
              {selectedFood.image}
            </Text>
          )}
          <Text>{selectedFood.name}</Text>
        </View>
      )}

      <ScrollView style={tw`my-4`} showsVerticalScrollIndicator={false}>
        <Form
          editableName={false}
          items={[
            route.name !== 'FavoriteFoods' && '아이콘과 이름',
            '카테고리',
            '냉장고 위치 선택',
            '구매날짜',
            '유통기한',
            route.name !== 'FavoriteFoods' && '자주 먹는 식품인가요?',
          ]}
          food={selectedFood}
          changeInfo={onChange}
        />
      </ScrollView>
      <SubmitBtn
        btnName='식료품 정보 추가하기'
        onPress={() => {
          onSubmit();
          setModalVisible(false);
        }}
      />
    </RNModal>
  );
}
