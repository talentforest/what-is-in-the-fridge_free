import { useRoute } from '@react-navigation/native';
import { useFindFood } from '../../hooks';
import { View } from 'react-native';
import { Food } from '../../constant/foodInfo';

import LeftDay from '../common/LeftDay';
import AddIconBtn from '../buttons/AddIconBtn';
import IndicatorExist from '../common/IndicatorExist';
import tw from 'twrnc';

interface Props {
  title: string;
  food: Food;
  addToFridgePress: (food: Food) => void;
  isCheckList: boolean;
}

export default function TableItemEnd({
  title,
  food,
  addToFridgePress,
  isCheckList,
}: Props) {
  const route = useRoute();
  const routeShoppingList = route.name === 'ShoppingList';

  const { findFood } = useFindFood();

  return (
    <>
      {title === '장보기 식료품' && addToFridgePress && (
        <>
          {routeShoppingList && findFood(food.name) && (
            <IndicatorExist
              name={food.name}
              roundedBorder
              space={food.space}
              navigate
            />
          )}
          <AddIconBtn
            onPress={() => addToFridgePress(food)}
            disabled={isCheckList}
          />
        </>
      )}

      {title === '소비기한 주의 식료품' && (
        <View style={tw`items-end w-20 mr-3`}>
          <LeftDay expiredDate={food.expiredDate} size={14} dateMark />
        </View>
      )}

      {title === '자주 먹는 식료품' && (
        <View style={tw`ml-2 mr-3`}>
          <IndicatorExist name={food.name} space={food.space} />
        </View>
      )}
    </>
  );
}
