import { FontGmarketSansRegular } from '../constant/fonts';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { DEEP_BLUE, DEEP_YELLOW } from '../constant/colors';
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

const BG_COLOR = '#d6e6ff';
const TAB_BG_COLOR = '#648fff';

const Tab = createBottomTabNavigator();
const DEVICE_HEIGHT = Dimensions.get('screen').height;

const tabBarOptions = {
  tabBarStyle: {
    backgroundColor: TAB_BG_COLOR,
    height: DEVICE_HEIGHT < 700 ? DEVICE_HEIGHT / 10 : DEVICE_HEIGHT / 8.5,
  },
  tabBarActiveTintColor: DEEP_YELLOW,
  tabBarInactiveTintColor: '#fff',
  tabBarIconStyle: {
    marginTop: 10,
  },
  tabBarLabelStyle: {
    marginVertical: 10,
    fontSize: scaleFont(11),
    ...FontGmarketSansRegular,
  },
};

const headerOptions: BottomTabNavigationOptions = {
  headerShown: true,
  headerTintColor: DEEP_BLUE,
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: BG_COLOR,
  },
  headerTitleStyle: {
    fontSize: scaleFont(18),
    ...FontGmarketSansRegular,
  },
  headerTitleAlign: 'left',
};

export default function MyTabs() {
  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={{ ...tabBarOptions }}>
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <TabIcon name='home' color={color} />,
          tabBarLabel: '홈',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name='MyFridge'
        component={MyFridge}
        options={{
          tabBarIcon: ({ color }) => <TabIcon name='fridge' color={color} />,
          tabBarLabel: '나의 냉장고',
          headerTitle: '나의 냉장고',
          ...headerOptions,
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
          headerTitle: '장보기 목록',
          ...headerOptions,
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
          headerTitle: '설정',
          ...headerOptions,
          headerTitleAlign: 'center',
        }}
      />
    </Tab.Navigator>
  );
}
