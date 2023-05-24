import { useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput, TouchableOpacity } from '../../native-component';
import { Category } from '../../../constant/foodCategories';
import tw from 'twrnc';
import FoodCategoryModal from '../FoodCategoryModal';

interface Props {
  category: Category;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

export default function CategoryItem({ category, changeInfo }: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View>
        <TextInput styletw='w-full h-10' value={category} editable={false} />
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={tw`absolute top-3.5 right-3 flex-row items-center`}
        >
          <Text styletw='text-xs text-indigo-500'>변경</Text>
        </TouchableOpacity>
      </View>
      {modalVisible && (
        <FoodCategoryModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          changeInfo={changeInfo}
          categoryItem={category}
        />
      )}
    </>
  );
}
