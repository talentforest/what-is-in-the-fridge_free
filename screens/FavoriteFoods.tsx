import { useFonts } from 'expo-font';
import { fonts } from '../constant/fonts';
import {
  SafeBottomAreaView,
  Text,
  TouchableOpacity,
} from '../components/native-component';
import { View } from 'react-native';
import { useState } from 'react';
import { DEEP_YELLOW, INDIGO, LIGHT_INDIGO } from '../constant/colors';
import TableLabel from '../components/common/Table/TableLabel';
import useHandleCheckList from '../hooks/useHandleCheckList';
import TableList from '../components/common/Table/TableList';
import TableItem from '../components/common/Table/TableItem';
import useCheckFood from '../hooks/useCheckFood';
import useFavoriteFoods from '../hooks/useFavoriteFoods';
import TableContainer from '../components/common/Table/TableContainer';
import Container from '../components/common/LayoutBox/Container';
import TableItemSetting from '../components/common/Table/TableItemSetting';
import Icon from '../components/native-component/Icon';
import tw from 'twrnc';

type Filter = '전체' | '냉장고에 있음' | '냉장고에 없음';

export default function FavoriteFoods() {
  const [fontsLoaded] = useFonts(fonts);
  const [filterOpen, setFilterOpen] = useState(false);
  const [isFilter, setIsFilter] = useState<Filter>('전체');

  const {
    favoriteFoods,
    nonExistFavoriteFoods,
    existFavoriteFoods, //
  } = useFavoriteFoods();

  const {
    entireCheck,
    checkList,
    onCheckPress,
    existInList,
    onEntirePress,
    onDeletePress,
    addShoppingListPress,
  } = useHandleCheckList();
  const { checkExistFood } = useCheckFood();

  const filterList = (filter: Filter) => {
    setIsFilter(filter);
  };

  const getTableList = () => {
    if (isFilter === '냉장고에 있음') return [...existFavoriteFoods];
    if (isFilter === '냉장고에 없음') return [...nonExistFavoriteFoods];
    return [...nonExistFavoriteFoods, ...existFavoriteFoods];
  };

  if (!fontsLoaded) return null;

  return (
    <SafeBottomAreaView>
      <Container>
        <TableContainer>
          <TableLabel
            title='자주 먹는 식료품'
            entireChecked={entireCheck}
            onEntirePress={() => onEntirePress(favoriteFoods)}
          >
            <TouchableOpacity
              onPress={() => setFilterOpen((prev) => !prev)}
              style={tw`justify-end flex-row items-center gap-0.5 rounded-full`}
            >
              <Icon
                type='MaterialCommunityIcons'
                name={'chevron-down'}
                size={22}
                color={INDIGO}
              />
              <Text style={tw`text-indigo-600`}>{isFilter}</Text>
            </TouchableOpacity>
          </TableLabel>
          {filterOpen && (
            <View style={tw`flex-row flex-wrap pt-2 gap-1`}>
              {['전체', '냉장고에 있음', '냉장고에 없음'].map((filter) => (
                <TouchableOpacity
                  onPress={() => filterList(filter as Filter)}
                  key={filter}
                  style={tw`flex-row items-center gap-0.5 border py-1 px-2 rounded-full ${
                    filter === isFilter
                      ? 'bg-amber-50 border-amber-500'
                      : 'border-slate-400 bg-white'
                  }`}
                >
                  {filter !== '전체' && (
                    <Icon
                      type='MaterialCommunityIcons'
                      name='filter'
                      size={16}
                      color={filter === isFilter ? DEEP_YELLOW : LIGHT_INDIGO}
                    />
                  )}
                  <Text
                    style={tw`${
                      filter === isFilter ? 'text-amber-600' : 'text-slate-500'
                    }`}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {favoriteFoods.length !== 0 ? (
            <TableList
              list={getTableList()}
              renderItem={({ item }) => (
                <TableItem
                  key={item.name}
                  food={item}
                  onCheckPress={onCheckPress}
                  existInList={existInList}
                >
                  <Text
                    style={tw`${
                      !!checkExistFood(item)
                        ? 'text-indigo-500'
                        : 'text-slate-400'
                    }`}
                  >
                    {!!checkExistFood(item) ? '있음' : '없음'}
                  </Text>
                </TableItem>
              )}
            />
          ) : (
            <Text style={tw`text-slate-500 text-center mt-22`}>
              자주 먹는 식료품이 없습니다.
            </Text>
          )}
          <TableItemSetting
            list={checkList}
            onAddPress={addShoppingListPress}
            onPress={() => onDeletePress(favoriteFoods)}
            buttons={['delete-favorite', 'add-shopping-list']}
          />
        </TableContainer>
      </Container>
    </SafeBottomAreaView>
  );
}
