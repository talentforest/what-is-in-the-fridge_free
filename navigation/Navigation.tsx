import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from '../components/native-component';
import { FontGmarketSansRegular } from '../constant/fonts';
import { DEEP_INDIGO, GRAY, LIGHT_YELLOW } from '../constant/colors';
import MyTabs, { RootTabParamList } from './MyTabs';
import React from 'react';
import Compartments from '../screens/Compartments';
import FavoriteFoods from '../screens/FavoriteFoods';
import Notification from '../screens/Notification';
import Icon from 'react-native-vector-icons/AntDesign';
import ExpiredFoods from '../screens/ExpiredFoods';

const BackBtn = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name='left' size={18} color={DEEP_INDIGO} />
    </TouchableOpacity>
  );
};

export type RootNavParamList = RootTabParamList & RootStackParamList;

export type RootStackParamList = {
  MyTabs: undefined;
  Compartments: undefined | object;
  FavoriteFoods: undefined;
  ExpiredFoods: undefined;
  Notification: undefined;
};

export type NavigateProp = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const options: NativeStackNavigationOptions = {
  headerShown: true,
  headerTintColor: GRAY,
  headerStyle: { backgroundColor: LIGHT_YELLOW },
  headerTitleStyle: {
    fontWeight: '900',
    fontSize: 16,
    ...FontGmarketSansRegular,
  },
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
        options={{ ...options, title: '유통기한 임박 식료품' }}
      />
      <Stack.Screen
        name='Notification'
        component={Notification}
        options={{ ...options, title: '알림' }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
