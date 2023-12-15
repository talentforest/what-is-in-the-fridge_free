import { View } from 'react-native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';
import { shadowStyle } from '../../constant/shadowStyle';
import { INDIGO } from '../../constant/colors';

import IconChevronRight from '../../components/svg/arrow/IconChevronRight';
import Icon from '../../components/common/native-component/Icon';
import tw from 'twrnc';

export default function NavigationBtnBox() {
  const navigation = useNavigation<NavigateProp>();

  const onNavigatePress = () => navigation.navigate('ExpiredFoods');

  return (
    <TouchableOpacity
      onPress={onNavigatePress}
      style={tw.style(
        `self-end px-3 py-2 -mb-3 border-2 border-indigo-300 bg-indigo-50 flex-row gap-1 items-center justify-between rounded-full`,
        shadowStyle(4)
      )}
    >
      {/* 이미지 */}
      <View style={tw`flex-row gap-1 items-center pr-2`}>
        <Icon name='archive' type='Octicons' size={14} color={INDIGO} />
        <Text
          fontSize={16}
          style={tw.style(`text-slate-800`, { letterSpacing: -0.5 })}
        >
          전체 식료품 보기
        </Text>
      </View>

      {/* 이름 */}
      <View style={tw`-mr-1`}>
        <IconChevronRight size={15} color={'#333'} />
      </View>
    </TouchableOpacity>
  );
}
