import { useFindFood, useHandleAlert } from '../../hooks';
import { View } from 'react-native';
import { useRouteName } from '../../hooks/useRouteName';
import { Food, MAX_LIMIT } from '../../constant/foodInfo';
import { useDispatch, useSelector } from '../../redux/hook';
import { setFormFood } from '../../redux/slice/food/formFoodSlice';
import { showFormModal } from '../../redux/slice/modalVisibleSlice';

import LeftDay from '../common/LeftDay';
import AddIconBtn from '../buttons/AddIconBtn';
import IndicatorExist from '../common/IndicatorExist';
import tw from 'twrnc';

interface Props {
  title: string;
  food: Food;
}

export default function TableItemEnd({ title, food }: Props) {
  const { limit } = useSelector((state) => state.limit);
  const { checkedList } = useSelector((state) => state.checkedList);

  const { routeShoppingList } = useRouteName();

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
    if (limit && allFoods.length >= MAX_LIMIT) {
      setAlert(alertReachedLimit);
      return;
    }
    onAddToFridgePress();
  };

  return (
    <>
      {title === '장보기 식료품' && (
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
            disabled={!!(checkedList.length || findFood(food.name))}
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
