import { View } from 'react-native';
import { BLUE } from '../../constant/colors';
import { shadowStyle } from '../../constant/shadowStyle';
import { TouchableOpacity } from '../common/native-component';

import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  onPress: () => void;
  disabled: boolean;
  icon: string;
}

export default function SquareIconBtn({ onPress, disabled, icon }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={tw.style(
        `bg-white border border-slate-200 ml-1 mb-0.5 items-center justify-center rounded-2xl`,
        shadowStyle(4)
      )}
    >
      <View style={tw`p-3`}>
        <Icon
          type='MaterialCommunityIcons'
          name={icon}
          size={22}
          color={icon.includes('plus') ? BLUE : 'amber'}
        />
      </View>
    </TouchableOpacity>
  );
}
