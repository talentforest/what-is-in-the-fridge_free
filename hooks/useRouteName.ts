import { useRoute } from '@react-navigation/native';

export const useRouteName = () => {
  const route = useRoute();

  const routeHome = route.name === 'Home';
  const routeAllFoods = route.name === 'AllFoods';
  const routeFavoriteFoods = route.name === 'FavoriteFoods';
  const routeCompartments = route.name === 'Compartments';
  const routePantryFoods = route.name === 'PantryFoods';
  const routeFridgeSetting = route.name === 'FridgeSetting';

  return {
    routeHome,
    routeAllFoods,
    routeFavoriteFoods,
    routeCompartments,
    routePantryFoods,
    routeFridgeSetting,
  };
};
