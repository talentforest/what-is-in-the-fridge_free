import { Text } from '../../native-component';
import { useSelector } from '../../../redux/hook';
import { View } from 'react-native';
import { Space } from '../../../constant/fridgeInfo';
import { FontGmarketSansBold } from '../../../constant/fonts';

import useHandleCompartments from '../../../hooks/useHandleCompartments';

import CountBtn from '../../common/buttons/CountBtn';
import tw from 'twrnc';

interface Props {
  name: Space;
}

export default function CompartmentsSettingBox({ name }: Props) {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);

  const { onMinusPress, onPlusPress } = useHandleCompartments({ name });

  const MAX_COMPARTMENTS_NUM =
    name === '냉동실 안쪽' || name === '냉동실 문쪽' ? 3 : 5;

  return (
    <View
      style={tw`p-3 gap-3 justify-center flex-1 items-center bg-white border border-slate-300 rounded-md`}
    >
      <Text>{name}</Text>
      <View style={tw`flex-row items-center justify-center`}>
        <CountBtn
          type='plus'
          onPress={onPlusPress}
          active={fridgeInfo.compartments[name] < MAX_COMPARTMENTS_NUM}
        />

        <View style={tw`flex-row items-center gap-1 mx-2`}>
          <Text
            style={tw.style(`text-blue-600 text-base`, FontGmarketSansBold)}
          >
            {fridgeInfo.compartments[name]}
          </Text>
          <Text>칸</Text>
        </View>
        <CountBtn
          type='minus'
          onPress={onMinusPress}
          active={fridgeInfo.compartments[name] > 1}
        />
      </View>
    </View>
  );
}
