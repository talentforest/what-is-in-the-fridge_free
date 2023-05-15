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
      style={tw`justify-between bg-white flex-1 gap-2 p-2 rounded-lg border-2 border-indigo-500`}
    >
      <Text styletw='text-indigo-500 text-xs'>카테고리 선택</Text>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={tw`justify-end w-full flex-1 gap-1 items-end`}
      >
        <Text styletw='pr-1 text-sm'>{category}</Text>
        <View style={tw`flex-row items-center`}>
          <Text styletw='text-xs text-indigo-500'>선택하기</Text>
          <Icon name='chevron-right' size={18} color={INDIGO} />
        </View>
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
