import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { NavigationProp } from '@react-navigation/native';
import { FontGmarketSansRegular } from '../constant/fonts';
import { BG_LIGHT_GRAY, GRAY } from '../constant/colors';
import MyTabs, { RootTabParamList } from './MyTabs';
import React from 'react';
import Compartments from '../screens/Compartments';
import FavoriteFoods from '../screens/FavoriteFoods';
import ExpiredFoods from '../screens/ExpiredFoods';
import BackBtn from '../components/common/BackBtn';
import FridgeSetting from '../screens/FridgeSetting';
import { scaleFont } from '../util';

export type RootStackParamList = {
  MyTabs: undefined;
  Compartments: undefined | object;
  FavoriteFoods: undefined;
  ExpiredFoods: undefined;
  FridgeSetting: undefined;
};

export type RootNavParamList = RootTabParamList & RootStackParamList;

export type NavigateProp = NavigationProp<RootNavParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const options: NativeStackNavigationOptions = {
  headerShown: true,
  headerTintColor: GRAY,
  headerShadowVisible: false,
  headerStyle: { backgroundColor: BG_LIGHT_GRAY },
  headerTitleStyle: {
    fontSize: scaleFont(16),
    ...FontGmarketSansRegular,
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
          title: '냉장고 안 식료품',
        }}
      />
      <Stack.Screen
        name='FavoriteFoods'
        component={FavoriteFoods}
        options={{ ...options, title: '자주 먹는 식료품' }}
      />
      <Stack.Screen
        name='ExpiredFoods'
        component={ExpiredFoods}
        options={{ ...options, title: '유통기한 주의 식료품' }}
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
