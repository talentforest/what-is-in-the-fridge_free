import { View } from 'react-native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';
import { shadowStyle } from '../../constant/shadowStyle';
import { GRAY, LIGHT_BLUE, MEDIUM_GRAY } from '../../constant/colors';

import IconChevronRight from '../../components/svg/arrow/IconChevronRight';
import Icon from '../../components/common/native-component/Icon';
import tw from 'twrnc';

export default function NavigationBtnBox() {
  const navigation = useNavigation<NavigateProp>();

  const onNavigatePress = () => navigation.navigate('AllFoods');

  return (
    <TouchableOpacity
      onPress={onNavigatePress}
      style={tw.style(
        `px-3 py-2 -mb-3 self-end border-2 border-blue-100 flex-row gap-1 items-center justify-between rounded-full bg-white`,
        shadowStyle(6)
      )}
    >
      <View style={tw`flex-row gap-1 items-center pr-1`}>
        <View style={tw`pb-0.2`}>
          <Icon name='pin' type='Octicons' size={13} color={LIGHT_BLUE} />
        </View>
        <Text fontSize={15} style={tw`text-slate-800`}>
          전체 식료품 보기
        </Text>
      </View>

      {/* 이름 */}
      <View style={tw`-mr-1`}>
        <IconChevronRight size={14} color={MEDIUM_GRAY} />
      </View>
    </TouchableOpacity>
  );
}
