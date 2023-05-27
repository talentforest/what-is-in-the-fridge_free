import { View } from 'react-native';
import { Category, foodCategories } from '../../constant/foodCategories';
import RNModal from './common/Modal';
import tw from 'twrnc';
import CheckBoxBtn from './form/CheckBoxBtn';
import SubmitBtn from './form/SubmitBtn';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  changeInfo: (newInfo: { [key: string]: string }) => void;
  categoryItem: Category;
}

export default function FoodCategoryModal({
  modalVisible,
  setModalVisible,
  changeInfo,
  categoryItem,
}: Props) {
  return (
    <RNModal
      title='식료품 카테고리 선택하기'
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    >
      <ScrollView style={tw`mb-2`}>
        <View style={tw`my-4 gap-5`}>
          {foodCategories.map(({ id, category }) => (
            <CheckBoxBtn
              key={id}
              onPress={() => {
                changeInfo({ category });
              }}
              title={category}
              check={categoryItem === category}
            />
          ))}
        </View>
      </ScrollView>
      <SubmitBtn btnName='완료' onPress={() => setModalVisible(false)} />
    </RNModal>
  );
}
