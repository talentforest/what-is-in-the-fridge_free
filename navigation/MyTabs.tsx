import { FontGmarketSansRegular } from '../constant/fonts';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CARROT_COLOR, DEEP_INDIGO, GRAY } from '../constant/colors';
import { Dimensions } from 'react-native';
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

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarStyle: {
          backgroundColor: CARROT_COLOR,
          height: Dimensions.get('screen').height / 13,
          minHeight: 68,
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
            <Icon
              type='MaterialCommunityIcons'
              name='home-outline'
              color={color}
              size={20}
            />
          ),
          tabBarLabel: '홈',
        }}
      />
      <Tab.Screen
        name='MyFridge'
        component={MyFridge}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              type='MaterialCommunityIcons'
              name='fridge-outline'
              color={color}
              size={20}
            />
          ),
          tabBarLabel: '나의 냉장고',
        }}
      />
      <Tab.Screen
        name='ShoppingList'
        component={ShoppingList}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon type='Feather' name='list' color={color} size={20} />
          ),
          tabBarLabel: '장보기 목록',
        }}
      />
      <Tab.Screen
        name='Setting'
        component={Setting}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              type='Feather'
              name='more-horizontal'
              color={color}
              size={20}
            />
          ),
          tabBarLabel: '더보기',
        }}
      />
    </Tab.Navigator>
  );
}
