import { FontGmarketSansRegular } from '../constant/fonts';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GRAY, INDIGO, LIGHT_YELLOW } from '../constant/colors';
import Home from '../screens/Home';
import Setting from '../screens/Setting';
import ShoppingList from '../screens/ShoppingList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MyFridge from '../screens/MyFridge';

export type RootTabParamList = {
  Home: undefined;
  MyFridge: undefined;
  Setting: undefined;
  ShoppingList: undefined;
};

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: LIGHT_YELLOW,
          maxHeight: 80,
        },
        tabBarItemStyle: {
          height: 52,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 2,
        },
        tabBarActiveTintColor: INDIGO,
        tabBarInactiveTintColor: GRAY,
        tabBarLabelStyle: { fontSize: 11, ...FontGmarketSansRegular },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name='home-outline' color={color} size={20} />
          ),
          tabBarLabel: '홈',
        }}
      />
      <Tab.Screen
        name='MyFridge'
        component={MyFridge}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name='fridge-outline' color={color} size={20} />
          ),
          tabBarLabel: '나의 냉장고',
        }}
      />
      <Tab.Screen
        name='ShoppingList'
        component={ShoppingList}
        options={{
          tabBarIcon: ({ color }) => (
            <FeatherIcon name='list' color={color} size={20} />
          ),
          tabBarLabel: '장보기 목록',
        }}
      />
      <Tab.Screen
        name='Setting'
        component={Setting}
        options={{
          tabBarIcon: ({ color }) => (
            <FeatherIcon name='more-horizontal' color={color} size={18} />
          ),
          tabBarLabel: '더보기',
        }}
      />
    </Tab.Navigator>
  );
}
