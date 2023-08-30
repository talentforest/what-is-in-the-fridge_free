import { View } from 'react-native';
import { BLUE, DEEP_GRAY, LIGHT_GRAY } from '../../../constant/colors';
import { Category } from '../../../constant/foodCategories';
import { Text, TouchableOpacity } from '../../native-component';

import CategoryImageIcon from '../CategoryImageIcon';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

interface Props {
  category: Category | '';
  setCategoryOpen: (open: boolean) => void;
  value: string;
}

export default function InputCategoryBtn({
  category,
  setCategoryOpen,
  value,
}: Props) {
  const textColor = value.length ? DEEP_GRAY : LIGHT_GRAY;

  return (
    <TouchableOpacity
      onPress={() => setCategoryOpen(true)}
      style={tw`h-full border-r border-slate-500 flex-row items-center justify-center pl-1 pr-1.5`}
    >
      {category === '' ? (
        <Text style={tw`text-center text-[${textColor}] max-w-19`}>
          카테고리
        </Text>
      ) : (
        <View style={tw`p-2`}>
          <CategoryImageIcon
            kind='icon'
            category={category}
            size={20}
            color={BLUE}
          />
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
