import { View } from 'react-native';
import { Text } from '../common/native-component';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

export default function FormInfoType({
  title,
}: {
  title: '선택정보' | '필수정보';
}) {
  return (
    <View style={tw`mx-6`}>
      <View
        style={tw`flex-row items-center gap-1 border-b border-slate-300 pb-1 mb-1`}
      >
        <Icon
          name={title === '필수정보' ? 'alert-circle-outline' : 'pencil'}
          type='MaterialCommunityIcons'
          size={17}
          color='amber'
        />
        <Text style={tw`text-amber-700 text-sm border-b`}>{title}</Text>
      </View>
      {title === '선택정보' && (
        <Text style={tw`text-sm text-slate-600 mb-2`}>
          펜트리 식료품의 날짜 정보는 선택 사항입니다.
        </Text>
      )}
    </View>
  );
}
