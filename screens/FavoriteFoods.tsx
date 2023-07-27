import { useFonts } from 'expo-font';
import { fonts } from '../constant/fonts';
import { SafeBottomAreaView } from '../components/native-component';
import { useState } from 'react';
import TableFilters, { Filter } from '../components/common/Table/TableFilters';
import useHandleCheckList from '../hooks/useHandleCheckList';
import useFavoriteFoods from '../hooks/useFavoriteFoods';
import Container from '../components/LayoutBox/Container';
import TableContainer from '../components/common/Table/TableContainer';
import TableHeader from '../components/common/Table/TableHeader';
import TableBody from '../components/common/Table/TableBody';
import TableFooter from '../components/common/Table/TableFooter';

export default function FavoriteFoods() {
  const [fontsLoaded] = useFonts(fonts);
  const [isFilter, setIsFilter] = useState<Filter>('전체');

  const {
    favoriteFoods,
    nonExistFavoriteFoods,
    existFavoriteFoods, //
  } = useFavoriteFoods();

  const getTableList = (isFilter: Filter) => {
    if (isFilter === '냉장고에 있음') return [...existFavoriteFoods];
    if (isFilter === '냉장고에 없음') return [...nonExistFavoriteFoods];
    return [...nonExistFavoriteFoods, ...existFavoriteFoods];
  };

  const totalLength = getTableList(isFilter).length;
  const {
    entireCheck,
    setEntireCheck,
    checkList,
    setCheckList,
    onCheckPress,
    existInList,
    onEntirePress,
    onDeletePress,
    addShoppingListPress,
  } = useHandleCheckList(totalLength);

  const changeFilter = (filter: Filter) => {
    setCheckList([]);
    setIsFilter(filter);
    setEntireCheck(false);
  };

  if (!fontsLoaded) return null;

  return (
    <SafeBottomAreaView>
      <Container>
        <TableContainer>
          <TableHeader
            title='자주 먹는 식료품'
            listLength={getTableList(isFilter).length}
            entireChecked={entireCheck}
            onEntirePress={() => onEntirePress(favoriteFoods)}
            columnTitle={isFilter}
          />

          {/* 필터 */}
          <TableFilters isFilter={isFilter} changeFilter={changeFilter} />

          {/* 자주 먹는 식료품 목록 */}
          <TableBody
            existListItem={!!favoriteFoods.length}
            list={getTableList(isFilter)}
            onCheckPress={onCheckPress}
            existInList={existInList}
            noneItemNoti='자주 먹는 식료품이 아직 없습니다.'
          />

          {/* 식료품 선택 개수와 버튼 */}
          <TableFooter
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
