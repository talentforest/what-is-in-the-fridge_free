import { useSelector } from '../redux/hook';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { NavigationProp } from '@react-navigation/native';
import { DEEP_GRAY, HEADER_BGCOLOR } from '../constant/colors';
import { FontGmarketSansRegular } from '../constant/fonts';

import MyTabs, { RootTabParamList } from './MyTabs';
import Compartments from '../screens/Compartments';
import FavoriteFoods from '../screens/FavoriteFoods';
import ExpiredFoods from '../screens/ExpiredFoods';
import FridgeSetting from '../screens/FridgeSetting';
import HeaderBtn from '../components/buttons/HeaderBtn';
import OnBoarding from '../screens/OnBoarding';
import ShoppingList from '../screens/ShoppingList';

export type RootStackParamList = {
  MyTabs: undefined;
  OnBoarding: undefined;
  Compartments: undefined | object;
  FavoriteFoods: undefined;
  ExpiredFoods: undefined;
  ShoppingList: undefined;
  FridgeSetting: undefined;
};

export type RouteName = keyof RootTabParamList | keyof RootStackParamList;
export type RootNavParamList = RootTabParamList & RootStackParamList;
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
  headerLeft: () => (
    <HeaderBtn
      backBtn
      type='MaterialCommunityIcons'
      iconName='chevron-left'
      size={26}
    />
  ),
  headerBackVisible: false, // android
  headerTitleStyle: {
    fontSize: 17,
    ...FontGmarketSansRegular,
  },
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
        options={{ headerShown: false }}
        name='MyTabs'
        component={MyTabs}
      />
      <Stack.Screen
        name='Compartments'
        component={Compartments}
        options={{ ...options, animation: 'default' }}
      />
      <Stack.Screen
        name='FavoriteFoods'
        component={FavoriteFoods}
        options={{
          ...options,
          title: '자주 먹는 식료품 관리',
        }}
      />
      <Stack.Screen
        name='ExpiredFoods'
        component={ExpiredFoods}
        options={{
          ...options,
          title: '유통기한 주의 식료품 관리',
        }}
      />
      <Stack.Screen
        name='ShoppingList'
        component={ShoppingList}
        options={{
          ...options,
          title: '장보기 목록 관리',
        }}
      />
      <Stack.Screen
        name='FridgeSetting'
        component={FridgeSetting}
        options={{
          ...options,
          title: '나의 냉장고 설정',
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
