import { FontGmarketSansRegular } from '../constant/fonts';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions } from 'react-native';
import { GRAY, INDIGO, LIGHT_YELLOW } from '../constant/colors';
import Home from '../screens/Home';
import ShoppingList from '../screens/ShoppingList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyFridge from '../screens/MyFridge';

export type RootTabParamList = {
  Home: undefined;
  MyFridge: undefined;
  ShoppingList: undefined | object;
};

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: LIGHT_YELLOW,
          height: Dimensions.get('window').height / 10,
          maxHeight: 80,
        },
        tabBarItemStyle: { height: 60 },
        tabBarActiveTintColor: INDIGO,
        tabBarInactiveTintColor: GRAY,
        tabBarLabelStyle: { fontSize: 11, ...FontGmarketSansRegular },
      }}
    >
      <Tab.Screen
        name='home'
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name='home' color={color} size={20} />
          ),
          tabBarLabel: '홈',
        }}
      />
      <Tab.Screen
        name='MyFridge'
        component={MyFridge}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name='fridge' color={color} size={20} />
          ),
          tabBarLabel: '나의 냉장고',
        }}
      />
      <Tab.Screen
        name='ShoppingList'
        component={ShoppingList}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name='format-list-bulleted' color={color} size={20} />
          ),
          tabBarLabel: '장보기 목록',
        }}
      />
    </Tab.Navigator>
  );
}
