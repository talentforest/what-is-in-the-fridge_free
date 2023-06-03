import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, TouchableOpacity } from '../../native-component';
import { INDIGO } from '../../../constant/colors';
import tw from 'twrnc';
import { ReactNode } from 'react';

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
      style={tw`flex-row justify-between items-center gap-1 border-b border-slate-300 py-3.5 px-2 bg-white`}
      disabled={disabled}
    >
      <Icon name={iconName} size={18} color={INDIGO} />
      <Text styletw='text-slate-800 flex-1'>{title}</Text>
      {children}
    </TouchableOpacity>
  );
}
