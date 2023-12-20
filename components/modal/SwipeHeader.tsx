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
        <View style={tw`rounded-t-3xl border-b-2 border-stone-300 px-4`}>
          {/* 터치바 */}
          <View
            style={tw`mt-3 mb-4 bg-slate-500 w-15 self-center h-1.5 rounded-2xl`}
          />

          <View style={tw`flex-row justify-between items-center`}>
            {title && <Text fontSize={fontSize}>{title}</Text>}
          </View>
          <View style={tw`-mx-4 px-4 mb-3`} />
        </View>
      ) : (
        // 페이드인 헤더
        <View style={tw`pb-3 pt-1 flex-row justify-between items-center`}>
          <Text fontSize={fontSize}>{title}</Text>
          <TouchableOpacity style={tw`px-3 -mr-3`} onPress={closeModal}>
            <Icon type='Octicons' name='x' size={22} color={GRAY} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
