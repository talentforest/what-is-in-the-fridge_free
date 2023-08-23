import { Animated, PanResponder, View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { GRAY } from '../../../constant/colors';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';
import { useRef } from 'react';

interface Props {
  title?: string;
  closeModal: () => void;
}

const DRAG_DISTANCE = 20;

export default function SwipeHeader({ title, closeModal }: Props) {
  // 모달 전체를 아래로 스와이프 하는 경우 이외
  // 모달 헤더에서만 아래로 스와이프 하는 경우 종료되게

  // 아 근데 지금 문제가 모달 전체가 아래로 내려가는 듯한 애니메이션이 되어야 하는데
  // 헤더에서 내리는 동작 잠깐 했다고 바로 꺼지는게 좀 어색하네.
  const headerRef = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: (_, { dy }) => {},
      onPanResponderRelease: (_, { dy }) => {
        if (0 < dy && dy > DRAG_DISTANCE) return closeModal();
      },
    })
  ).current;

  return (
    <View
      style={tw`bg-white rounded-t-2xl border-b-2 border-slate-900 px-6 py-3`}
      {...panResponder.panHandlers}
    >
      <View style={tw`mb-5 bg-slate-400 w-12 self-center h-2 rounded-2xl`} />
      <View style={tw`flex-row justify-between items-center pt-2`}>
        {title && <Text fontSize={18}>{title}</Text>}
        <TouchableOpacity onPress={closeModal}>
          <Icon type='Ionicons' name='close' size={22} color={GRAY} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
