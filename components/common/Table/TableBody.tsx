import { Food } from '../../../constant/foods';
import { Text, TouchableOpacity } from '../../native-component';
import { useRoute } from '@react-navigation/native';
import { FlatList, View } from 'react-native';
import { DEEP_GRAY, LIGHT_GRAY } from '../../../constant/colors';
import { BoxColor } from '../../screen-component/home/EntranceBox';

import useCheckFood from '../../../hooks/useCheckFood';

import LeftDay from '../LeftDay';
import TableItem from './TableItem';
import Icon from '../../native-component/Icon';
import IndicatorExist from '../IndicatorExist';
import CategoryImageIcon from '../CategoryImageIcon';
import tw from 'twrnc';
import EmptySign from '../EmptySign';

interface Props {
  list: Food[];
  onCheckBoxPress: (food: Food) => void;
  isCheckedItem: (id: string) => Food | undefined;
  addToFridgePress?: (food: Food) => void;
  color: BoxColor;
}

export default function TableBody({
  list,
  onCheckBoxPress,
  isCheckedItem,
  addToFridgePress,
  color = 'slate',
}: Props) {
  const route = useRoute();
  const { findFoodInFridge } = useCheckFood();

  const currentPosition =
    route.name === 'ShoppingList'
      ? '장보기 목록 식료품'
      : route.name === 'FavoriteFoods'
      ? '자주 먹는 식료품'
      : route.name === 'ExpiredFoods'
      ? '유통기한 주의 식료품'
      : '식료품';

  return (
    <>
      {!!list.length ? (
        <FlatList
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={tw`flex-1 bg-white border-t border-b border-slate-500`}
          contentContainerStyle={tw`px-3 pb-3`}
          ItemSeparatorComponent={() => (
            <View style={tw`border-t border-slate-300`} />
          )}
          data={list}
          renderItem={({ item }) => (
            <TableItem
              key={item.name}
              food={item}
              onCheckBoxPress={onCheckBoxPress}
              isCheckedItem={isCheckedItem}
              exist={
                !!(route.name === 'ShoppingList' && findFoodInFridge(item.name))
              }
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
                  <View style={tw`w-9 justify-center items-center`}>
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
                  style={tw`h-full justify-center px-3 -mx-3`}
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
          <EmptySign message={`${currentPosition}이 없어요.`} color={color} />
        </View>
      )}
    </>
  );
}
