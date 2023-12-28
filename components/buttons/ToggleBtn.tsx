import { Animated, View } from 'react-native';
import { shadowStyle } from '../../constant/shadowStyle';
import { InputStyle, Text, TouchableOpacity } from '../common/native-component';
import { useToggleAnimation } from '../../hooks';
import { LIGHT_GRAY, MEDIUM_INDIGO, YELLOW } from '../../constant/colors';
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
    initialValue: 0,
    toValue: width,
    active,
  });

  const toggleActive = (index: number) => (index === 1 ? active : !active);

  const activeBtnColor =
    color === 'gray'
      ? `bg-gray-${active ? '600' : '200'}`
      : `bg-${color}-${active ? '400' : '100'}`;

  return (
    <View
      style={tw.style(
        `${InputStyle} border-slate-200 bg-white h-full flex-row items-center p-0 rounded-full self-start`,
        shadowStyle(3)
      )}
    >
      <Animated.View
        style={tw.style(
          `${disabled ? 'bg-gray-200' : activeBtnColor} 
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
          style={tw`flex-row items-center justify-center gap-1 h-full w-[${width}px]`}
          onPress={() => onTogglePress(index)}
          disabled={disabled}
        >
          {btnName !== '' ? (
            <>
              <Icon
                type='Octicons'
                name={index === 0 ? 'star-fill' : 'star'}
                size={14}
                color={
                  disabled || !toggleActive(index)
                    ? LIGHT_GRAY
                    : index === 1
                    ? YELLOW
                    : MEDIUM_INDIGO
                }
              />
              <Text
                style={tw`${
                  disabled || !toggleActive(index)
                    ? 'text-slate-400'
                    : index === 1
                    ? `text-white`
                    : 'text-indigo-400'
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
