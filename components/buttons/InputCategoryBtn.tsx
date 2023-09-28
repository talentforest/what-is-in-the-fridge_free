import { View } from 'react-native';
import { Category } from '../../constant/foodCategories';
import { TouchableOpacity } from '../common/native-component';

import CategoryImageIcon from '../common/CategoryImageIcon';
import tw from 'twrnc';

interface Props {
  category: Category;
  setCategoryOpen: (open: boolean) => void;
}

export default function InputCategoryBtn({ category, setCategoryOpen }: Props) {
  return (
    <TouchableOpacity
      onPress={() => setCategoryOpen(true)}
      style={tw`h-full border-r border-slate-300 flex-row items-center justify-center`}
    >
      <View style={tw`p-2 px-2.5`}>
        <CategoryImageIcon kind='icon' category={category} size={20} />
      </View>
    </TouchableOpacity>
  );
}
