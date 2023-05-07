import { View } from 'react-native';
import { Category, foodCategories } from '../../constant/foodCategories';
import { Text, TouchableOpacity } from '../native-component';
import tw from 'twrnc';
import RNModal from './component/Modal';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  changeFoodInfo: (newInfo: { [key: string]: string }) => void;
  category: Category;
}

export default function FoodCategoryModal({
  modalVisible,
  setModalVisible,
  changeFoodInfo,
  category,
}: Props) {
  return (
    <RNModal
      title='식료품 카테고리 선택하기'
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    >
      <View style={tw`mt-2 flex-row flex-wrap gap-1`}>
        {foodCategories.map((foodCategory) => (
          <TouchableOpacity
            key={foodCategory.id}
            onPress={() => {
              changeFoodInfo({ category: foodCategory.category });
              setModalVisible(false);
            }}
            style={tw`border p-2 rounded-md ${
              category === foodCategory.category
                ? 'bg-yellow-300 border-blue-600'
                : 'bg-white border-slate-400'
            }`}
          >
            <Text
              styletw={`${
                category === foodCategory.category
                  ? 'text-blue-700'
                  : 'text-slate-500'
              }`}
            >
              {foodCategory.category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </RNModal>
  );
}
