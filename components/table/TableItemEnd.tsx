import { useFindFood, useHandleAlert, useRouteName } from '../../hooks';
import { View } from 'react-native';
import { Food, MAX_LIMIT } from '../../constant/foodInfo';
import { useDispatch, useSelector } from '../../redux/hook';
import { setFormFood } from '../../redux/slice/food/formFoodSlice';
import { showFormModal } from '../../redux/slice/modalVisibleSlice';
import { MEDIUM_INDIGO } from '../../constant/colors';
import { Text } from '../common/native-component';
import { Space } from '../../constant/fridgeInfo';

import LeftDay from '../common/LeftDay';
import AddIconBtn from '../buttons/AddIconBtn';
import RoundedNavigateBtn from '../buttons/RoundedNavigateBtn';
import IndicatorExist from '../common/IndicatorExist';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

export type TableTitle =
  | '전체 식료품'
  | '자주 먹는 식료품'
  | '장볼 식료품'
  | '식료품';

interface Props {
  title: TableTitle;
  food: Food;
}

export default function TableItemEnd({ title, food }: Props) {
  const { purchased } = useSelector((state) => state.purchaseState);
  const { checkedList } = useSelector((state) => state.checkedList);

  const { routeHome } = useRouteName();

  const { findFood, allFoods, isFavoriteItem, isShoppingListItem } =
    useFindFood();

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

  const positionTagColor = (position: Space) => {
    const tagColor = position.includes('냉동실')
      ? 'cyan'
      : position.includes('냉장실')
      ? 'blue'
      : 'emerald';

    return tagColor;
  };

  return (
    <>
      {title === '장볼 식료품' ? (
        <>
          {routeHome && findFood(food.name) && (
            <RoundedNavigateBtn
              btnName='있음'
              color='emerald'
              space={food.space}
              foodName={food.name}
            />
          )}
          <AddIconBtn
            onPress={onPress}
            disabled={!!(checkedList.length || findFood(food.name))}
          />
        </>
      ) : title === '자주 먹는 식료품' ? (
        <View style={tw`ml-2 mr-3 flex-row gap-5`}>
          {isShoppingListItem(food.name) && (
            <Icon
              name={'basket-outline'}
              type='MaterialCommunityIcons'
              size={15}
              color={MEDIUM_INDIGO}
            />
          )}

          <IndicatorExist isExist={!!findFood(food.name)} />
        </View>
      ) : (
        <>
          <View style={tw`flex-row items-center justify-between gap-2 mr-2.5`}>
            {title === '식료품' && food.compartmentNum ? (
              <View
                style={tw`w-10.5 items-center justify-center rounded-full py-1.5 bg-blue-50`}
              >
                <Text style={tw`text-blue-400`} fontSize={14}>
                  {food.compartmentNum}칸
                </Text>
              </View>
            ) : title === '전체 식료품' ? (
              <View style={tw`w-18.5 items-start`}>
                <RoundedNavigateBtn
                  btnName={food.space}
                  space={food.space}
                  color={positionTagColor(food.space)}
                  foodName={food.name}
                />
              </View>
            ) : (
              <></>
            )}

            <View style={tw`items-end w-14`}>
              <LeftDay expiredDate={food.expiredDate} dateMark />
            </View>
          </View>
        </>
      )}
    </>
  );
}
