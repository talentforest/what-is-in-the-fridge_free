import { Text, TouchableOpacity } from '../../native-component';
import { INDIGO } from '../../../constant/colors';
import { ReactNode } from 'react';
import tw from 'twrnc';
import Icon from '../../native-component/Icon';
import { scaleH } from '../../../util';

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  iconName: string;
  children?: ReactNode;
}

export default function SettingItem({
  title,
  onPress,
  disabled,
  iconName,
  children,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`h-[${scaleH(
        46
      )}px] flex-row justify-between items-center gap-1 border-b border-slate-300 px-2 bg-white`}
      disabled={disabled}
    >
      <Icon
        type='MaterialCommunityIcons'
        name={iconName}
        size={18}
        color={INDIGO}
      />
      <Text style={tw`ml-1.5 text-slate-600 flex-1`}>{title}</Text>
      {children}
    </TouchableOpacity>
  );
}
