import { useState } from 'react';
import { View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import { Category } from '../../constant/foodCategories';
import tw from 'twrnc';
import FoodCategoryModal from '../modal/FoodCategoryModal';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  category: Category;
  changeFoodInfo: (newInfo: { [key: string]: string }) => void;
}

export default function FormCategoryItem({ category, changeFoodInfo }: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
      style={tw`bg-indigo-50 flex-1 gap-1 p-2 border rounded-lg border-slate-400`}
    >
      <Text styletw='mb-2 text-indigo-500 text-xs'>식료품 카테고리</Text>
      <Text styletw='leading-5 flex-1'>{category}</Text>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={tw`flex-row items-center self-end border py-0.5 pl-2 rounded-2xl bg-yellow-300 border-slate-400`}
      >
        <Text styletw='text-xs'>선택하기</Text>
        <Icon name='keyboard-arrow-right' size={18} color='#4f46e5' />
      </TouchableOpacity>
      {modalVisible && (
        <FoodCategoryModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          changeFoodInfo={changeFoodInfo}
          category={category}
        />
      )}
    </View>
  );
}
