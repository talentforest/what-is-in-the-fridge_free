import { SafeBottomAreaView } from '../components/native-component';
import { SpaceType } from '../constant/fridgeInfo';
import useHandleCheckList from '../hooks/useHandleCheckList';
import ExpiredState from '../components/screen-component/expired-foods/ExpiredState';
import Container from '../components/common/layout/Container';
import TableContainer from '../components/common/table/TableContainer';
import TableHeader from '../components/common/table/TableHeader';
import TableBody from '../components/common/table/TableBody';
import TableFooter from '../components/common/table/TableFooter';
import TableFilters from '../components/common/table/TableFilters';
import useTableItemFilter, {
  ExpiredFoodsFilter,
} from '../hooks/useTableItemFilter';
// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
// } from 'react-native-google-mobile-ads';

export default function ExpiredFoods() {
  const {
    currentFilter,
    setCurrentFilter,
    allExpiredFoodsFilters,
    expiredTableList,
  } = useTableItemFilter();

  const {
    entireCheck,
    setEntireCheck,
    checkList,
    setCheckList,
    onEntirePress,
    onDeletePress,
    onCheckPress,
    existInList,
  } = useHandleCheckList(
    expiredTableList.length,
    currentFilter as ExpiredFoodsFilter
  );

  const changeFilter = (filter: SpaceType) => {
    setCurrentFilter(filter);
    setEntireCheck(false);
    setCheckList([]);
  };

  return (
    <SafeBottomAreaView>
      <Container>
        {/* 전체 표 */}
        <TableContainer>
          <TableHeader
            title={`유통기한 주의 식료품`}
            listLength={expiredTableList.length}
            entireChecked={entireCheck}
            onEntirePress={() => onEntirePress(expiredTableList)}
            columnTitle='유통기한순'
          />

          {/* 필터 */}
          {!!expiredTableList && (
            <TableFilters
              allFilters={allExpiredFoodsFilters}
              currentFilter={currentFilter}
              changeFilter={changeFilter}
            />
          )}

          {/* 식료품 리스트 */}
          <TableBody
            list={expiredTableList}
            onCheckPress={onCheckPress}
            existInList={existInList}
          />

          {/* 냉장고 상태 문구 */}
          {!!expiredTableList.length && (
            <ExpiredState length={expiredTableList.length} />
          )}

          {/* 식료품 선택 개수와 버튼 */}
          <TableFooter
            list={checkList}
            onPress={() => onDeletePress(expiredTableList)}
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
