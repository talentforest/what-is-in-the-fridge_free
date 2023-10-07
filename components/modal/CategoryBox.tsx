import { Image, View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { Category } from '../../constant/foodCategories';
import { DEVICE_WIDTH } from '../../util';
import tw from 'twrnc';

interface Props {
  checked: boolean;
  category: Category;
  onCheckBoxPress: (category: Category) => void;
  localUri: string;
}

export default function CategoryBox({
  checked,
  category,
  onCheckBoxPress,
  localUri,
}: Props) {
  const width = (DEVICE_WIDTH - 75) / 3;

  const checkedColor = checked
    ? 'bg-amber-200 border-amber-300'
    : 'bg-slate-100 border-slate-200';

  return (
    <TouchableOpacity
      onPress={() => onCheckBoxPress(category)}
      style={tw`w-[${width}px] ${checkedColor} flex-row h-26 items-center justify-center border rounded-lg pt-3 pb-1 px-1`}
    >
      <View style={tw`items-center justify-center gap-2`}>
        {localUri && (
          <Image source={{ uri: localUri }} style={{ width: 40, height: 40 }} />
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
