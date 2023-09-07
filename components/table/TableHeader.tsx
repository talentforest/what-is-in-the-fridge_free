import { View } from 'react-native';
import { Text } from '../common/native-component';
import { FontGmarketSansBold } from '../../constant/fonts';
import tw from 'twrnc';

interface Props {
  title: string;
  length?: number;
  columnTitle?: string;
}

export default function TableHeader({ title, length, columnTitle }: Props) {
  return (
    <View style={tw`flex-row items-center justify-between mb-2 h-8 mr-2 gap-4`}>
      <Text style={tw.style(`text-slate-700 text-[17px]`, FontGmarketSansBold)}>
        {title}
      </Text>
      {!!columnTitle && (
        <Text style={tw`text-slate-700 text-[15px]`}>{columnTitle}</Text>
      )}
      {!!length && (
        <Text style={tw`text-slate-700 mr-3 flex-1`}>{length}개</Text>
      )}
    </View>
  );
}
