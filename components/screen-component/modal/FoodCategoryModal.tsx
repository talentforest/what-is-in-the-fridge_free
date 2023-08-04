import { View } from 'react-native';
import { Text } from '../../native-component';
import { Category, foodCategories } from '../../../constant/foodCategories';
import { FontGmarketSansBold } from '../../../constant/fonts';
import RNModal from '../../common/modal/Modal';
import CheckBoxItem from '../../common/form/CheckBoxItem';
import tw from 'twrnc';

interface Props {
  categoryOpen: boolean;
  setCategoryOpen: (categoryOpen: boolean) => void;
  changeInfo: (newInfo: { [key: string]: string }) => void;
  fixedCategory: Category;
}

export default function FoodCategoryModal({
  categoryOpen,
  setCategoryOpen,
  changeInfo,
  fixedCategory,
}: Props) {
  return (
    <RNModal
      style='justify-center mx-4'
      bgColor='bg-white'
      modalVisible={categoryOpen}
      setModalVisible={setCategoryOpen}
    >
      <View style={tw`p-4 gap-5`}>
        <Text
          fontSize={16}
          style={tw.style('text-slate-600 mb-1', FontGmarketSansBold)}
        >
          카테고리 선택
        </Text>
        {foodCategories.map(({ category }) => (
          <CheckBoxItem
            key={category}
            onPress={() => {
              changeInfo({ category });
              setCategoryOpen(false);
            }}
            title={category}
            checked={category === fixedCategory}
          />
        ))}
      </View>
    </RNModal>
  );
}
