import { useFindFood } from '../../hooks';
import { View } from 'react-native';
import { useRouteName } from '../../hooks/useRouteName';
import { Food, MAX_LIMIT } from '../../constant/foodInfo';

import LeftDay from '../common/LeftDay';
import AddIconBtn from '../buttons/AddIconBtn';
import IndicatorExist from '../common/IndicatorExist';
import tw from 'twrnc';
import { useDispatch, useSelector } from '../../redux/hook';
import { alertPhrase } from '../../constant/alertPhrase';
import {
  setAlertInfo,
  toggleAlertModal,
} from '../../redux/slice/alertModalSlice';

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
  const { routeShoppingList } = useRouteName();
  const { findFood, allFoods } = useFindFood();

  const dispatch = useDispatch();
  const onPress = () => {
    if (allFoods.length >= MAX_LIMIT) {
      const {
        excessTotal: { title, msg },
      } = alertPhrase;
      dispatch(toggleAlertModal(true));
      dispatch(setAlertInfo({ title, msg, btns: ['확인'] }));
      return;
    }
    addToFridgePress(food);
  };

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
            onPress={onPress}
            disabled={!!(isCheckList || findFood(food.name))}
          />
        </>
      )}

      {title === '소비기한 주의 식료품' && (
        <View style={tw`items-end w-20 mr-3`}>
          <LeftDay expiredDate={food.expiredDate} dateMark />
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
