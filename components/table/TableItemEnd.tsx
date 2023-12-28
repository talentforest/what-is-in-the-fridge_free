import { useFindFood, useHandleAlert } from '../../hooks';
import { View } from 'react-native';
import { useRouteName } from '../../hooks/useRouteName';
import { Food, MAX_LIMIT } from '../../constant/foodInfo';
import { useDispatch, useSelector } from '../../redux/hook';
import { setFormFood } from '../../redux/slice/food/formFoodSlice';
import { showFormModal } from '../../redux/slice/modalVisibleSlice';
import { Text, TouchableOpacity } from '../common/native-component';
import { Space } from '../../constant/fridgeInfo';
import { shadowStyle } from '../../constant/shadowStyle';

import LeftDay from '../common/LeftDay';
import AddIconBtn from '../buttons/AddIconBtn';
import IndicatorExist from '../common/IndicatorExist';
import tw from 'twrnc';
import Icon from '../common/native-component/Icon';
import { BLUE, GREEN, MEDIUM_GRAY } from '../../constant/colors';
import { search } from '../../redux/slice/food/searchedFoodSlice';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';

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

  const positionTagColor = (position: Space) => {
    const tagColor = position.includes('냉동실')
      ? 'cyan'
      : position.includes('냉장실')
      ? 'blue'
      : 'green';

    return tagColor;
  };

  const navigation = useNavigation<NavigateProp>();

  const onNavigatePress = (space: Space) => {
    dispatch(search(food.name));
    return space === '실온보관'
      ? navigation.navigate('PantryFoods')
      : navigation.navigate('Compartments', { space });
  };

  return (
    <>
      {title === '장볼 식료품' ? (
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
              <View style={tw`gap-1 flex-row items-center`}>
                <View style={tw`w-17`}>
                  <TouchableOpacity
                    onPress={() => onNavigatePress(food.space)}
                    style={tw.style(
                      `flex-row items-center border border-${positionTagColor(
                        food.space
                      )}-100 
                      bg-${positionTagColor(food.space)}-100 
                      self-start rounded-full py-0.8 pl-1.5 pr-1`,
                      shadowStyle(3)
                    )}
                  >
                    <Text
                      fontSize={13}
                      style={tw.style(
                        `text-${positionTagColor(food.space)}-600 leading-4`,
                        { letterSpacing: -0.5 }
                      )}
                    >
                      {food.space}
                    </Text>
                    <Icon
                      type='MaterialCommunityIcons'
                      name='arrow-up-right'
                      size={11}
                      color={
                        positionTagColor(food.space) === 'green' ? GREEN : BLUE
                      }
                    />
                  </TouchableOpacity>
                </View>

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
