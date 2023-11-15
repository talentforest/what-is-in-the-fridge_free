import { View } from 'react-native';
import { BLUE } from '../../constant/colors';
import { shadowStyle } from '../../constant/shadowStyle';
import { Text, TouchableOpacity } from '../common/native-component';

import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  onPress: () => void;
  disabled: boolean;
  icon: string;
  btnName: '삭제' | '한번에 추가' | '장보기 추가' | '해제';
}

export default function SquareIconBtn({
  onPress,
  disabled,
  icon,
  btnName,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={tw.style(
        `bg-white border min-h-11 border-slate-200 ml-1 mb-0.5 items-center justify-center rounded-2xl`,
        shadowStyle(4)
      )}
    >
      <View style={tw`px-3 py-1.5 flex-row items-center gap-1`}>
        <Icon
          type='MaterialCommunityIcons'
          name={icon}
          size={16}
          color={icon.includes('plus') ? BLUE : 'amber'}
        />
        <Text>{btnName}</Text>
      </View>
    </TouchableOpacity>
  );
}
