import { Animated, View } from 'react-native';
import { shadowStyle } from '../../constant/shadowStyle';
import { InputStyle, Text, TouchableOpacity } from '../common/native-component';
import { useToggleAnimation } from '../../hooks';
import {
  GRAY,
  LIGHT_GRAY,
  MEDIUM_GRAY,
  MEDIUM_INDIGO,
  YELLOW,
} from '../../constant/colors';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  width: number;
  active: boolean;
  onTogglePress: (index: number) => void;
  toggleBtnNames: string[];
  disabled?: boolean;
  color?: 'gray' | 'indigo';
}

export default function ToggleBtn({
  width,
  active,
  onTogglePress,
  toggleBtnNames,
  disabled,
  color,
}: Props) {
  const { translateX } = useToggleAnimation({
    initialValue: 4,
    toValue: width + 4,
    active,
  });

  const toggleActive = (index: number) => (index === 1 ? active : !active);

  return (
    <View
      style={tw.style(
        `${InputStyle} border-slate-200 ${
          active ? `bg-${color}-400` : 'bg-slate-300'
        } h-full flex-row items-center p-1 rounded-full self-start`,
        shadowStyle(3)
      )}
    >
      <Animated.View
        style={tw.style(
          `${disabled ? 'bg-gray-200' : 'bg-white'} 
          rounded-full h-full absolute`,
          {
            width,
            transform: [{ translateX }],
            ...shadowStyle(3),
          }
        )}
      />

      {toggleBtnNames?.map((btnName, index) => (
        <TouchableOpacity
          key={index}
          style={tw`flex-row items-center justify-center gap-0.5 h-full w-[${width}px]`}
          onPress={() => onTogglePress(index)}
          disabled={disabled}
        >
          {btnName !== '' ? (
            <>
              <Icon
                type='Octicons'
                name={index === 1 ? 'star-fill' : 'star'}
                size={13}
                color={
                  disabled || !toggleActive(index)
                    ? MEDIUM_GRAY
                    : index === 1
                    ? YELLOW
                    : GRAY
                }
              />
              <Text
                style={tw`${
                  disabled || !toggleActive(index)
                    ? 'text-slate-500'
                    : index === 1
                    ? `text-indigo-600`
                    : 'text-slate-700'
                }`}
              >
                {btnName}
              </Text>
            </>
          ) : null}
        </TouchableOpacity>
      ))}
    </View>
  );
}
