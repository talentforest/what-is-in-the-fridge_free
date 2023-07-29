import { Category } from '../../../constant/foodCategories';
import { Text, TouchableOpacity } from '../../native-component';
import { useState } from 'react';
import { scaleH } from '../../../util';
import FoodCategoryModal from '../../screen-component/modal/FoodCategoryModal';
import tw from 'twrnc';

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
        border border-slate-400 bg-white rounded-lg items-center flex-row gap-2 justify-between`}
      >
        <Text style={tw`text-slate-900 border-0 pl-2`}>{fixedCategory}</Text>
        <Text style={tw`text-indigo-500 p-2`}>변경</Text>
        <FoodCategoryModal
          categoryOpen={categoryOpen}
          setCategoryOpen={setCategoryOpen}
          changeInfo={changeInfo}
          fixedCategory={fixedCategory}
        />
      </TouchableOpacity>
    </>
  );
}
