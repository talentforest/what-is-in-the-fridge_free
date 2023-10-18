import { View } from 'react-native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { GRAY, INDIGO } from '../../constant/colors';
import { useSlideAnimation } from '../../hooks';
import { Animated } from 'react-native';
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
  const { height } = useSlideAnimation({
    initialValue: 0,
    toValue: 46,
    active,
  });

  return (
    <View>
      {onBackPress && (
        <View style={tw`flex-row items-center gap-1`}>
          <Icon name='map-pin' type='Feather' size={13} color={INDIGO} />
          <Text style={tw`text-sm text-indigo-600`}>한번에 추가할 공간</Text>
        </View>
      )}

      <Animated.View style={{ height, overflow: 'hidden' }}>
        <View
          style={tw`border border-slate-300 bg-stone-200 rounded-lg mt-1 p-1 pl-3 flex-row justify-between items-center gap-2`}
        >
          <View style={tw`flex-row items-center`}>
            {!onBackPress && (
              <Text style={tw`text-slate-700 text-[15px]`}>선택한 공간 : </Text>
            )}
            <Text style={tw`text-slate-800 text-[15px]`}>{position}</Text>
          </View>
          {onBackPress && (
            <TouchableOpacity
              onPress={onBackPress}
              style={tw`flex-row items-center gap-1 px-3 py-1 rounded-full bg-slate-100 border border-slate-300`}
            >
              <Icon name='rotate-ccw' type='Feather' size={11} color={GRAY} />
              <Text style={tw`text-[12px] text-slate-600 py-0`}>
                공간 다시 선택
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </View>
  );
}
