import { View } from 'react-native';
import { Text } from '../common/native-component';
import { GRAY } from '../../constant/colors';
import { FontGmarketSansBold } from '../../constant/fonts';

import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

export default function SeeMoreBtn() {
  return (
    <View style={tw`flex-row items-center self-end -mr-1 -mb-1`}>
      <Text
        style={tw.style(
          `text-slate-500 text-[13px] pb-0.5`,
          FontGmarketSansBold
        )}
      >
        더보기
      </Text>
      <Icon
        name='chevron-right'
        type='MaterialCommunityIcons'
        color={GRAY}
        size={20}
      />
    </View>
  );
}
