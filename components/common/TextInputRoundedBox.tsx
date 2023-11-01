import { Animated, View } from 'react-native';
import { TextInput, TouchableOpacity } from './native-component';
import { DEEP_GRAY, LIGHT_GRAY } from '../../constant/colors';
import { ReactNode } from 'react';
import { shadowStyle } from '../../constant/shadowStyle';
import { useSlideAnimation } from '../../hooks';

import Icon from './native-component/Icon';
import tw from 'twrnc';

interface Props {
  value: string;
  setValue: (keyword: string) => void;
  placeholder: string;
  onSubmitEditing: () => void;
  children?: ReactNode;
  autoFocus?: boolean;
  disabled?: boolean;
  checkedListLength: number;
}

export default function TextInputRoundedBox({
  value,
  setValue,
  placeholder,
  onSubmitEditing,
  children,
  autoFocus,
  disabled,
  checkedListLength,
}: Props) {
  const { height } = useSlideAnimation({
    initialValue: 66,
    toValue: 0,
    active: !!checkedListLength,
  });

  return (
    <Animated.View
      style={{
        height,
        overflow: 'hidden',
      }}
    >
      <View
        style={tw.style(
          `flex-1 mt-3 mb-4 rounded-full items-center flex-row bg-white `,
          shadowStyle(3)
        )}
      >
        {children}
        <View style={tw`flex-1 ${!!children ? '' : 'ml-2'}`}>
          <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            blurOnSubmit={false}
            style={tw`border-0 flex-1 rounded-full items-center justify-center`}
            onSubmitEditing={onSubmitEditing}
            autoFocus={autoFocus}
          />
        </View>
        <TouchableOpacity
          disabled={disabled}
          onPress={onSubmitEditing}
          style={tw`h-full pl-2 pr-3 items-center justify-center`}
        >
          <Icon
            type='Feather'
            name='plus'
            size={20}
            color={disabled ? LIGHT_GRAY : DEEP_GRAY}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
