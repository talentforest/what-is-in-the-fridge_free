import { FoodType } from '../../screens/ExpiredFoods';
import { Text, TouchableOpacity } from '../native-component';
import tw from 'twrnc';

interface Props {
  name: string;
  tab: FoodType;
  onPress: () => void;
  length: number;
}

export default function TabBtn({ tab, name, onPress, length }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`border flex-row items-end gap-2 px-3 py-2 rounded-lg ${
        name === tab
          ? 'bg-white border-slate-400'
          : 'bg-slate-50 border-slate-300'
      }`}
    >
      <Text
        styletw={`${
          name.slice(0, 3) === tab ? 'text-indigo-600' : 'text-slate-400'
        }`}
      >
        {name} 식료품
      </Text>
      <Text
        styletw={`text-xs ${
          name !== tab
            ? 'text-slate-400'
            : length <= 2
            ? 'text-green-600'
            : length <= 8
            ? 'text-amber-600'
            : length > 15
            ? 'text-red-600'
            : 'text-slate-400'
        }`}
      >
        {length}개
      </Text>
    </TouchableOpacity>
  );
}
