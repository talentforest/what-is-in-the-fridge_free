import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useDispatch, useSelector } from '../../redux/hook';
import { setAfterAnimation } from '../../redux/slice/afterAnimationSlice';
import { setFavoriteList } from '../../redux/slice/food-list/favoriteFoodsSlice';
import { useRouteName } from '../useRouteName';
import { setShoppingList } from '../../redux/slice/food-list/shoppingListSlice';
import { setCheckedList } from '../../redux/slice/food-list/checkListSlice';
import { Food } from '../../constant/foodInfo';
import { setAllPantryFoods } from '../../redux/slice/food-list/pantryFoodsSlice';
import { setAllFridgeFoods } from '../../redux/slice/food-list/fridgeFoodsSlice';

interface Props {
  initialValue: number;
  toValue: number;
  active: boolean;
}

export const useItemSlideAnimation = ({
  initialValue,
  toValue,
  active,
}: Props) => {
  const { afterAnimation } = useSelector((state) => state.afterAnimation);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const { shoppingList } = useSelector((state) => state.shoppingList);
  const { checkedList } = useSelector((state) => state.checkedList);
  const { fridgeFoods } = useSelector((state) => state.fridgeFoods);
  const { pantryFoods } = useSelector((state) => state.pantryFoods);

  const { routeFavoriteFoods, routeAllFoods } = useRouteName();

  const table = routeFavoriteFoods
    ? {
        items: favoriteFoods,
        fn: setFavoriteList,
      }
    : {
        items: shoppingList,
        fn: setShoppingList,
      };

  const dispatch = useDispatch();

  const deleteItem = () => {
    const filteredList = table.items.filter((food) => {
      return !checkedList.find((checkedFood) => checkedFood.name === food.name);
    });
    dispatch(table.fn(filteredList));
  };

  const deleteExpiredFoodItem = () => {
    const findFridgeFoodInCheckList = (fridgeFood: Food) => {
      return checkedList
        .filter((checkedFood) => checkedFood.space !== '실온보관')
        .find((checkedfood) => checkedfood.name === fridgeFood.name);
    };
    const findPantryFoodInCheckList = (pantryFood: Food) => {
      return checkedList
        .filter((checkedFood) => checkedFood.space === '실온보관')
        .find((checkedfood) => checkedfood.name === pantryFood.name);
    };
    const filteredFridge = fridgeFoods.filter(
      (fridgeFood) => !findFridgeFoodInCheckList(fridgeFood)
    );
    const filteredPantry = pantryFoods.filter(
      (pantryFood) => !findPantryFoodInCheckList(pantryFood)
    );

    dispatch(setAllPantryFoods(filteredPantry));
    dispatch(setAllFridgeFoods(filteredFridge));
  };

  const height = useRef(new Animated.Value(initialValue)).current;

  const animatedSlide = (toValue: number) => {
    Animated.timing(height, {
      toValue,
      useNativeDriver: false,
      duration: 300,
    }).start(() => {
      if (afterAnimation === 'slideup-out') {
        routeAllFoods ? deleteExpiredFoodItem() : deleteItem();
        dispatch(setCheckedList([]));
        dispatch(setAfterAnimation('none'));
      }
    });
  };

  useEffect(() => {
    if (active) {
      animatedSlide(toValue);
    } else {
      animatedSlide(initialValue);
    }
  }, [active, initialValue, toValue]);

  const interpolatedOpacity = height.interpolate({
    inputRange: [0, initialValue],
    outputRange: [0, 1],
  });

  return {
    height,
    animatedSlide,
    interpolatedOpacity,
  };
};
