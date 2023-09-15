import { View } from 'react-native';
import { TextInput, TouchableOpacity } from './native-component';
import { DEEP_GRAY, LIGHT_GRAY } from '../../constant/colors';
import { ReactNode } from 'react';

import Icon from './native-component/Icon';
import tw from 'twrnc';

interface Props {
  value: string;
  setValue: (keyword: string) => void;
  iconName: 'search' | 'plus';
  placeholder: string;
  onSubmitEditing: () => void;
  children?: ReactNode;
  autoFocus?: boolean;
  disabled?: boolean;
}

export default function TextInputRoundedBox({
  value,
  setValue,
  iconName,
  placeholder,
  onSubmitEditing,
  children,
  autoFocus,
  disabled,
}: Props) {
  return (
    <View
      style={tw`h-11 mt-1 w-full shadow-md border border-slate-300 rounded-full items-center flex-row bg-white pl-2.5 pr-3.5`}
    >
      {children}

      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        blurOnSubmit={false}
        style={tw`flex-1 border-0 my-0.5 items-center justify-center`}
        onSubmitEditing={onSubmitEditing}
        autoFocus={autoFocus}
      />

      <TouchableOpacity
        disabled={disabled}
        onPress={onSubmitEditing}
        style={tw`h-full items-center justify-center`}
      >
        <Icon
          type={iconName === 'search' ? 'Ionicons' : 'MaterialCommunityIcons'}
          name={iconName}
          size={iconName === 'search' ? 21 : 23}
          color={disabled ? LIGHT_GRAY : DEEP_GRAY}
        />
      </TouchableOpacity>
    </View>
  );
}
