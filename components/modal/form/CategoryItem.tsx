import { View } from 'react-native';
import { Category, foodCategories } from '../../../constant/foodCategories';
import { Text, TouchableOpacity } from '../../native-component';
import { useState } from 'react';
import { scaleH } from '../../../util';
import CheckBoxItem from './CheckBoxItem';
import tw from 'twrnc';
import Modal from 'react-native-modal';
import { FontGmarketSansBold } from '../../../constant/fonts';

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
        style={tw`h-[${scaleH(
          42
        )}px] border border-slate-400 rounded-lg items-center flex-row gap-2 justify-between`}
      >
        <Text style={tw`text-slate-600 border-0 pl-2`}>{fixedCategory}</Text>
        <Text style={tw`text-indigo-500 p-2`}>변경</Text>
      </TouchableOpacity>

      <Modal
        statusBarTranslucent={true}
        onBackdropPress={() => setCategoryOpen(false)}
        isVisible={categoryOpen}
        style={tw`m-0 justify-end`}
      >
        <View style={tw`rounded-lg bg-white px-5 py-8 gap-5`}>
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
      </Modal>
    </>
  );
}
