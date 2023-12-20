import { useDispatch, useSelector } from '../redux/hook';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { NavigationProp } from '@react-navigation/native';
import {
  BACKGROUND_COLOR,
  DEEP_GRAY,
  HEADER_BGCOLOR,
  TAB_BLUE_BG_COLOR,
} from '../constant/colors';
import { useEffect } from 'react';
import { closeAllModal } from '../redux/slice/modalVisibleSlice';

import OnBoarding from '../screens/OnBoarding';
import Home from '../screens/Home';
import HomeShoppingList from '../screens/HomeShoppingList';
import Compartments from '../screens/Compartments';
import AllFoods from '../screens/AllFoods';
import FavoriteFoods from '../screens/FavoriteFoods';
import HomeFridge from '../screens/HomeFridge';
import PantryFoods from '../screens/PantryFoods';
import Setting from '../screens/Setting';
import SettingFridge from '../screens/SettingFridge';
import SettingFont from '../screens/SettingFont';
import SettingNotification from '../screens/SettingNotification';
import HeaderIconBtn from '../components/buttons/HeaderIconBtn';
import NavigationHeaderTitle from '../components/common/NavigationHeaderTitle';

export type RootStackParamList = {
  OnBoarding: undefined;
  Home: undefined;
  HomeFridge: undefined;
  HomeShoppingList: undefined;
  Compartments: undefined | object;
  FavoriteFoods: undefined;
  AllFoods: undefined;
  PantryFoods: undefined;
  Setting: undefined;
  SettingFont: undefined;
  SettingFridge: undefined;
  SettingNotification: undefined;
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
  headerLeft: () => <HeaderIconBtn iconName='goBack' />,
  headerBackVisible: false, // android
  animation: 'slide_from_right',
};

const Navigation = () => {
  const { onboarding } = useSelector((state) => state.onboarding);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeAllModal());
  }, []);

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
        name='HomeFridge'
        component={HomeFridge}
        options={{ ...options, headerShown: false }}
      />

      <Stack.Screen
        name='HomeShoppingList'
        component={HomeShoppingList}
        options={{
          ...options,
          headerTitle: () => <NavigationHeaderTitle title='장보기 목록 관리' />,
        }}
      />

      <Stack.Screen
        name='Compartments'
        component={Compartments}
        options={{
          ...options,
          headerStyle: { backgroundColor: TAB_BLUE_BG_COLOR },
        }}
      />

      <Stack.Screen
        name='PantryFoods'
        component={PantryFoods}
        options={{
          ...options,
          headerTitle: () => <NavigationHeaderTitle title='실온보관 식료품' />,
          headerStyle: { backgroundColor: BACKGROUND_COLOR },
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
        name='AllFoods'
        component={AllFoods}
        options={{
          ...options,
          headerTitle: () => <NavigationHeaderTitle title='전체 식료품 관리' />,
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
        name='SettingFont'
        component={SettingFont}
        options={{
          ...options,
          headerTitle: () => <NavigationHeaderTitle title='폰트' />,
        }}
      />

      <Stack.Screen
        name='SettingFridge'
        component={SettingFridge}
        options={{
          ...options,
          headerTitle: () => (
            <NavigationHeaderTitle title='나의 냉장고 커스텀' />
          ),
        }}
      />

      <Stack.Screen
        name='SettingNotification'
        component={SettingNotification}
        options={{
          ...options,
          headerTitle: () => <NavigationHeaderTitle title='알림 설정' />,
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
