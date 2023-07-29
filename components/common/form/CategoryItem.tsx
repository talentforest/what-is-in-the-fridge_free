import { View } from 'react-native';
import { Category, foodCategories } from '../../../constant/foodCategories';
import { Text, TouchableOpacity } from '../../native-component';
import { useState } from 'react';
import { scaleH } from '../../../util';
import { FontGmarketSansBold } from '../../../constant/fonts';
import CheckBoxItem from './CheckBoxItem';
import RNModal from '../modal/Modal';
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
      </TouchableOpacity>

      <RNModal modalVisible={categoryOpen} setModalVisible={setCategoryOpen}>
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
    </>
  );
}
