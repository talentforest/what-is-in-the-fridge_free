import { View } from 'react-native';
import { AMBER, BLUE } from '../../constant/colors';
import { shadowStyle } from '../../constant/shadowStyle';
import { Text, TouchableOpacity } from '../common/native-component';

import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  onPress: () => void;
  icon: string;
  btnName: '삭제' | '한번에 추가' | '장보기 추가';
}

export default function SquareIconBtn({ onPress, icon, btnName }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw.style(
        `bg-white border-2 border-indigo-200 items-center justify-center rounded-xl`,
        shadowStyle(4)
      )}
    >
      <View style={tw`p-2.5 flex-row items-center gap-1`}>
        <Icon
          type='MaterialCommunityIcons'
          name={icon}
          size={15}
          color={icon.includes('plus') ? BLUE : AMBER}
        />
        <Text>{btnName}</Text>
      </View>
    </TouchableOpacity>
  );
}
