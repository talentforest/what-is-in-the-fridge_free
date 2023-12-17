import { Animated, View } from 'react-native';
import { shadowStyle } from '../../constant/shadowStyle';
import { InputStyle, Text, TouchableOpacity } from '../common/native-component';
import { useToggleAnimation } from '../../hooks';
import {
  AMBER,
  DARK_WHITE,
  ICE_BLUE,
  INDIGO,
  LIGHT_GRAY,
  MEDIUM_GRAY,
  MEDIUM_INDIGO,
  YELLOW,
} from '../../constant/colors';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';
import { DISABLED_BG_COLOR } from '../../util';

interface Props {
  width: number;
  active: boolean;
  onTogglePress: (index: number) => void;
  toggleBtnName?: string[];
  disabled?: boolean;
  activeColor?: string;
  inActiveColor?: string;
}

export default function ToggleBtn({
  width,
  active,
  onTogglePress,
  toggleBtnName,
  disabled,
  activeColor,
  inActiveColor,
}: Props) {
  const { translateX } = useToggleAnimation({
    initialValue: 0,
    toValue: width,
    active,
  });

  const toggleActive = (index: number) => (index === 0 ? active : !active);

  const iconColor = disabled ? LIGHT_GRAY : YELLOW;

  const textColor = disabled ? 'text-slate-400' : 'text-yellow-800';

  const activeBtnColor = active ? activeColor : inActiveColor;

  const borderColor = disabled
    ? 'border-slate-200'
    : `border-[${active ? activeColor : inActiveColor}]`;

  return (
    <View
      style={tw.style(
        `${InputStyle} ${borderColor} h-full flex-row items-center p-1 rounded-full self-start`,
        shadowStyle(3)
      )}
    >
      <Animated.View
        style={{
          transform: [{ translateX }],
          width,
          position: 'absolute',
          left: 4,
          height: '100%',
          borderRadius: 100,
          backgroundColor: disabled ? DARK_WHITE : activeBtnColor,
        }}
      />

      {(toggleBtnName || ['', '']).map((btnName, index) => (
        <TouchableOpacity
          key={index}
          style={tw`flex-row items-center justify-center gap-1 h-full w-[${width}px]`}
          onPress={() => onTogglePress(index)}
          disabled={disabled}
        >
          {toggleBtnName ? (
            <>
              <Icon
                type='Octicons'
                name={index === 0 ? 'star-fill' : 'star'}
                size={14}
                color={toggleActive(index) ? iconColor : LIGHT_GRAY}
              />
              <Text
                style={tw`${
                  toggleActive(index) ? textColor : 'text-slate-400'
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
