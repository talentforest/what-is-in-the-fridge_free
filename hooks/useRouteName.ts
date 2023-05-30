import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/Navigation';
import { RootTabParamList } from '../navigation/MyTabs';

type NavigationName = keyof RootTabParamList | keyof RootStackParamList;

export default function useRouteName() {
  const navigation = useNavigation();
  const routes = navigation.getState().routes;
  const currRoute = routes[routes.length - 1].name as NavigationName;

  return {
    currRoute,
  };
}
