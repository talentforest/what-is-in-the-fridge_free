import { Asset } from 'expo-asset';
import { View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { BLUE, LIGHT_GRAY } from '../../constant/colors';
import { Category } from '../../constant/foodCategories';
import { DEVICE_WIDTH } from '../../util';

import CategoryImageIcon from '../common/CategoryImageIcon';
import Icon from '../common/native-component/Icon';
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
  const width = (DEVICE_WIDTH - 94) / 3;

  const checkedColor = checked
    ? 'bg-blue-200 text-slate-900'
    : 'bg-stone-100 text-slate-500';

  return (
    <TouchableOpacity
      onPress={() => onCheckBoxPress(category)}
      style={tw`border border-slate-300 ${checkedColor} w-[${width}px] h-32 rounded-lg justify-between items-center py-3 px-2`}
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

      <Icon
        type='MaterialCommunityIcons'
        name={checked ? 'check-circle-outline' : 'circle-outline'}
        color={checked ? BLUE : LIGHT_GRAY}
        size={20}
      />
    </TouchableOpacity>
  );
}
