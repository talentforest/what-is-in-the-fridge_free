import { Food } from '../../constant/foods';
import { TouchableOpacity } from '../common/native-component';
import { useRoute } from '@react-navigation/native';
import { FlatList, View } from 'react-native';
import { DEEP_GRAY, LIGHT_GRAY } from '../../constant/colors';
import { AnimationState, useFindFood } from '../../hooks/';

import LeftDay from '../common/LeftDay';
import TableItem from './TableItem';
import Icon from '../common/native-component/Icon';
import IndicatorExist from '../common/IndicatorExist';
import EmptySign from '../common/EmptySign';
import tw from 'twrnc';

interface Props {
  list: Food[];
  onCheckBoxPress: (food: Food) => void;
  addToFridgePress?: (food: Food) => void;
  title: '장보기 목록 식료품' | '자주 먹는 식료품' | '유통기한 주의 식료품';
  checkedList: Food[];
  animationState: AnimationState;
  afterAnimation: () => void;
}

export default function TableBody({
  list,
  onCheckBoxPress,
  addToFridgePress,
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
        <View style={tw`flex-1`}>
          <FlatList
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            style={tw`h-[${54 * list.length}px] `}
            contentContainerStyle={tw`pb-5`}
            data={list}
            renderItem={({ item }) => (
              <TableItem
                key={item.name}
                food={item}
                onCheckBoxPress={onCheckBoxPress}
                isCheckedItem={
                  !!checkedList.find((food) => food.id === item.id)
                }
                animationState={animationState}
                afterAnimation={afterAnimation}
              >
                {/* 유통기한 주의 식료품 정보 */}
                {route.name === 'ExpiredFoods' && (
                  <LeftDay expiredDate={item.expiredDate} size={15} mark />
                )}

                {/* 자주 먹는 식료품 정보 */}
                {route.name === 'FavoriteFoods' && (
                  <IndicatorExist name={item.name} />
                )}

                {/* 장보기 식료품 추가 버튼 */}
                {route.name === 'ShoppingList' && addToFridgePress && (
                  <TouchableOpacity
                    onPress={() => addToFridgePress(item)}
                    style={tw`h-full justify-center px-3 -mx-3`}
                  >
                    <Icon
                      type='MaterialCommunityIcons'
                      name='plus'
                      size={23}
                      color={
                        findFoodInFridge(item.name) ? LIGHT_GRAY : DEEP_GRAY
                      }
                    />
                  </TouchableOpacity>
                )}
              </TableItem>
            )}
          />
        </View>
      ) : (
        <View style={tw`pt-10 flex-1`}>
          <EmptySign message={`${title}이 없어요.`} />
        </View>
      )}
    </>
  );
}
