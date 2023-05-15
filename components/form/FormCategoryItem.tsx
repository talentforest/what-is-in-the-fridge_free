import { useState } from 'react';
import { View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import { Category } from '../../constant/foodCategories';
import { INDIGO } from '../../constant/colors';
import tw from 'twrnc';
import FoodCategoryModal from '../modal/FoodCategoryModal';
import Icon from 'react-native-vector-icons/Feather';

interface Props {
  category: Category;
  changeFoodInfo: (newInfo: { [key: string]: string }) => void;
}

export default function FormCategoryItem({ category, changeFoodInfo }: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
      style={tw`justify-between bg-indigo-50 flex-1 gap-1 p-2 border rounded-lg border-slate-400`}
    >
      <Text styletw='mb-2 text-indigo-500 text-xs'>식료품 카테고리 선택</Text>
      <View style={tw`flex-row justify-between self-end w-full`}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={tw`flex-row items-center border py-0.5 pl-2 rounded-lg bg-yellow-300 border-slate-400`}
        >
          <Text styletw='text-xs'>선택하기</Text>
          <Icon name='chevron-right' size={18} color={INDIGO} />
        </TouchableOpacity>
        <Text styletw='text-base'>{category}</Text>
      </View>
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
