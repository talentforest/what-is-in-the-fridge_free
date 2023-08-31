import { View } from 'react-native';
import { Food } from '../../constant/foods';
import { cutLetter } from '../../util';
import { Text } from '../../components/common/native-component';
import { BLUE } from '../../constant/colors';

import LeftDay from '../../components/common/LeftDay';
import IndicatorExist from '../../components/common/IndicatorExist';
import CategoryImageIcon from '../../components/common/CategoryImageIcon';
import tw from 'twrnc';

interface Props {
  food: Food;
  expiredDate?: boolean;
  checkExistence?: boolean;
}

export default function FoodTagBox({
  food,
  expiredDate,
  checkExistence,
}: Props) {
  const color = expiredDate ? 'amber' : checkExistence ? 'indigo' : 'blue';

  return (
    <View
      key={food.id}
      style={tw`py-1.5 px-2.5 bg-white border border-${color}-500 gap-1 justify-center items-center flex-row rounded-lg`}
    >
      <Text style={tw`text-center text-${color}-900`}>
        {cutLetter(food.name, 6)}
      </Text>

      {expiredDate && <LeftDay expiredDate={food.expiredDate} />}
      {checkExistence && <IndicatorExist food={food} size='xs' />}
      {!expiredDate && !checkExistence && (
        <View style={tw`-mr-0.5`}>
          <CategoryImageIcon
            kind='icon'
            category={food.category}
            size={14}
            color={BLUE}
          />
        </View>
      )}
    </View>
  );
}
