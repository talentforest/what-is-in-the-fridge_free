import { Asset } from 'expo-asset';
import { View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { Category } from '../../constant/foodCategories';
import { DEVICE_WIDTH } from '../../util';
import { shadowStyle } from '../../constant/shadowStyle';

import CategoryImageIcon from '../common/CategoryImageIcon';
import tw from 'twrnc';
import Icon from '../common/native-component/Icon';

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
  const width = (DEVICE_WIDTH - 80) / 2;

  const checkedColor = checked
    ? 'bg-blue-200 border-blue-300'
    : 'bg-stone-100 border-slate-300';

  return (
    <TouchableOpacity
      onPress={() => onCheckBoxPress(category)}
      style={tw.style(
        `flex-row h-14 gap-1.5 border ${checkedColor} w-[${width}px] rounded-lg justify-between items-center 
        pr-2 pl-${checked ? '5.5' : '3'}`,
        shadowStyle(3)
      )}
    >
      {checked && (
        <View style={tw`absolute -top-2 left-0.5`}>
          <Icon
            name='check-underline-circle'
            type='MaterialCommunityIcons'
            size={22}
          />
        </View>
      )}

      <View style={tw`flex-row items-center justify-center flex-1 gap-2`}>
        {assets && (
          <CategoryImageIcon
            kind='image'
            assets={assets}
            category={category}
            size={24}
          />
        )}

        <Text
          style={tw.style(
            `text-[14px] flex-1 py-0 ${
              checked ? 'text-blue-600' : 'text-slate-600'
            }`,
            {
              lineHeight: 20,
            }
          )}
        >
          {category}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
