import { useFonts } from 'expo-font';
import { fonts } from '../constant/fonts';
import { SafeBottomAreaView } from '../components/native-component';
import { useState } from 'react';
import TableFilters, { Filter } from '../components/common/table/TableFilters';
import useHandleCheckList from '../hooks/useHandleCheckList';
import useFavoriteFoods from '../hooks/useFavoriteFoods';
import Container from '../components/common/layout/Container';
import TableContainer from '../components/common/table/TableContainer';
import TableHeader from '../components/common/table/TableHeader';
import TableBody from '../components/common/table/TableBody';
import TableFooter from '../components/common/table/TableFooter';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

export default function FavoriteFoods() {
  const [fontsLoaded] = useFonts(fonts);
  const [currentFilter, setCurrentFilter] = useState<Filter>('전체');

  const {
    favoriteFoods,
    nonExistFavoriteFoods,
    existFavoriteFoods, //
  } = useFavoriteFoods();

  const getTableList = (filter: Filter) => {
    if (filter === '냉장고에 있음') return [...existFavoriteFoods];
    if (filter === '냉장고에 없음') return [...nonExistFavoriteFoods];
    return [...nonExistFavoriteFoods, ...existFavoriteFoods];
  };

  const totalLength = getTableList(currentFilter).length;
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
    setCurrentFilter(filter);
    setEntireCheck(false);
  };

  if (!fontsLoaded) return null;

  return (
    <SafeBottomAreaView>
      <Container>
        <TableContainer>
          <TableHeader
            title='자주 먹는 식료품'
            listLength={getTableList(currentFilter).length}
            entireChecked={entireCheck}
            onEntirePress={() => onEntirePress(favoriteFoods)}
            columnTitle={currentFilter}
          />

          {/* 필터 */}
          <TableFilters
            currentFilter={currentFilter}
            changeFilter={changeFilter}
          />

          {/* 자주 먹는 식료품 목록 */}
          <TableBody
            existListItem={!!favoriteFoods.length}
            list={getTableList(currentFilter)}
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
      <BannerAd
        unitId={TestIds.BANNER}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </SafeBottomAreaView>
  );
}
