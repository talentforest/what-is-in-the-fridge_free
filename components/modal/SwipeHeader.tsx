import { View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { GRAY } from '../../constant/colors';

import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  title?: string;
  closeModal: () => void;
  animationIn?: 'fadeIn' | 'slideInUp';
}

const fontSize = 20;

export default function SwipeHeader({ title, closeModal, animationIn }: Props) {
  return (
    <View>
      {/* 스와이퍼 기능이 있는 슬라이드용 헤더 */}
      {animationIn === 'slideInUp' ? (
        <View style={tw`pt-2 pb-1 rounded-t-3xl border border-stone-100`}>
          {/* 터치바 */}
          <View
            style={tw`mb-3 bg-slate-500 w-15 self-center h-1.5 rounded-2xl`}
          />

          <View style={tw`flex-row justify-between items-center`}>
            {title && <Text fontSize={fontSize}>{title}</Text>}
          </View>
        </View>
      ) : (
        // 페이드인 헤더
        <View style={tw`pb-2 flex-row justify-between items-center`}>
          <Text fontSize={fontSize}>{title}</Text>
          <TouchableOpacity style={tw`px-3 -mr-3`} onPress={closeModal}>
            <Icon type='Octicons' name='x' size={22} color={GRAY} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
