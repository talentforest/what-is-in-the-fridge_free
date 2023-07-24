import { FontGmarketSansBold, FontGmarketSansRegular } from '../constant/fonts';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { DEEP_GRAY, DEEP_YELLOW } from '../constant/colors';
import { Dimensions, Platform } from 'react-native';
import { scaleFont } from '../util';
import Home from '../screens/Home';
import Setting from '../screens/Setting';
import ShoppingList from '../screens/ShoppingList';
import MyFridge from '../screens/MyFridge';
import Icon from '../components/native-component/Icon';

export type RootTabParamList = {
  Home: undefined;
  MyFridge: undefined;
  Setting: undefined;
  ShoppingList: undefined;
};

export const HEADER_BGCOLOR = '#dbecff';
const TAB_BG_COLOR = '#648fff';

const Tab = createBottomTabNavigator();
const DEVICE_HEIGHT = Dimensions.get('screen').height;
const PLATFORM_TAB_HEIGHT = Platform.OS === 'android' ? 70 : 100;

const tabBarOptions = {
  tabBarStyle: {
    backgroundColor: TAB_BG_COLOR,
    height: DEVICE_HEIGHT < 700 ? DEVICE_HEIGHT / 10 : PLATFORM_TAB_HEIGHT,
  },
  tabBarItemStyle: {
    margin: 5,
    paddingTop: 10,
    gap: 10,
  },
  tabBarActiveTintColor: DEEP_YELLOW,
  tabBarInactiveTintColor: '#fff',
  tabBarIconStyle: {
    flex: 1,
  },
  tabBarLabelStyle: {
    flex: 1,
    fontSize: scaleFont(11),
    ...FontGmarketSansRegular,
  },
};

const headerOptions: BottomTabNavigationOptions = {
  headerShown: true,
  headerTintColor: DEEP_GRAY,
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: HEADER_BGCOLOR,
  },
  headerTitleStyle: {
    fontSize: scaleFont(17),
    ...FontGmarketSansBold,
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
          headerStyle: {
            backgroundColor: '#fff',
          },
        }}
      />
    </Tab.Navigator>
  );
}

export function TabIcon({ name, color }: { name: string; color: string }) {
  return (
    <Icon type='MaterialCommunityIcons' name={name} color={color} size={18} />
  );
}
