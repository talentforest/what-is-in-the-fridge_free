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

  const { width } = useWindowDimensions();

  const cardWidth = (width - 95) / 3;

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
            style={tw.style(
              `text-[15px] text-center 
              ${checked ? 'text-blue-600' : 'text-slate-600'}`,
              {
                lineHeight: 17,
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
