import { Asset } from 'expo-asset';
import { View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { Category } from '../../constant/foodCategories';
import { DEVICE_WIDTH } from '../../util';
import { shadowStyle } from '../../constant/shadowStyle';

import CategoryImageIcon from '../common/CategoryImageIcon';
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
  const width = (DEVICE_WIDTH - 70) / 3;

  const checkedColor = checked
    ? 'bg-amber-200 border-amber-300'
    : 'bg-stone-100 border-slate-200';

  return (
    <TouchableOpacity
      onPress={() => onCheckBoxPress(category)}
      style={tw.style(
        `flex-row h-23 items-center justify-center border ${checkedColor} w-[${width}px] rounded-lg
        pt-3 pb-1 px-1`
      )}
    >
      <View style={tw`items-center justify-center gap-2`}>
        {assets && (
          <CategoryImageIcon
            kind='image'
            assets={assets}
            category={category}
            size={30}
          />
        )}
        <View style={tw`items-center justify-center`}>
          <Text
            style={tw.style(
              `text-[13px] text-center ${
                checked ? 'text-blue-600' : 'text-slate-600'
              }`,
              {
                lineHeight: 18,
              }
            )}
          >
            {category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
