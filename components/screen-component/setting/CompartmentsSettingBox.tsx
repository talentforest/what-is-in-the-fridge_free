import { Text } from '../../native-component';
import { useDispatch, useSelector } from '../../../redux/hook';
import { View } from 'react-native';
import {
  minusCompartment,
  plusCompartment,
} from '../../../redux/slice/fridgeInfoSlice';
import { Space } from '../../../constant/fridgeInfo';
import { scaleH } from '../../../util';
import tw from 'twrnc';
import CountBtn from '../../common/Buttons/CountBtn';

interface Props {
  name: Space;
}

export default function CompartmentsSettingBox({ name }: Props) {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);
  const dispatch = useDispatch();

  const onMinusPress = () => {
    if (fridgeInfo.compartments[name] <= 1) return;
    dispatch(minusCompartment(name));
  };

  const onPlusPress = () => {
    const maxNum = name === '냉동실 안쪽' || name === '냉동실 문쪽' ? 3 : 5;
    if (fridgeInfo.compartments[name] >= maxNum) return;
    dispatch(plusCompartment(name));
  };

  return (
    <View
      style={tw`p-[${scaleH(
        14
      )}px] gap-3 justify-center flex-1 items-center bg-white border border-slate-300 rounded-md`}
    >
      <Text>{name}</Text>
      <View style={tw`flex-row items-center justify-center`}>
        <CountBtn type='minus' onPress={onMinusPress} />
        <Text style={tw`mx-1 text-indigo-600 w-8 text-center`}>
          {fridgeInfo.compartments[name]} 칸
        </Text>
        <CountBtn type='plus' onPress={onPlusPress} />
      </View>
    </View>
  );
}
