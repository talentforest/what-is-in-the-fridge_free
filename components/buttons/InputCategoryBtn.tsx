import { View } from 'react-native';
import { BLUE, LIGHT_GRAY } from '../../constant/colors';
import { Category } from '../../constant/foodCategories';
import { Text, TouchableOpacity } from '../common/native-component';

import CategoryImageIcon from '../common/CategoryImageIcon';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  category: Category | '';
  setCategoryOpen: (open: boolean) => void;
}

export default function InputCategoryBtn({ category, setCategoryOpen }: Props) {
  return (
    <TouchableOpacity
      onPress={() => setCategoryOpen(true)}
      style={tw`h-full border-r border-slate-500 flex-row items-center justify-center pl-1 pr-1.5`}
    >
      {category === '' ? (
        <Text style={tw`text-center text-slate-400 max-w-19`}>카테고리</Text>
      ) : (
        <View style={tw`p-2`}>
          <CategoryImageIcon kind='icon' category={category} size={20} />
        </View>
      )}
      <Icon
        name='unfold-more-horizontal'
        type='MaterialCommunityIcons'
        size={14}
        color={LIGHT_GRAY}
      />
    </TouchableOpacity>
  );
}
