import { Text, TouchableOpacity } from '../../native-component';
import { INDIGO } from '../../../constant/colors';
import { useDispatch, useSelector } from '../../../redux/hook';
import { View } from 'react-native';
import {
  minusCompartment,
  plusCompartment,
} from '../../../redux/slice/fridgeInfoSlice';
import { Space } from '../../../constant/fridgeInfo';
import tw from 'twrnc';
import Icon from '../../native-component/Icon';
import { scaleH } from '../../../util';

interface Props {
  name: Space;
}

export default function SquareBtn({ name }: Props) {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);
  const dispatch = useDispatch();

  return (
    <View
      style={tw`gap-1 flex-row justify-between items-center border border-slate-300 px-3 rounded-md bg-white h-[${scaleH(
        11
      )}]`}
    >
      <Text style={tw`flex-1`}>{name}</Text>
      <TouchableOpacity
        onPress={() => {
          const maxNum =
            name === '냉동실 안쪽' || name === '냉동실 문쪽' ? 4 : 5;

          if (fridgeInfo.compartments[name] >= maxNum) return;
          dispatch(plusCompartment(name));
        }}
      >
        <Icon
          type='MaterialCommunityIcons'
          name='plus'
          color={INDIGO}
          size={18}
        />
      </TouchableOpacity>
      <Text style={tw`mx-2 text-amber-600`}>
        {fridgeInfo.compartments[name]}
      </Text>
      <TouchableOpacity
        onPress={() => {
          if (fridgeInfo.compartments[name] <= 1) return;
          dispatch(minusCompartment(name));
        }}
      >
        <Icon
          type='MaterialCommunityIcons'
          name='minus'
          color={INDIGO}
          size={18}
        />
      </TouchableOpacity>
    </View>
  );
}
