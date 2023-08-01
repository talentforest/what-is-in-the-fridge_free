import { Food } from '../../../constant/foods';
import { Text, TouchableOpacity } from '../../native-component';
import { useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import { DEEP_GRAY, LIGHT_GRAY } from '../../../constant/colors';
import useCheckFood from '../../../hooks/useCheckFood';
import LeftDay from '../LeftDay';
import TableList from './TableList';
import TableItem from './TableItem';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';
import IndicatorExist from '../IndicatorExist';

interface Props {
  existListItem: boolean;
  list: Food[];
  onCheckPress: (food: Food) => void;
  existInList: (id: string) => Food | undefined;
  noneItemNoti: string;
  addToFridgePress?: (food: Food) => void;
}

export default function TableBody({
  existListItem,
  list,
  onCheckPress,
  existInList,
  noneItemNoti,
  addToFridgePress,
}: Props) {
  const route = useRoute();
  const { checkExistFood } = useCheckFood();

  return (
    <>
      {existListItem ? (
        !!list.length ? (
          <TableList
            list={list}
            renderItem={({ item }) => (
              <TableItem
                key={item.name}
                food={item}
                onCheckPress={onCheckPress}
                existInList={existInList}
              >
                {/* 유통기한 주의 식료품 정보 */}
                {route.name === 'ExpiredFoods' && (
                  <View style={tw`flex-row items-center`}>
                    <LeftDay expiredDate={item.expiredDate} />
                  </View>
                )}

                {/* 자주 먹는 식료품 정보 */}
                {route.name === 'FavoriteFoods' && (
                  <IndicatorExist food={item} />
                )}

                {/* 장보기 식료품 추가 버튼 */}
                {route.name === 'ShoppingList' && addToFridgePress && (
                  <TouchableOpacity
                    onPress={() => addToFridgePress(item)}
                    style={tw`p-1.5`}
                  >
                    <Icon
                      type='MaterialCommunityIcons'
                      name='plus'
                      size={22}
                      color={checkExistFood(item) ? LIGHT_GRAY : DEEP_GRAY}
                    />
                  </TouchableOpacity>
                )}
              </TableItem>
            )}
          />
        ) : (
          <Text style={tw`text-slate-500 text-center mt-22 flex-1`}>
            결과가 없습니다.
          </Text>
        )
      ) : (
        <Text style={tw`text-slate-500 text-center mt-22 flex-1`}>
          {noneItemNoti}
        </Text>
      )}
    </>
  );
}
