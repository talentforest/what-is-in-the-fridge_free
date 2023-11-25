import { View } from 'react-native';
import { Text } from '../../components/common/native-component';
import { MAX_LIMIT } from '../../constant/foodInfo';
import { useFindFood } from '../../hooks';
import { BG_COLOR } from '../../components/common/Container';
import tw from 'twrnc';

export default function FoodLimit() {
  const { allFoods } = useFindFood();

  const limitGauge = Math.round((allFoods.length / MAX_LIMIT) * 100);

  const limitGaugeColor =
    limitGauge > 80 ? 'red' : limitGauge > 50 ? 'amber' : 'green';

  return (
    <View
      style={tw`mt-3 mx-2 flex-row items-center justify-between ${BG_COLOR} border border-${limitGaugeColor}-500 p-1 h-7 rounded-full`}
    >
      <View
        style={tw`absolute w-full rounded-full bg-${limitGaugeColor}-300 h-full left-1`}
      />

      <View
        style={tw`w-[${100 - limitGauge}%] absolute right-1 ${BG_COLOR} h-full
        ${limitGauge === 0 ? 'rounded-lg' : 'rounded-r-lg'}`}
      />
      <View style={tw`flex-row items-center justify-between w-full px-3`}>
        <Text fontSize={15} style={tw`text-slate-700 leading-4`}>
          식료품 저장 한도
        </Text>
        <View style={tw`flex-row items-center gap-1`}>
          <Text fontSize={16} style={tw`text-${limitGaugeColor}-700 leading-4`}>
            {allFoods.length}
          </Text>

          <Text fontSize={16} style={tw`text-slate-700 leading-4`}>
            / {MAX_LIMIT}
          </Text>
        </View>
      </View>
    </View>
  );
}
