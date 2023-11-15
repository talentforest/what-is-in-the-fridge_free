import { useSelector } from '../redux/hook';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { NavigationProp } from '@react-navigation/native';
import { DEEP_GRAY, HEADER_BGCOLOR } from '../constant/colors';

import Compartments from '../screens/Compartments';
import FavoriteFoods from '../screens/FavoriteFoods';
import ExpiredFoods from '../screens/ExpiredFoods';
import FridgeSetting from '../screens/FridgeSetting';
import OnBoarding from '../screens/OnBoarding';
import ShoppingList from '../screens/ShoppingList';
import NavigationHeaderTitle from '../components/common/NavigationHeaderTitle';
import Home from '../screens/Home';
import PantryFoods from '../screens/PantryFoods';
import Setting from '../screens/Setting';
import FontSetting from '../screens/FontSetting';
import HeaderBackBtn from '../components/buttons/HeaderBackBtn';

export type RootStackParamList = {
  Home: undefined;
  OnBoarding: undefined;
  Compartments: undefined | object;
  FavoriteFoods: undefined;
  ExpiredFoods: undefined;
  ShoppingList: undefined;
  PantryFoods: undefined;
  Setting: undefined;
  FridgeSetting: undefined;
  FontSetting: undefined;
};

export type RouteName = keyof RootStackParamList;
export type RootNavParamList = RootStackParamList;
export type NavigateProp = NavigationProp<RootNavParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const options: NativeStackNavigationOptions = {
  headerShown: true,
  headerTintColor: DEEP_GRAY,
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: HEADER_BGCOLOR,
  },
  headerTitleAlign: 'center',
  headerLeft: () => <HeaderBackBtn />,
  headerBackVisible: false, // android
  animation: 'slide_from_right',
};

const Navigation = () => {
  const { onboarding } = useSelector((state) => state.onboarding);

  return (
    <Stack.Navigator>
      {onboarding && (
        <Stack.Screen
          options={{ headerShown: false }}
          name='OnBoarding'
          component={OnBoarding}
        />
      )}

      <Stack.Screen
        name='Home'
        component={Home}
        options={{ ...options, headerShown: false }}
      />

      <Stack.Screen
        name='Compartments'
        component={Compartments}
        options={{ ...options }}
      />

      <Stack.Screen
        name='PantryFoods'
        component={PantryFoods}
        options={{
          ...options,
          headerTitle: () => <NavigationHeaderTitle title='팬트리 식료품' />,
        }}
      />

      <Stack.Screen
        name='FavoriteFoods'
        component={FavoriteFoods}
        options={{
          ...options,
          headerTitle: () => (
            <NavigationHeaderTitle title='자주 먹는 식료품 관리' />
          ),
        }}
      />

      <Stack.Screen
        name='ExpiredFoods'
        component={ExpiredFoods}
        options={{
          ...options,
          headerTitle: () => (
            <NavigationHeaderTitle title='소비기한 주의 식료품 관리' />
          ),
        }}
      />

      <Stack.Screen
        name='ShoppingList'
        component={ShoppingList}
        options={{
          ...options,
          headerTitle: () => <NavigationHeaderTitle title='장보기 목록 관리' />,
        }}
      />

      <Stack.Screen
        name='Setting'
        component={Setting}
        options={{
          ...options,
          headerTitle: () => <NavigationHeaderTitle title='설정' />,
        }}
      />

      <Stack.Screen
        name='FridgeSetting'
        component={FridgeSetting}
        options={{
          ...options,
          headerTitle: () => (
            <NavigationHeaderTitle title='나의 냉장고 커스텀' />
          ),
        }}
      />

      <Stack.Screen
        name='FontSetting'
        component={FontSetting}
        options={{
          ...options,
          headerTitle: () => <NavigationHeaderTitle title='폰트 설정' />,
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
