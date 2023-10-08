import { View } from 'react-native';
import { Category } from '../../constant/foodCategories';
import { TouchableOpacity } from '../common/native-component';

import CategoryIcon from '../common/CategoryIcon';
import tw from 'twrnc';

interface Props {
  category: Category;
  setCategoryOpen: (open: boolean) => void;
}

export default function InputCategoryBtn({ category, setCategoryOpen }: Props) {
  return (
    <TouchableOpacity
      onPress={() => setCategoryOpen(true)}
      style={tw`h-full border-r border-slate-200 flex-row items-center justify-center`}
    >
      <View style={tw`pl-3.5 pr-2.5`}>
        <CategoryIcon category={category} size={20} />
      </View>
    </TouchableOpacity>
  );
}
