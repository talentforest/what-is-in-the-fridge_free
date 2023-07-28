import { View } from 'react-native';
import { Text } from '../../native-component';
import { Space } from '../../../constant/fridgeInfo';
import { BLUE } from '../../../constant/colors';
import { FontGmarketSansBold } from '../../../constant/fonts';
import { scaleH } from '../../../util';
import Icon from '../../native-component/Icon';
import SpaceDetailInfo from './SpaceDetailInfo';
import SpaceName from './SpaceName';
import tw from 'twrnc';

export default function FridgeSpace({ space }: { space: Space }) {
  return (
    <View style={tw`absolute top-0 z-10 p-[${scaleH(14)}px] h-full w-full`}>
      {/* 냉장고 공간 이름 */}
      <SpaceName space={space} />

      {/* 냉장고 공간 정보 */}
      <SpaceDetailInfo space={space} />

      {/* 들어가기 버튼 */}
      <View
        style={tw`flex-row items-center self-end border border-slate-300 px-3.5 py-1.5 rounded-full bg-amber-300`}
      >
        <Text
          fontSize={12}
          style={tw.style(`text-blue-700`, FontGmarketSansBold)}
        >
          들어가기
        </Text>
        <Icon name='enter' type='Ionicons' size={16} color={BLUE} />
      </View>
    </View>
  );
}
