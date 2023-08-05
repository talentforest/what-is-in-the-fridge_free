import { useFonts } from 'expo-font';
import { fonts } from '../constant/fonts';
import { SafeBottomAreaView } from '../components/native-component';
import { Alert } from 'react-native';
import { addItemsToShoppingList } from '../redux/slice/shoppingList';
import { useDispatch } from 'react-redux';

import useDeleteTableItem from '../hooks/useDeleteTableItem';
import useHandleCheckList from '../hooks/useHandleCheckList';
import useTableItemFilter, {
  FavoriteFoodsFilter,
} from '../hooks/useTableItemFilter';

import Container from '../components/common/layout/Container';
import TableContainer from '../components/common/table/TableContainer';
import TableHeader from '../components/common/table/TableHeader';
import TableFilters from '../components/common/table/TableFilters';
import TableBody from '../components/common/table/TableBody';
import TableFooter from '../components/common/table/TableFooter';
// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
// } from 'react-native-google-mobile-ads';

export default function FavoriteFoods() {
  const [fontsLoaded] = useFonts(fonts);
  const dispatch = useDispatch();

  const {
    currentFilter,
    changeFilter,
    allFavoriteFoodsFilters,
    favoriteTableList, //
  } = useTableItemFilter();

  const {
    checkedList,
    setCheckedList,
    onCheckBoxPress,
    isCheckedItem,
    onEntireBoxPress,
  } = useHandleCheckList();

  const { onDeletePress } = useDeleteTableItem(checkedList, setCheckedList);

  const onAddAlert = () => {
    const foodList = checkedList.map((food) => food.name).join(', ');
    const onPress = () => {
      setCheckedList([]);
    };
    Alert.alert('장보기 목록 추가', `${foodList} 식료품이 추가되었습니다.`, [
      { text: '확인', onPress, style: 'default' },
    ]);
  };

  const addShoppingListPress = () => {
    if (checkedList.length === 0) return;
    dispatch(addItemsToShoppingList(checkedList));
    onAddAlert();
  };

  if (!fontsLoaded) return null;

  return (
    <SafeBottomAreaView>
      <Container>
        <TableContainer>
          <TableHeader
            title='자주 먹는 식료품'
            listLength={favoriteTableList.length}
            entireChecked={checkedList.length === favoriteTableList.length}
            onEntirePress={() => onEntireBoxPress(favoriteTableList)}
            columnTitle={currentFilter as FavoriteFoodsFilter}
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
            onCheckBoxPress={onCheckBoxPress}
            isCheckedItem={isCheckedItem}
          />

          {/* 식료품 선택 개수와 버튼 */}
          <TableFooter
            list={checkedList}
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
