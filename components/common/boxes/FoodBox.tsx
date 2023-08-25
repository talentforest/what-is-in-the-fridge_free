import { View } from 'react-native';
import { Food } from '../../../constant/foods';
import { cutLetter, scaleH } from '../../../util';
import { Text } from '../../native-component';
import LeftDay from '../LeftDay';
import IndicatorExist from '../IndicatorExist';
import tw from 'twrnc';

interface Props {
  food: Food;
  expiredDate?: boolean;
  checkExistence?: boolean;
}

export default function FoodBox({ food, expiredDate, checkExistence }: Props) {
  const color = expiredDate ? 'amber' : checkExistence ? 'indigo' : 'blue';

  return (
    <View
      key={food.id}
      style={tw`bg-white border-2 border-${color}-300 gap-1 justify-center items-center flex-row 
      px-[${scaleH(13)}px] py-[${scaleH(3)}px] rounded-full`}
    >
      <Text style={tw`text-center text-${color}-700 py-1`}>
        {cutLetter(food.name, 6)}
      </Text>
      {expiredDate && <LeftDay expiredDate={food.expiredDate} />}
      {checkExistence && <IndicatorExist food={food} size='sm' />}
    </View>
  );
}
