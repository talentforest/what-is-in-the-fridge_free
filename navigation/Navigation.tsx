import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from '../components/native-component';
import { FontGmarketSansRegular } from '../constant/fonts';
import React from 'react';
import Home from '../screens/Home';
import Compartments from '../screens/Compartments';
import Favorite from '../screens/Favorite';
import Notification from '../screens/Notification';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ExpiredFoods from '../screens/ExpiredFoods';
import EntranceFridge from '../screens/EntranceFridge';
import AddFoodDrawer from '../screens/AddFood';
import ShoppingList from '../screens/ShoppingList';

const BackBtn = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name='keyboard-arrow-left' size={30} color='#4e45ff' />
    </TouchableOpacity>
  );
};

export type RootStackParamList = {
  DrawerNav: undefined;
  Home: undefined;
  EntranceFridge: undefined;
  Compartments: undefined | object;
  AddFoodDrawer: undefined | object;
  FoodDetail: undefined;
  Favorite: undefined;
  Notification: undefined;
  ExpiredFoods: undefined;
  ShoppingList: undefined;
};

export type NavigateProp = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const options: NativeStackNavigationOptions = {
  headerShown: true,
  headerTintColor: '#333',
  headerStyle: { backgroundColor: '#e0e7ff' },
  headerTitleStyle: {
    fontWeight: '900',
    fontSize: 18,
    ...FontGmarketSansRegular,
  },
  headerLeft: () => <BackBtn />,
};

const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen
        name='EntranceFridge'
        component={EntranceFridge}
        options={{ ...options, title: '냉장고칸 선택' }}
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
        name='Favorite'
        component={Favorite}
        options={{ ...options, title: '자주 먹는 식료품' }}
      />
      <Stack.Screen
        name='AddFoodDrawer'
        component={AddFoodDrawer}
        options={{ ...options, title: '식료품 추가하기' }}
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
      <Stack.Screen
        name='ShoppingList'
        component={ShoppingList}
        options={{ ...options, title: '장보기 목록' }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
