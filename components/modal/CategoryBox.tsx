import { Image, View, useWindowDimensions } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { Category } from '../../constant/foodCategories';
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
  const checkedColor = checked
    ? 'bg-amber-200 border-amber-200'
    : 'bg-slate-50 border-slate-100';

  const { width, height } = useWindowDimensions();

  const GAP = 20;
  const paddingHorizontal = 32;
  const marginHorizontal = 32;

  const boxWidth =
    height > 900
      ? width * 0.8 - paddingHorizontal
      : width - paddingHorizontal - marginHorizontal;

  const cardWidth = (boxWidth - GAP) / 3;

  return (
    <TouchableOpacity
      onPress={() => onCheckBoxPress(category)}
      style={tw.style(
        `w-[${cardWidth}px] ${checkedColor} flex-row h-22 gap-0.5 items-center justify-center border rounded-lg pt-2 pb-1 px-1.5`
      )}
    >
      <View style={tw`items-center justify-center gap-1`}>
        {localUri && (
          <Image source={{ uri: localUri }} style={{ width: 40, height: 40 }} />
        )}
        <View style={tw`items-center justify-center`}>
          <Text
            fontSize={14}
            style={tw.style(
              `text-center 
              ${checked ? 'text-blue-600' : 'text-slate-600'}`,
              { lineHeight: 14 }
            )}
          >
            {category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
