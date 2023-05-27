import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/Navigation';

export default function useRouteName() {
  const navigation = useNavigation();
  const routes = navigation.getState().routes;
  const currRoute = routes[routes.length - 1].name as keyof RootStackParamList;

  return {
    currRoute,
  };
}
