import { FontGmarketSansRegular } from '../constant/fonts';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { DEEP_GRAY, HEADER_BGCOLOR, TAB_BG_COLOR } from '../constant/colors';
import { PlatformIOS } from '../constant/statusBarHeight';

import Home from '../screens/Home';
import ShoppingList from '../screens/ShoppingList';
import MyFridge from '../screens/MyFridge';
import Icon from '../components/common/native-component/Icon';

export type RootTabParamList = {
  Home: undefined;
  MyFridge: undefined;
  ShoppingList: undefined;
};

const Tab = createBottomTabNavigator();

const tabBarOptions = {
  allowFontScaling: false,
  tabBarStyle: {
    backgroundColor: TAB_BG_COLOR,
    height: PlatformIOS ? 90 : 75,
  },
  tabBarActiveTintColor: '#fadd80',
  tabBarInactiveTintColor: '#fff',
  tabBarIconStyle: {
    flex: 1,
  },
  tabBarLabelStyle: {
    paddingBottom: PlatformIOS ? 3 : 15,
    fontSize: 11,
    ...FontGmarketSansRegular,
  },
};

const headerOptions: BottomTabNavigationOptions = {
  tabBarAllowFontScaling: false,
  tabBarHideOnKeyboard: PlatformIOS ? false : true,
  headerShown: true,
  headerTintColor: DEEP_GRAY,
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: HEADER_BGCOLOR,
  },
  headerTitleStyle: {
    fontSize: 18,
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
          tabBarAllowFontScaling: false,
        }}
      />
      <Tab.Screen
        name='MyFridge'
        component={MyFridge}
        options={{
          tabBarIcon: ({ color }) => <TabIcon name='fridge' color={color} />,
          tabBarLabel: '나의 냉장고',
          title: '나의 냉장고',
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
          title: '장보기 목록',
          ...headerOptions,
        }}
      />
    </Tab.Navigator>
  );
}

export function TabIcon({ name, color }: { name: string; color: string }) {
  return (
    <Icon
      type={name === 'home' ? 'Ionicons' : 'MaterialCommunityIcons'}
      name={name}
      color={color}
      size={16}
    />
  );
}
