import { Asset } from 'expo-asset';
import { Dimensions, View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { BLUE } from '../../../constant/colors';
import { Category } from '../../../constant/foodCategories';

import CategoryImageIcon from '../CategoryImageIcon';
import CheckBox from '../CheckBox';
import tw from 'twrnc';

interface Props {
  checked: boolean;
  category: Category;
  onCheckBoxPress: (category: Category) => void;
  assets: Asset[];
}

export default function CategoryBox({
  checked,
  category,
  onCheckBoxPress,
  assets,
}: Props) {
  const width = (Dimensions.get('screen').width - 94) / 3;

  const checkedColor = checked
    ? 'bg-blue-200 text-slate-900'
    : 'bg-stone-100 text-slate-500';

  return (
    <TouchableOpacity
      onPress={() => onCheckBoxPress(category)}
      style={tw`${checkedColor} w-[${width}px] h-34 rounded-lg justify-between items-center py-3 px-2`}
    >
      {assets && (
        <CategoryImageIcon
          kind='image'
          assets={assets}
          category={category}
          size={40}
        />
      )}

      <View style={tw`flex-1 items-center justify-center`}>
        <Text style={tw`text-center text-xs ${checkedColor}`}>{category}</Text>
      </View>

      <CheckBox checked={checked} activeColor={BLUE} size={18} />
    </TouchableOpacity>
  );
}
