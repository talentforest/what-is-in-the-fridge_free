import { View } from 'react-native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { useItemSlideAnimation } from '../../hooks';
import { Animated } from 'react-native';
import { BLUE, GREEN } from '../../constant/colors';
import Icon from '../../components/common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  position: string;
  onBackPress?: () => void;
  active: boolean;
}

export default function CurrentPositionBox({
  position,
  onBackPress,
  active,
}: Props) {
  const { height } = useItemSlideAnimation({
    initialValue: 0,
    toValue: 42,
    active,
  });

  return (
    <View>
      {onBackPress && (
        <View style={tw`flex-row items-center gap-1 mb-1`}>
          <Text fontSize={14} style={tw`text-blue-600`}>
            한번에 추가할 공간
          </Text>
        </View>
      )}

      <Animated.View
        style={{
          height,
          marginHorizontal: -4,
          paddingHorizontal: 4,
          overflow: 'hidden',
        }}
      >
        <View
          style={tw.style(
            `p-1 bg-white border border-slate-200 rounded-full flex-row justify-between items-center`
          )}
        >
          <View style={tw`flex-row items-center gap-0.5 py-1.5 px-2`}>
            {!onBackPress && (
              <Text fontSize={16} style={tw`text-slate-500`}>
                선택한 공간 :{' '}
              </Text>
            )}

            <Icon
              name='location'
              type='Octicons'
              size={13}
              color={position === '실온보관' ? GREEN : BLUE}
            />
            <Text
              fontSize={16}
              style={tw`text-${position === '실온보관' ? 'green' : 'blue'}-600`}
            >
              {position}
            </Text>
          </View>

          {onBackPress && (
            <TouchableOpacity
              onPress={onBackPress}
              style={tw`flex-row items-center gap-1 px-2.5 py-1.5 rounded-full bg-blue-100`}
            >
              <Icon name='sync' type='Octicons' size={12} />
              <Text fontSize={14} style={tw`text-blue-700`}>
                공간 다시 선택
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </View>
  );
}
