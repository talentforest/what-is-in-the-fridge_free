import { Animated, View } from 'react-native';
import { InputStyle, Text, TouchableOpacity } from '../common/native-component';
import { useToggleAnimation } from '../../hooks';
import { LIGHT_GRAY, MEDIUM_GRAY, YELLOW } from '../../constant/colors';
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
        `${InputStyle} ${
          disabled
            ? 'bg-gray-300 border-slate-300'
            : active
            ? `bg-${color}-400 border-${color}-300`
            : 'bg-slate-300 border-slate-200'
        } h-full flex-row items-center p-1 rounded-full self-start`
      )}
    >
      <Animated.View
        style={tw.style(
          `${disabled ? 'bg-gray-100' : 'bg-white border border-indigo-200'} 
          rounded-full h-full absolute`,
          {
            width,
            transform: [{ translateX }],
          }
        )}
      />

      {toggleBtnNames?.map((btnName, index) => (
        <TouchableOpacity
          key={index}
          style={tw`flex-row items-center justify-center gap-0.2 h-full w-[${width}px]`}
          onPress={() => onTogglePress(index)}
          disabled={disabled}
        >
          {btnName !== '' ? (
            <>
              <Icon
                type='Octicons'
                name={index === 1 ? 'star-fill' : 'star'}
                size={12}
                color={
                  disabled || (!toggleActive(index) && index === 0)
                    ? LIGHT_GRAY
                    : !toggleActive(index) && index === 1
                    ? MEDIUM_GRAY
                    : index === 1
                    ? YELLOW
                    : MEDIUM_GRAY
                }
              />
              <Text
                fontSize={16}
                style={tw.style(
                  ` ${
                    disabled
                      ? 'text-gray-400'
                      : toggleActive(index)
                      ? 'text-slate-600'
                      : index === 0
                      ? `text-slate-200`
                      : 'text-slate-500'
                  }`,
                  { letterSpacing: -0.8 }
                )}
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
