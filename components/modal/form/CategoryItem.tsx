import { View } from 'react-native';
import { Category, foodCategories } from '../../../constant/foodCategories';
import { Text, TextInput, TouchableOpacity } from '../../native-component';
import { useState } from 'react';
import CheckBoxItem from './CheckBoxItem';
import tw from 'twrnc';
import { scaleH } from '../../../util';

interface Props {
  fixedCategory: Category;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

export default function CategoryItem({ fixedCategory, changeInfo }: Props) {
  const [categoryOpen, setCategoryOpen] = useState(false);

  return (
    <View style={tw`gap-2 flex-1`}>
      <TouchableOpacity
        onPress={() => setCategoryOpen((prev) => !prev)}
        style={tw`h-[${scaleH(
          11
        )}] border border-slate-400 rounded-lg items-center flex-row gap-2 justify-between`}
      >
        <Text style={tw`text-slate-600 border-0 pl-2`}>{fixedCategory}</Text>
        <Text style={tw`text-indigo-500 p-2`} fontSize={13}>
          변경
        </Text>
      </TouchableOpacity>
      {categoryOpen && (
        <View style={tw`gap-2 flex-1`}>
          {foodCategories.map(({ category }) => (
            <CheckBoxItem
              key={category}
              onPress={() => {
                changeInfo({ category });
                setCategoryOpen(false);
              }}
              title={category}
              check={category === fixedCategory}
            />
          ))}
        </View>
      )}
    </View>
  );
}
