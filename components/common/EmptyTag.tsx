import { View } from 'react-native';
import { Text } from '../native-component';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Feather';
import { DEEP_INDIGO } from '../../constant/colors';

export type EmptyTagName =
  | '아직 자주 먹는 식료품 정보가 없습니다'
  | '아직 유통기한이 지난 식료품이 없습니다'
  | '아직 유통기한이 임박한 식료품이 없습니다'
  | '알림이 없습니다'
  | '검색어를 작성해주세요.';

export default function EmptyTag({ tagName }: { tagName: EmptyTagName }) {
  return (
    <View
      style={tw`h-24 justify-center items-center gap-4 border flex-1 rounded-lg border-indigo-400 bg-white`}
    >
      <Text styletw='text-sm text-slate-500'>{tagName}</Text>
      <View style={tw`flex-row`}>
        <Text styletw='text-xs text-indigo-500'>목록 관리하기</Text>
        <Icon name='chevron-right' size={16} color={DEEP_INDIGO} />
      </View>
    </View>
  );
}
