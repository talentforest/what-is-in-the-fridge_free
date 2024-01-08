import { View } from 'react-native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';
import { shadowStyle } from '../../constant/shadowStyle';
import { LIGHT_BLUE, LIGHT_GRAY } from '../../constant/colors';

import IconChevronRight from '../../components/svg/arrow/IconChevronRight';
import Icon from '../../components/common/native-component/Icon';
import tw from 'twrnc';

export default function EntranceAllFoodsBtn() {
  const navigation = useNavigation<NavigateProp>();

  const onNavigatePress = () => navigation.navigate('AllFoods');

  return (
    <TouchableOpacity
      onPress={onNavigatePress}
      style={tw.style(
        `px-2.5 py-2 -mb-2 self-end border border-gray-200 flex-row gap-1 items-center justify-between rounded-full bg-white`,
        shadowStyle(3)
      )}
    >
      <View style={tw`flex-row gap-1 items-center pr-0.5`}>
        <View style={tw`pb-0.2`}>
          <Icon name='pin' type='Octicons' size={13} color={LIGHT_BLUE} />
        </View>
        <Text fontSize={15} style={tw`text-slate-700`}>
          전체 식료품 보기
        </Text>
      </View>

      {/* 이름 */}
      <View style={tw`-mr-1 mb-0.2`}>
        <IconChevronRight size={14} color={LIGHT_GRAY} />
      </View>
    </TouchableOpacity>
  );
}
