import { useRoute } from '@react-navigation/native';

export const useRouteName = () => {
  const route = useRoute();

  const routeHome = route.name === 'Home';
  const routeShoppingList = route.name === 'ShoppingList';
  const routeExpiredFoods = route.name === 'ExpiredFoods';
  const routeFavoriteFoods = route.name === 'FavoriteFoods';
  const routeCompartments = route.name === 'Compartments';
  const routePantryFoods = route.name === 'PantryFoods';
  const routeFridgeSetting = route.name === 'FridgeSetting';

  return {
    routeHome,
    routeShoppingList,
    routeExpiredFoods,
    routeFavoriteFoods,
    routeCompartments,
    routePantryFoods,
    routeFridgeSetting,
  };
};
