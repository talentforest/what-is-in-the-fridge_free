import { SafeBottomAreaView } from '../components/native-component';
import { useDispatch } from '../redux/hook';
import { setAllFoods } from '../redux/slice/allFoodsSlice';
import { Food } from '../constant/foods';

import useHandleCheckList from '../hooks/useHandleCheckList';
import useTableItemFilter from '../hooks/useTableItemFilter';
import useHandleTableItem from '../hooks/useHandleTableItem';

import Container from '../components/common/layout/Container';
import TableContainer from '../components/common/table/TableContainer';
import TableHeader from '../components/common/table/TableHeader';
import TableBody from '../components/common/table/TableBody';
import TableFooter from '../components/common/table/TableFooter';
import TableFilters from '../components/common/table/TableFilters';
// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
// } from 'react-native-google-mobile-ads';

export default function ExpiredFoods() {
  const dispatch = useDispatch();

  const {
    currentFilter,
    changeFilter,
    allExpiredFoodsFilters,
    expiredTableList,
    getExpiredTableList,
  } = useTableItemFilter();

  const {
    checkedList,
    onEntireBoxPress,
    onCheckBoxPress,
    isCheckedItem, //
  } = useHandleCheckList();

  const deleteAlertGuide = {
    title: '유통기한 주의 식료품 삭제',
    desc: `총 ${checkedList.length}개의 식료품을 냉장고에서 삭제하시겠습니까?`,
    defaultBtnText: '삭제',
    onPress: (filteredArr: Food[]) => dispatch(setAllFoods(filteredArr)),
  };

  const { onDeletePress } = useHandleTableItem({
    deleteAlertGuide,
    checkedList,
  });

  return (
    <SafeBottomAreaView>
      <Container>
        {/* 전체 표 */}
        <TableContainer>
          <TableHeader
            title={`유통기한 주의 식료품`}
            entireChecked={checkedList.length === expiredTableList.length}
            onEntirePress={() => onEntireBoxPress(expiredTableList)}
            columnTitle='유통기한순'
          />

          {/* 필터 */}
          {!!expiredTableList && (
            <TableFilters
              allFilters={allExpiredFoodsFilters}
              currentFilter={currentFilter}
              changeFilter={changeFilter}
              getTableList={getExpiredTableList}
            />
          )}

          {/* 식료품 리스트 */}
          <TableBody
            list={expiredTableList}
            onCheckBoxPress={onCheckBoxPress}
            isCheckedItem={isCheckedItem}
          />

          {/* 식료품 선택 개수와 버튼 */}
          <TableFooter
            list={checkedList}
            onDeletePress={() => onDeletePress(expiredTableList)}
            buttons={['delete']}
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
