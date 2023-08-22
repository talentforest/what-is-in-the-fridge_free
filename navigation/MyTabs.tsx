import { FontGmarketSansBold, FontGmarketSansRegular } from '../constant/fonts';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  DEEP_GRAY,
  DEEP_YELLOW,
  HEADER_BGCOLOR,
  TAB_BG_COLOR,
} from '../constant/colors';
import { Dimensions } from 'react-native';
import { responsiveFontSize } from '../util';
import { PlatformIOS } from '../constant/statusBarHeight';
import Home from '../screens/Home';
import ShoppingList from '../screens/ShoppingList';
import MyFridge from '../screens/MyFridge';
import Icon from '../components/native-component/Icon';

export type RootTabParamList = {
  Home: undefined;
  MyFridge: undefined;
  ShoppingList: undefined;
};

const Tab = createBottomTabNavigator();

const DEVICE_HEIGHT = Dimensions.get('screen').height;
const PLATFORM_TAB_HEIGHT = PlatformIOS ? 100 : DEVICE_HEIGHT / 12;
const TAB_HEIGHT =
  DEVICE_HEIGHT < 700 ? DEVICE_HEIGHT / 10 : PLATFORM_TAB_HEIGHT;

const tabBarOptions = {
  tabBarStyle: {
    backgroundColor: TAB_BG_COLOR,
    height: TAB_HEIGHT,
  },
  tabBarItemStyle: {},
  tabBarActiveTintColor: DEEP_YELLOW,
  tabBarInactiveTintColor: '#fff',
  tabBarIconStyle: {
    flex: 1,
  },
  tabBarLabelStyle: {
    paddingBottom: 12,
    fontSize: responsiveFontSize(10),
    ...FontGmarketSansRegular,
  },
};

const headerOptions: BottomTabNavigationOptions = {
  tabBarHideOnKeyboard: PlatformIOS ? false : true,
  headerShown: true,
  headerTintColor: DEEP_GRAY,
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: HEADER_BGCOLOR,
  },
  headerTitleStyle: {
    fontSize: responsiveFontSize(16),
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
    </Tab.Navigator>
  );
}

export function TabIcon({ name, color }: { name: string; color: string }) {
  return (
    <Icon type='MaterialCommunityIcons' name={name} color={color} size={16} />
  );
}
