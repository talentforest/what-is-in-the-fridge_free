import { View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import { getLeftDays } from '../../util';
import { DEEP_INDIGO } from '../../constant/colors';
import { Food } from '../../constant/foods';
import Icon from 'react-native-vector-icons/Feather';
import tw from 'twrnc';
import LeftDay from './LeftDay';

interface Props {
  food: Food;
  checkList: Food[];
  setCheckList: (list: Food[]) => void;
}

export default function ExpiredFoodItem({
  food,
  checkList,
  setCheckList,
}: Props) {
  const onCheckPress = (food: Food) => {
    if (existInList(food.id)) {
      return setCheckList(checkList.filter((item) => item.id !== food.id));
    }
    setCheckList([...checkList, food]);
  };

  const existInList = (id: string) => {
    return checkList.find((food) => food.id === id);
  };

  return (
    <View
      style={tw`p-3 border flex-row gap-2 items-center justify-between bg-white border-slate-300`}
    >
      <TouchableOpacity onPress={() => onCheckPress(food)}>
        <Icon
          name={!existInList(food.id) ? 'square' : 'check-square'}
          size={18}
          color={DEEP_INDIGO}
        />
      </TouchableOpacity>
      <View style={tw`flex-1 flex-row items-center gap-1`}>
        <Text>{food.image}</Text>
        <Text>{food.name}</Text>
      </View>
      <View style={tw`w-22 items-end`}>
        <LeftDay expiredDate={food.expirationDate} />
      </View>
    </View>
  );
}
