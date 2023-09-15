import { View } from 'react-native';
import { Text } from '../common/native-component';
import { FontGmarketSansBold } from '../../constant/fonts';
import tw from 'twrnc';

interface Props {
  title: string;
  length?: number;
}

export default function TableHeader({ title, length }: Props) {
  return (
    <View style={tw`flex-row items-center mb-2 h-8 mr-2 gap-2`}>
      <Text style={tw.style(`text-slate-700`, FontGmarketSansBold)}>
        {title}
      </Text>
      {length !== undefined && (
        <Text style={tw`text-slate-800 flex-1`}>{length}개</Text>
      )}
    </View>
  );
}
