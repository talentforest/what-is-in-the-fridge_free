import { Text, TouchableOpacity } from '../../native-component';
import { GRAY } from '../../../constant/colors';
import { scaleH } from '../../../util';
import { ReactNode } from 'react';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

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
      style={tw`h-[${scaleH(46)}px]
      px-1 flex-row justify-between items-center border-b border-blue-300 gap-2 bg-white`}
      disabled={disabled}
    >
      <Icon
        type='MaterialCommunityIcons'
        name={iconName}
        size={18}
        color={GRAY}
      />
      <Text style={tw`text-slate-600 flex-1`}>{title}</Text>
      {children}
    </TouchableOpacity>
  );
}
