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
    <View style={tw`absolute inset-0 justify-center`}>
      <Text styletw='text-sm text-slate-500 text-center'>{tagName}</Text>
    </View>
  );
}
