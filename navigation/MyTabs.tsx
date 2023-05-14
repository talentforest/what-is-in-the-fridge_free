import { FontGmarketSansRegular } from '../constant/fonts';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions } from 'react-native';
import { GRAY, INDIGO, LIGHT_YELLOW, YELLOW } from '../constant/colors';
import Home from '../screens/Home';
import ShoppingList from '../screens/ShoppingList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FavoriteFoods from '../screens/FavoriteFoods';
import EntranceFridgeSpace from '../screens/EntranceFridgeSpace';
import ExpiredFoods from '../screens/ExpiredFoods';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: LIGHT_YELLOW,
          height: Dimensions.get('window').height / 10,
        },
        tabBarItemStyle: { height: 55 },
        tabBarActiveTintColor: INDIGO,
        tabBarInactiveTintColor: GRAY,
        tabBarLabelStyle: {
          fontSize: 11,
          ...FontGmarketSansRegular,
        },
      }}
    >
      <Tab.Screen
        name='홈'
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name='home' color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name='나의 냉장고'
        component={EntranceFridgeSpace}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name='fridge' color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name='장보기 목록'
        component={ShoppingList}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name='format-list-bulleted' color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
