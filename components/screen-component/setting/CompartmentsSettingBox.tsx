import { Text } from '../../native-component';
import { useSelector } from '../../../redux/hook';
import { View } from 'react-native';
import { Space } from '../../../constant/fridgeInfo';
import { scaleH } from '../../../util';
import CountBtn from '../../common/buttons/CountBtn';
import tw from 'twrnc';
import useHandleCompartments from '../../../hooks/useHandleCompartments';

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
      style={tw`p-[${scaleH(14)}px] 
      gap-3 justify-center flex-1 items-center bg-white border border-slate-300 rounded-md`}
    >
      <Text>{name}</Text>
      <View style={tw`flex-row items-center justify-center gap-1`}>
        <CountBtn
          type='minus'
          onPress={onMinusPress}
          active={fridgeInfo.compartments[name] > 1}
        />
        <Text fontSize={15} style={tw`mx-1 text-indigo-600 text-center`}>
          {fridgeInfo.compartments[name]} 칸
        </Text>
        <CountBtn
          type='plus'
          onPress={onPlusPress}
          active={fridgeInfo.compartments[name] < MAX_COMPARTMENTS_NUM}
        />
      </View>
    </View>
  );
}
