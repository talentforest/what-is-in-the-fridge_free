import { View } from 'react-native';
import { scaleH } from '../../../util';
import { Text, TouchableOpacity } from '../../native-component';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

type btnName =
  | '자주 먹는 식료품 해제'
  | '나의 냉장고에서 삭제'
  | '장보기 목록에 추가'
  | '장보기 리스트에서 삭제';

interface Props {
  btnName: btnName;
  onPress: () => void;
}

export default function SquareBtn({ btnName, onPress }: Props) {
  const getIconName = () => {
    if (btnName === '장보기 목록에 추가') return 'basket-plus-outline';
    return 'trash-can-outline';
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`h-[${scaleH(
        43
      )}px] bg-indigo-500 py-2.5 px-4 flex-row items-center gap-1.5 border border-indigo-300 rounded-md self-start`}
    >
      <View style={tw`w-5 text-center items-center`}>
        <Icon
          type='MaterialCommunityIcons'
          name={getIconName()}
          size={18}
          color='#fff'
        />
      </View>
      <Text style={tw`text-white`}>{btnName}</Text>
    </TouchableOpacity>
  );
}
