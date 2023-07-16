import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { NavigationProp } from '@react-navigation/native';
import { FontGmarketSansBold } from '../constant/fonts';
import { DEEP_GRAY } from '../constant/colors';
import { scaleFont } from '../util';
import MyTabs, { HEADER_BGCOLOR, RootTabParamList } from './MyTabs';
import React from 'react';
import Compartments from '../screens/Compartments';
import FavoriteFoods from '../screens/FavoriteFoods';
import ExpiredFoods from '../screens/ExpiredFoods';
import BackBtn from '../components/common/Buttons/BackBtn';
import FridgeSetting from '../screens/FridgeSetting';

export type RootStackParamList = {
  MyTabs: undefined;
  Compartments: undefined | object;
  FavoriteFoods: undefined;
  ExpiredFoods: undefined;
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
  headerStyle: { backgroundColor: HEADER_BGCOLOR },
  headerTitleStyle: {
    fontSize: scaleFont(16),
    ...FontGmarketSansBold,
  },
  headerTitleAlign: 'center',
  headerLeft: () => <BackBtn />,
};

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name='MyTabs'
        component={MyTabs}
      />
      <Stack.Screen
        name='Compartments'
        component={Compartments}
        options={{
          ...options,
        }}
      />
      <Stack.Screen
        name='FavoriteFoods'
        component={FavoriteFoods}
        options={{ ...options, title: '자주 먹는 식료품 관리' }}
      />
      <Stack.Screen
        name='ExpiredFoods'
        component={ExpiredFoods}
        options={{ ...options, title: '유통기한 주의 식료품 관리' }}
      />
      <Stack.Screen
        name='FridgeSetting'
        component={FridgeSetting}
        options={{ ...options, title: '나의 냉장고 설정' }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
