import { useState } from 'react';
import { View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { Category } from '../../constant/foodCategories';
import { BLUE, LIGHT_GRAY } from '../../constant/colors';
import { useFindFood } from '../../hooks';

import FormItemDetailModal from '../../screen-component/modal/FormItemDetailModal';
import FormLabel from './FormLabel';
import CategoryImageIcon from '../common/CategoryImageIcon';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  name: string;
  fixedCategory: Category;
  changeInfo: (newInfo: { [key: string]: string }) => void;
  disabled: boolean;
}

export default function CategoryItem({
  name,
  fixedCategory,
  changeInfo,
  disabled,
}: Props) {
  const [categoryOpen, setCategoryOpen] = useState(false);

  const { findFavoriteListItem } = useFindFood();
  const favoriteFoodItemCategory = findFavoriteListItem(name)?.category;
  const disabledCategory = favoriteFoodItemCategory && disabled;

  const category = disabledCategory ? favoriteFoodItemCategory : fixedCategory;

  const onCheckBoxPress = (category: string) => {
    changeInfo({ category });
    setCategoryOpen(false);
  };

  const activeColor = 'border-blue-600 text-slate-900';
  const inActiveColor = 'border-slate-400 text-slate-400';
  const color = disabledCategory ? inActiveColor : activeColor;
  const iconColor = disabledCategory ? LIGHT_GRAY : BLUE;

  return (
    <View>
      <FormLabel label='카테고리' />
      <TouchableOpacity
        onPress={() => setCategoryOpen((prev) => !prev)}
        disabled={disabledCategory}
        style={tw`h-12 border ${color} px-3 bg-white rounded-lg items-center flex-row gap-2 justify-between`}
      >
        <View style={tw`flex-row items-center gap-2`}>
          <CategoryImageIcon
            kind='icon'
            category={category}
            size={16}
            color={iconColor}
          />
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
        <FormItemDetailModal
          modalVisible={categoryOpen}
          setModalVisible={setCategoryOpen}
          title='카테고리 선택'
          currentChecked={fixedCategory}
          onCheckBoxPress={onCheckBoxPress}
        />
      )}
    </View>
  );
}
