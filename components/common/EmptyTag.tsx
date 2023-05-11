import { View } from 'react-native';
import { Text } from '../native-component';
import tw from 'twrnc';

export type EmptyTagName =
  | '아직 자주 먹는 식료품 정보가 없습니다'
  | '아직 유통기한이 지난 식료품이 없습니다'
  | '아직 유통기한이 임박한 식료품이 없습니다'
  | '알림이 없습니다';

export default function EmptyTag({ tagName }: { tagName: EmptyTagName }) {
  return (
    <View style={tw`flex-1 w-full min-h-20 justify-center`}>
      <Text styletw='text-sm text-slate-500 text-center h-2/3'>{tagName}</Text>
    </View>
  );
}
