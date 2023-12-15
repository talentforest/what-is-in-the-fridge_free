import { useFindFood, useHandleAlert } from '../../hooks';
import { View } from 'react-native';
import { useRouteName } from '../../hooks/useRouteName';
import { Food, MAX_LIMIT } from '../../constant/foodInfo';
import { useDispatch, useSelector } from '../../redux/hook';
import { setFormFood } from '../../redux/slice/food/formFoodSlice';
import { showFormModal } from '../../redux/slice/modalVisibleSlice';
import { Text } from '../common/native-component';

import LeftDay from '../common/LeftDay';
import AddIconBtn from '../buttons/AddIconBtn';
import IndicatorExist from '../common/IndicatorExist';
import tw from 'twrnc';

export type TableTitle =
  | '전체 식료품'
  | '자주 먹는 식료품'
  | '장 볼 식료품'
  | '식료품';

interface Props {
  title: TableTitle;
  food: Food;
}

export default function TableItemEnd({ title, food }: Props) {
  const { purchased } = useSelector((state) => state.purchaseState);
  const { checkedList } = useSelector((state) => state.checkedList);

  const { routeHome } = useRouteName();

  const { findFood, allFoods, isFavoriteItem } = useFindFood();

  const { alertReachedLimit, setAlert } = useHandleAlert();

  const dispatch = useDispatch();

  const onAddToFridgePress = () => {
    const favoriteItem = isFavoriteItem(food.name);
    const formFood = favoriteItem?.id ? favoriteItem : food;
    dispatch(setFormFood(formFood));
    dispatch(showFormModal(true));
  };

  const onPress = () => {
    if (!purchased && allFoods.length >= MAX_LIMIT) {
      setAlert(alertReachedLimit);
      return;
    }
    onAddToFridgePress();
  };

  return (
    <>
      {title === '장 볼 식료품' ? (
        <>
          {routeHome && findFood(food.name) && (
            <IndicatorExist
              name={food.name}
              roundedBorder
              space={food.space}
              navigate
            />
          )}
          <AddIconBtn
            onPress={onPress}
            disabled={!!(checkedList.length || findFood(food.name))}
          />
        </>
      ) : (
        <>
          <View style={tw`flex-row items-center justify-between gap-2 mr-2.5`}>
            {title === '식료품' && (
              <View style={tw`items-end w-16`}>
                <LeftDay expiredDate={food.expiredDate} dateMark />
              </View>
            )}

            {title === '전체 식료품' && (
              <View style={tw`gap-2 flex-row items-center`}>
                <Text fontSize={14} style={tw`text-slate-600 w-15 leading-4`}>
                  {food.space}
                </Text>

                <View style={tw`items-end w-16`}>
                  <LeftDay expiredDate={food.expiredDate} />
                </View>
              </View>
            )}
          </View>

          {title === '자주 먹는 식료품' && (
            <View style={tw`ml-2 mr-3`}>
              <IndicatorExist name={food.name} space={food.space} />
            </View>
          )}
        </>
      )}
    </>
  );
}
