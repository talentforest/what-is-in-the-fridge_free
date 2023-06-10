import { View } from 'react-native';
import { Category, foodCategories } from '../../../constant/foodCategories';
import { Text, TextInput, TouchableOpacity } from '../../native-component';
import { useState } from 'react';
import CheckBoxItem from './CheckBoxItem';
import tw from 'twrnc';

interface Props {
  fixedCategory: Category;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

export default function CategoryItem({ fixedCategory, changeInfo }: Props) {
  const [categoryOpen, setCategoryOpen] = useState(false);

  return (
    <View style={tw`gap-2 flex-1`}>
      <View>
        <TextInput
          style={tw`w-full text-slate-600`}
          value={fixedCategory}
          editable={false}
        />
        <TouchableOpacity
          onPress={() => setCategoryOpen((prev) => !prev)}
          style={tw`absolute p-2.5 pl-10 right-0 top-2`}
        >
          <Text style={tw`text-indigo-500`} fontSize={13}>
            변경
          </Text>
        </TouchableOpacity>
      </View>
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
