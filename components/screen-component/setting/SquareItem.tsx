import { Text, TouchableOpacity } from '../../native-component';
import { INDIGO } from '../../../constant/colors';
import { useDispatch, useSelector } from '../../../redux/hook';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';
import {
  minusCompartment,
  plusCompartment,
} from '../../../redux/slice/fridgeInfoSlice';
import { Space } from '../../../constant/fridgeInfo';

interface Props {
  name: Space;
}

export default function SquareBtn({ name }: Props) {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);
  const dispatch = useDispatch();

  return (
    <View
      style={tw`flex-1 gap-1s flex-row justify-between items-center border border-slate-300 p-3 rounded-md bg-white`}
    >
      <Text styletw='text-sm flex-1'>{name}</Text>
      <TouchableOpacity
        onPress={() => {
          const maxNum =
            name === '냉동실 안쪽' || name === '냉동실 문쪽' ? 4 : 5;

          if (fridgeInfo.compartments[name] >= maxNum) return;
          dispatch(plusCompartment(name));
        }}
      >
        <Icon name='plus' color={INDIGO} size={18} />
      </TouchableOpacity>
      <Text styletw='mx-2 text-amber-600'>{fridgeInfo.compartments[name]}</Text>
      <TouchableOpacity
        onPress={() => {
          if (fridgeInfo.compartments[name] <= 1) return;
          dispatch(minusCompartment(name));
        }}
      >
        <Icon name='minus' color={INDIGO} size={18} />
      </TouchableOpacity>
    </View>
  );
}
