import { View } from 'react-native';
import { useFonts } from 'expo-font';
import { fonts } from '../constant/fonts';
import { SafeBottomAreaView } from '../components/native-component';
import { useSelector } from '../redux/hook';
import { useDispatch } from 'react-redux';
import { Food } from '../constant/foods';
import { setAllFoods } from '../redux/slice/allFoodsSlice';
import { setFavoriteList } from '../redux/slice/favoriteFoodsSlice';

import useHandleTableItem from '../hooks/useHandleTableItem';
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
import tw from 'twrnc';
import { scaleH } from '../util';
// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
// } from 'react-native-google-mobile-ads';

export default function FavoriteFoods() {
  const { allFoods } = useSelector((state) => state.allFoods);
  const [fontsLoaded] = useFonts(fonts);
  const dispatch = useDispatch();

  const {
    currentFilter,
    changeFilter,
    allFavoriteFoodsFilters,
    favoriteTableList,
    getFavoriteTableList,
  } = useTableItemFilter();

  const {
    checkedList,
    setCheckedList,
    onCheckBoxPress,
    isCheckedItem,
    onEntireBoxPress,
    checkedFoodNameList,
  } = useHandleCheckList();

  const changeFavStateInList = () => {
    return allFoods.map((food) => {
      const isFavoriteFood = checkedList.some(
        (item) => item.name === food.name
      );
      return isFavoriteFood ? { ...food, favorite: false } : food;
    });
  };

  const deleteAlertGuide = {
    title: '자주 먹는 식료품 해제',
    desc: `총 ${checkedList.length}개의 식료품(${checkedFoodNameList})을 자주 먹는 식료품에서 해제하시겠습니까?`,
    defaultBtnText: '해제',
    onPress: (filteredArr: Food[]) => {
      dispatch(setAllFoods(changeFavStateInList()));
      dispatch(setFavoriteList(filteredArr));
    },
  };

  const { onDeletePress, onAddShoppingListPress } = useHandleTableItem({
    deleteAlertGuide,
    checkedList,
    setCheckedList,
  });

  if (!fontsLoaded) return null;

  return (
    <SafeBottomAreaView>
      <Container>
        <TableContainer>
          <View style={tw`px-3 py-2 min-h-[${scaleH(40)}px] justify-center`}>
            <TableHeader
              title='자주 먹는 식료품'
              entireChecked={
                checkedList.length === favoriteTableList.length &&
                !!checkedList.length
              }
              onEntirePress={() => onEntireBoxPress(favoriteTableList)}
              columnTitle={currentFilter as FavoriteFoodsFilter}
            />

            {/* 필터 */}
            {favoriteTableList.length !== 0 && (
              <TableFilters
                allFilters={allFavoriteFoodsFilters}
                currentFilter={currentFilter}
                changeFilter={changeFilter}
                getTableList={getFavoriteTableList}
                setCheckedList={setCheckedList}
              />
            )}
          </View>
          {/* 자주 먹는 식료품 목록 */}
          <TableBody
            list={favoriteTableList}
            onCheckBoxPress={onCheckBoxPress}
            isCheckedItem={isCheckedItem}
          />

          {/* 식료품 선택 개수와 버튼 */}
          <TableFooter
            list={checkedList}
            onAddPress={onAddShoppingListPress}
            onDeletePress={() => {
              onDeletePress(favoriteTableList);
            }}
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
