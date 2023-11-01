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

export default function SwipeHeader({ title, closeModal, animationIn }: Props) {
  return (
    <View>
      {animationIn === 'slideInUp' ? (
        <View
          style={tw.style(
            `bg-stone-100 rounded-t-3xl border border-t-stone-100 border-l-stone-100 border-r-stone-100 border-b-stone-300 px-6 pt-2 pb-1`
          )}
        >
          {/* 터치바 */}
          <View
            style={tw`mb-3 bg-slate-500 w-15 self-center h-1.5 rounded-2xl`}
          />

          <View style={tw`flex-row justify-between items-center`}>
            {title && <Text style={tw`text-xl`}>{title}</Text>}
          </View>
        </View>
      ) : (
        <View
          style={tw`border bg-stone-100 rounded-t-3xl border-stone-300 pt-4 pb-2 px-5 flex-row justify-between items-center`}
        >
          <Text style={tw`text-xl`}>{title}</Text>
          <TouchableOpacity style={tw`px-3 -mr-3`} onPress={closeModal}>
            <Icon type='Feather' name='x' size={22} color={GRAY} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
