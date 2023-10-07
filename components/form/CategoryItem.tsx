import { useState } from 'react';
import { Keyboard, View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { Category } from '../../constant/foodCategories';
import { useFindFood } from '../../hooks';
import { ModalTitle } from '../modal/Modal';
import { shadowStyle } from '../../constant/shadowStyle';

import CategoryModal from '../../screen-component/modal/CategoryModal';
import FormLabel from './FormLabel';
import CategoryIcon from '../common/CategoryIcon';
import tw from 'twrnc';

interface Props {
  name: string;
  fixedCategory: Category;
  changeInfo: (newInfo: { [key: string]: string }) => void;
  title: ModalTitle;
}

export default function CategoryItem({
  name,
  fixedCategory,
  changeInfo,
  title,
}: Props) {
  const [categoryOpen, setCategoryOpen] = useState(false);

  const { isFavoriteItem } = useFindFood();
  const favoriteFoodItemCategory = isFavoriteItem(name)?.category;
  const disabledCategory = favoriteFoodItemCategory && !title.includes('수정');

  const category = disabledCategory ? favoriteFoodItemCategory : fixedCategory;

  const onCheckBoxPress = (category: string) => {
    changeInfo({ category });
    setCategoryOpen(false);
  };

  const activeColor = 'border-slate-300 text-slate-900';
  const inActiveColor = 'border-slate-300 text-slate-400';
  const color = disabledCategory ? inActiveColor : activeColor;

  return (
    <View>
      <FormLabel label='카테고리' />
      <TouchableOpacity
        onPress={() => {
          if (Keyboard.isVisible()) Keyboard.dismiss();
          setCategoryOpen((prev) => !prev);
        }}
        disabled={disabledCategory}
        style={tw.style(
          `h-11 border ${color} px-3 bg-white rounded-lg items-center flex-row gap-2 justify-between`,
          shadowStyle(3)
        )}
      >
        <View style={tw`flex-row items-center gap-2`}>
          <CategoryIcon category={category} size={18} />
          <Text style={tw`${color}`}>{category}</Text>
        </View>
      </TouchableOpacity>

      <CategoryModal
        modalVisible={categoryOpen}
        setModalVisible={setCategoryOpen}
        currentChecked={fixedCategory}
        onCheckBoxPress={onCheckBoxPress}
      />
    </View>
  );
}
