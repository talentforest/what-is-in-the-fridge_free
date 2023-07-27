import { Text } from '../../native-component';
import { useDispatch, useSelector } from '../../../redux/hook';
import { Alert, View } from 'react-native';
import {
  minusCompartment,
  plusCompartment,
} from '../../../redux/slice/fridgeInfoSlice';
import { Space } from '../../../constant/fridgeInfo';
import { scaleH } from '../../../util';
import CountBtn from '../../common/buttons/CountBtn';
import useGetFoodList from '../../../hooks/useGetFoodList';
import tw from 'twrnc';

interface Props {
  name: Space;
}

export default function CompartmentsSettingBox({ name }: Props) {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);
  const { getFoodList } = useGetFoodList();
  const dispatch = useDispatch();

  const MAX_COMPARTMENTS_NUM =
    name === '냉동실 안쪽' || name === '냉동실 문쪽' ? 3 : 5;

  const onMinusPress = () => {
    if (fridgeInfo.compartments[name] <= 1) return;
    const existLastCompartmentFood = !!getFoodList(name).filter(
      (food) =>
        +food.compartmentNum.slice(0, 1) === fridgeInfo.compartments[name]
    ).length;
    if (existLastCompartmentFood)
      return Alert.alert(
        '식료품 존재 안내',
        `${fridgeInfo.compartments[name]}번 칸에 식료품이 있어 삭제할 수 없습니다.`
      );
    dispatch(minusCompartment(name));
  };

  const onPlusPress = () => {
    if (fridgeInfo.compartments[name] >= MAX_COMPARTMENTS_NUM) return;
    dispatch(plusCompartment(name));
  };

  return (
    <View
      style={tw`p-[${scaleH(
        14
      )}px] gap-3 justify-center flex-1 items-center bg-white border border-slate-300 rounded-md`}
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
