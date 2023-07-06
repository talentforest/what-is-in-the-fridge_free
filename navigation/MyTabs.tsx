import { FontGmarketSansRegular } from '../constant/fonts';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CARROT_COLOR, DEEP_INDIGO, GRAY } from '../constant/colors';
import { Dimensions } from 'react-native';
import { scaleFont } from '../util';
import Home from '../screens/Home';
import Setting from '../screens/Setting';
import ShoppingList from '../screens/ShoppingList';
import MyFridge from '../screens/MyFridge';
import TabIcon from './TabIcon';

export type RootTabParamList = {
  Home: undefined;
  MyFridge: undefined;
  Setting: undefined;
  ShoppingList: undefined;
};

const Tab = createBottomTabNavigator();
const DEVICE_HEIGHT = Dimensions.get('screen').height;

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarStyle: {
          backgroundColor: CARROT_COLOR,
          height:
            DEVICE_HEIGHT < 700 ? DEVICE_HEIGHT / 10 : DEVICE_HEIGHT / 8.5,
        },
        tabBarActiveTintColor: DEEP_INDIGO,
        tabBarInactiveTintColor: GRAY,
        tabBarIconStyle: {
          marginTop: 10,
        },
        tabBarLabelStyle: {
          marginVertical: 10,
          fontSize: scaleFont(11),
          ...FontGmarketSansRegular,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <TabIcon name='home-outline' color={color} />
          ),
          tabBarLabel: '홈',
        }}
      />
      <Tab.Screen
        name='MyFridge'
        component={MyFridge}
        options={{
          tabBarIcon: ({ color }) => (
            <TabIcon name='fridge-outline' color={color} />
          ),
          tabBarLabel: '나의 냉장고',
        }}
      />
      <Tab.Screen
        name='ShoppingList'
        component={ShoppingList}
        options={{
          tabBarIcon: ({ color }) => (
            <TabIcon name='format-list-bulleted' color={color} />
          ),
          tabBarLabel: '장보기 목록',
        }}
      />
      <Tab.Screen
        name='Setting'
        component={Setting}
        options={{
          tabBarIcon: ({ color }) => (
            <TabIcon name='dots-horizontal' color={color} />
          ),
          tabBarLabel: '더보기',
        }}
      />
    </Tab.Navigator>
  );
}
