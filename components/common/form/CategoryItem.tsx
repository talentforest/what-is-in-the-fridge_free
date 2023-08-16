import { Category } from '../../../constant/foodCategories';
import { Text, TouchableOpacity } from '../../native-component';
import { View } from 'react-native';
import { useState } from 'react';
import { scaleH } from '../../../util';
import Icon from '../../native-component/Icon';
import FormItemDetailModal from '../../screen-component/modal/FormItemDetailModal';
import tw from 'twrnc';

interface Props {
  fixedCategory: Category;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

export default function CategoryItem({ fixedCategory, changeInfo }: Props) {
  const [categoryOpen, setCategoryOpen] = useState(false);

  const onCheckBoxPress = (category: string) => {
    changeInfo({ category });
    setCategoryOpen(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setCategoryOpen((prev) => !prev)}
        style={tw`h-[${scaleH(44)}px] 
        border border-indigo-500 px-2 bg-white rounded-lg items-center flex-row gap-2 justify-between`}
      >
        <View style={tw`flex-row items-center gap-1.5`}>
          <Icon name='check-circle' type='MaterialCommunityIcons' size={18} />
          <Text style={tw`text-slate-900 border-0`}>{fixedCategory}</Text>
        </View>
        <Icon
          name='unfold-more-horizontal'
          type='MaterialCommunityIcons'
          size={24}
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
    </>
  );
}
