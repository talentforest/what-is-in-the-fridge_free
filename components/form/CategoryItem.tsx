import { useState } from 'react';
import { View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { Category } from '../../constant/foodCategories';
import { BLUE, LIGHT_GRAY } from '../../constant/colors';
import { useFindFood } from '../../hooks';

import CategoryModal from '../../screen-component/modal/CategoryModal';
import FormLabel from './FormLabel';
import CategoryImageIcon from '../common/CategoryImageIcon';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';
import { ModalTitle } from '../modal/Modal';

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

  const activeColor = 'border-blue-200 text-slate-900';
  const inActiveColor = 'border-slate-300 text-slate-400';
  const color = disabledCategory ? inActiveColor : activeColor;
  const iconColor = disabledCategory ? LIGHT_GRAY : BLUE;

  return (
    <View>
      <FormLabel label='카테고리' />
      <TouchableOpacity
        onPress={() => setCategoryOpen((prev) => !prev)}
        disabled={disabledCategory}
        style={tw`h-11 shadow-md border ${color} px-3 bg-white rounded-lg items-center flex-row gap-2 justify-between`}
      >
        <View style={tw`flex-row items-center gap-2`}>
          <CategoryImageIcon kind='icon' category={category} size={18} />
          <Text style={tw`${color} border-0`}>{category}</Text>
        </View>
        <Icon
          name='unfold-more-horizontal'
          type='MaterialCommunityIcons'
          size={18}
          color={iconColor}
        />
      </TouchableOpacity>

      {categoryOpen && (
        <CategoryModal
          modalVisible={categoryOpen}
          setModalVisible={setCategoryOpen}
          currentChecked={fixedCategory}
          onCheckBoxPress={onCheckBoxPress}
        />
      )}
    </View>
  );
}
