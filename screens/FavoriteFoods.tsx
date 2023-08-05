import { useFonts } from 'expo-font';
import { fonts } from '../constant/fonts';
import { SafeBottomAreaView } from '../components/native-component';
import TableFilters from '../components/common/table/TableFilters';
import useHandleCheckList from '../hooks/useHandleCheckList';
import Container from '../components/common/layout/Container';
import TableContainer from '../components/common/table/TableContainer';
import TableHeader from '../components/common/table/TableHeader';
import TableBody from '../components/common/table/TableBody';
import TableFooter from '../components/common/table/TableFooter';
import useTableItemFilter, {
  FavoriteFoodsFilter,
} from '../hooks/useTableItemFilter';
// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
// } from 'react-native-google-mobile-ads';

export default function FavoriteFoods() {
  const [fontsLoaded] = useFonts(fonts);

  const {
    currentFilter,
    setCurrentFilter,
    allFavoriteFoodsFilters,
    favoriteTableList, //
  } = useTableItemFilter();

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
  } = useHandleCheckList(favoriteTableList.length);

  const changeFilter = (filter: FavoriteFoodsFilter) => {
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
            listLength={favoriteTableList.length}
            entireChecked={entireCheck}
            onEntirePress={() => onEntirePress(favoriteTableList)}
            columnTitle={currentFilter}
          />

          {/* 필터 */}
          {favoriteTableList.length !== 0 && (
            <TableFilters
              allFilters={allFavoriteFoodsFilters}
              currentFilter={currentFilter}
              changeFilter={changeFilter}
            />
          )}

          {/* 자주 먹는 식료품 목록 */}
          <TableBody
            list={favoriteTableList}
            onCheckPress={onCheckPress}
            existInList={existInList}
          />

          {/* 식료품 선택 개수와 버튼 */}
          <TableFooter
            list={checkList}
            onAddPress={addShoppingListPress}
            onPress={() => onDeletePress(favoriteTableList)}
            buttons={['delete-favorite', 'add-shopping-list']}
          />
        </TableContainer>
      </Container>
      {/* <BannerAd
        unitId={TestIds.BANNER}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      /> */}
    </SafeBottomAreaView>
  );
}
