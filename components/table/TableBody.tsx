import { Food } from '../../constant/foods';
import { TouchableOpacity } from '../common/native-component';
import { useRoute } from '@react-navigation/native';
import { Animated, View } from 'react-native';
import { DEEP_GRAY, LIGHT_GRAY } from '../../constant/colors';
import { BoxColor } from '../../screen-component/home/ShoppingListSection';
import { AnimationState, useFindFood } from '../../hooks/';

import LeftDay from '../common/LeftDay';
import TableItem from './TableItem';
import Icon from '../common/native-component/Icon';
import IndicatorExist from '../common/IndicatorExist';
import CategoryImageIcon from '../common/CategoryImageIcon';
import EmptySign from '../common/EmptySign';
import tw from 'twrnc';

interface Props {
  list: Food[];
  onCheckBoxPress: (food: Food) => void;
  addToFridgePress?: (food: Food) => void;
  color: BoxColor;
  title: '장보기 목록 식료품' | '자주 먹는 식료품' | '유통기한 주의 식료품';
  checkedList: Food[];
  animationState: AnimationState;
  afterAnimation: () => void;
}

export default function TableBody({
  list,
  onCheckBoxPress,
  addToFridgePress,
  color = 'slate',
  title,
  checkedList,
  animationState,
  afterAnimation,
}: Props) {
  const route = useRoute();

  const { findFoodInFridge } = useFindFood();

  return (
    <>
      {!!list.length ? (
        <Animated.FlatList
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={tw`flex-1 bg-white border-t border-b border-slate-500`}
          contentContainerStyle={tw`px-3 pb-3`}
          data={list}
          renderItem={({ item }) => (
            <TableItem
              key={item.name}
              food={item}
              onCheckBoxPress={onCheckBoxPress}
              isCheckedItem={!!checkedList.find((food) => food.id === item.id)}
              animationState={animationState}
              afterAnimation={afterAnimation}
            >
              {/* 유통기한 주의 식료품 정보 */}
              {route.name === 'ExpiredFoods' && (
                <View style={tw`flex-row items-center`}>
                  <LeftDay expiredDate={item.expiredDate} />
                </View>
              )}

              {/* 자주 먹는 식료품 정보 */}
              {route.name === 'FavoriteFoods' && (
                <>
                  <View style={tw`w-14 justify-center items-center`}>
                    <CategoryImageIcon
                      kind='icon'
                      category={item.category}
                      size={18}
                    />
                  </View>
                  <View>
                    <IndicatorExist food={item} />
                  </View>
                </>
              )}

              {/* 장보기 식료품 추가 버튼 */}
              {route.name === 'ShoppingList' && addToFridgePress && (
                <TouchableOpacity
                  onPress={() => addToFridgePress(item)}
                  style={tw`h-full justify-center px-3 pl-6 -mx-3`}
                >
                  <Icon
                    type='MaterialCommunityIcons'
                    name='plus'
                    size={23}
                    color={findFoodInFridge(item.name) ? LIGHT_GRAY : DEEP_GRAY}
                  />
                </TouchableOpacity>
              )}
            </TableItem>
          )}
        />
      ) : (
        <View
          style={tw` pt-20 bg-white border-t border-b border-slate-500 flex-1`}
        >
          <EmptySign message={`${title}이 없어요.`} color={color} />
        </View>
      )}
    </>
  );
}
