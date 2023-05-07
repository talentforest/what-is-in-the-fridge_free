import { ScrollView } from 'react-native';
import { Text } from '../components/native-component';
import FormImageItem from '../components/form/FormImageItem';
import tw from 'twrnc';
import useAddFood from '../hooks/useAddFood';
import FoodForm from '../components/form/FoodForm';
import SubmitBtn from '../components/form/SubmitBtn';

export type FormLabel =
  | '식료품 카테고리'
  | '식료품 이름'
  | '식료품 수량'
  | '식료품 구매날짜'
  | '식료품 유통기한'
  | '자주 먹는 식료품';

export default function AddFood({ route }: any) {
  const { newFood, changeFoodInfo, onSubmit } = useAddFood(route.params);

  return (
    <ScrollView style={tw`p-4`}>
      <Text styletw='text-base mb-4'>직접 식료품 정보 입력</Text>
      <FormImageItem value={newFood.image} changeFoodInfo={changeFoodInfo} />
      <FoodForm food={newFood} changeFoodInfo={changeFoodInfo} />
      <SubmitBtn btnName='식료품 정보 추가하기' onPress={onSubmit} />
    </ScrollView>
  );
}
