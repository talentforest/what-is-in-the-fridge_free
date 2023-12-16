import { Animated, View } from 'react-native';
import { shadowStyle } from '../../constant/shadowStyle';
import { InputStyle, Text, TouchableOpacity } from '../common/native-component';
import { useToggleAnimation } from '../../hooks';
import { ICE_BLUE, INDIGO, MEDIUM_INDIGO } from '../../constant/colors';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

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

  const iconColor = disabled ? MEDIUM_INDIGO : INDIGO;

  const textColor = disabled ? 'text-indigo-300' : 'text-indigo-600';

  const activeBtnColor = active ? activeColor : inActiveColor;

  return (
    <View
      style={tw.style(
        `${InputStyle} border-[${
          active ? activeColor : inActiveColor
        }] h-full flex-row items-center p-1 rounded-full self-start`,
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
          backgroundColor: disabled ? ICE_BLUE : activeBtnColor,
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
                type='MaterialCommunityIcons'
                name={index === 0 ? 'tag' : 'tag-outline'}
                size={14}
                color={toggleActive(index) ? iconColor : MEDIUM_INDIGO}
              />
              <Text
                style={tw`${
                  toggleActive(index) ? textColor : 'text-indigo-300'
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
