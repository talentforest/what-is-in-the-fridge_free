import { Animated, TextInput as TI, View } from 'react-native';
import { TextInput, TouchableOpacity, baseFontSize } from './native-component';
import { DEEP_GRAY, LIGHT_GRAY } from '../../constant/colors';
import { MutableRefObject, ReactNode, useRef } from 'react';
import { shadowStyle } from '../../constant/shadowStyle';
import { useSelector } from '../../redux/hook';
import { useItemSlideAnimation } from '../../hooks';
import { NAME_MAX_LENGTH } from '../../constant/foodInfo';

import Icon from './native-component/Icon';
import tw from 'twrnc';

interface Props {
  value: string;
  setValue: (text: string) => void;
  placeholder: string;
  onSubmitEditing: () => void;
  onBlur?: () => void;
  children?: ReactNode;
  autoFocus?: boolean;
  disabled?: boolean;
  inputRef?: MutableRefObject<TI>;
}

export default function TextInputRoundedBox({
  value,
  setValue,
  placeholder,
  onSubmitEditing,
  onBlur,
  children,
  autoFocus,
  disabled,
  inputRef,
}: Props) {
  const { checkedList } = useSelector((state) => state.checkedList);

  const { height } = useItemSlideAnimation({
    initialValue: 70,
    toValue: 0,
    active: checkedList.length > 0,
  });

  return (
    <Animated.View style={tw.style('overflow-hidden -mx-1 px-1', { height })}>
      <View
        style={tw.style(
          `flex-1 my-4 rounded-full items-center flex-row bg-white`,
          shadowStyle(2)
        )}
      >
        {children}

        <View style={tw`flex-1 ml-2`}>
          <TextInput
            inputRef={inputRef}
            fontSize={baseFontSize + 1}
            maxLength={NAME_MAX_LENGTH}
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            blurOnSubmit={false}
            style={tw`border-0 flex-1 my-0.5 rounded-full items-center justify-center`}
            onSubmitEditing={onSubmitEditing}
            autoFocus={autoFocus}
            onBlur={onBlur}
          />
        </View>

        <TouchableOpacity
          disabled={disabled}
          onPress={onSubmitEditing}
          style={tw`h-full pl-2 pr-3 items-center justify-center`}
        >
          <Icon
            type='Octicons'
            name='plus'
            size={20}
            color={disabled ? LIGHT_GRAY : DEEP_GRAY}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
