import { Text, TouchableOpacity } from '../../native-component';
import { DEEP_YELLOW, ORANGE_RED } from '../../../constant/colors';
import { useDispatch, useSelector } from '../../../redux/hook';
import { View } from 'react-native';
import {
  minusCompartment,
  plusCompartment,
} from '../../../redux/slice/fridgeInfoSlice';
import { Space } from '../../../constant/fridgeInfo';
import { scaleH } from '../../../util';
import tw from 'twrnc';
import Icon from '../../native-component/Icon';

interface Props {
  name: Space;
}

export default function SquareBtn({ name }: Props) {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);
  const dispatch = useDispatch();

  return (
    <View
      style={tw`h-[${scaleH(
        20
      )}] gap-3 justify-center flex-1 items-center border border-slate-200 px-2 rounded-md bg-white`}
    >
      <Text>{name}</Text>
      <View style={tw`flex-row items-center justify-center`}>
        <TouchableOpacity
          style={tw`px-1 items-center justify-center`}
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
            color={DEEP_YELLOW}
            size={20}
          />
        </TouchableOpacity>
        <Text style={tw`mx-1 text-indigo-600 w-5 text-center`} fontSize={16}>
          {fridgeInfo.compartments[name]}
        </Text>
        <TouchableOpacity
          style={tw`px-1 items-center justify-center`}
          onPress={() => {
            if (fridgeInfo.compartments[name] <= 1) return;
            dispatch(minusCompartment(name));
          }}
        >
          <Icon
            type='MaterialCommunityIcons'
            name='minus'
            color={ORANGE_RED}
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
