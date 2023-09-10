import { View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { FontGmarketSansBold } from '../../constant/fonts';
import { BLUE } from '../../constant/colors';
import { useRoute } from '@react-navigation/native';
import CheckBox from '../common/CheckBox';
import tw from 'twrnc';

interface Props {
  title: string;
  length?: number;
  entireChecked: boolean;
  onEntirePress: () => void;
}

export default function TableHeader({
  title,
  length,
  entireChecked,
  onEntirePress,
}: Props) {
  const route = useRoute();
  return (
    <View style={tw`flex-row items-center justify-between mb-2 h-8 mr-2 gap-2`}>
      <TouchableOpacity
        onPress={onEntirePress}
        style={tw`flex-row items-center gap-2 pl-3`}
      >
        <CheckBox
          checked={entireChecked}
          activeColor={route.name === 'PantryFoods' ? 'amber' : BLUE}
        />
        <Text style={tw.style(`text-slate-700`, FontGmarketSansBold)}>
          {title}
        </Text>
      </TouchableOpacity>
      {length !== undefined && (
        <Text style={tw`text-slate-600 text-sm flex-1`}>{length}개</Text>
      )}
    </View>
  );
}
