import { Category, foodCategories } from '../../../constant/foodCategories';
import { Text, TouchableOpacity } from '../../native-component';
import { useState } from 'react';
import { scaleH } from '../../../util';
import FoodCategoryModal from '../../screen-component/modal/FoodCategoryModal';
import tw from 'twrnc';
import Icon from '../../native-component/Icon';
import { View } from 'react-native';
import CheckBoxItem from './CheckBoxItem';

interface Props {
  fixedCategory: Category;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

export default function CategoryItem({ fixedCategory, changeInfo }: Props) {
  const [categoryOpen, setCategoryOpen] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setCategoryOpen((prev) => !prev)}
        style={tw`h-[${scaleH(44)}px] 
        border border-slate-400 px-2 bg-white rounded-lg items-center flex-row gap-2 justify-between`}
      >
        <Text style={tw`text-slate-900 border-0`}>{fixedCategory}</Text>
        <Icon
          name='unfold-more-horizontal'
          type='MaterialCommunityIcons'
          size={24}
        />
      </TouchableOpacity>
      <FoodCategoryModal
        categoryOpen={categoryOpen}
        setCategoryOpen={setCategoryOpen}
        changeInfo={changeInfo}
        fixedCategory={fixedCategory}
      />
    </>
  );
}
