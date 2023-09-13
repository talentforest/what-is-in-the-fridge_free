import { SafeBottomAreaView } from '../components/common/native-component';
import { entireFilterObj, expiredFilters, spaceFilters } from '../util';
import {
  useHandleCheckList,
  useHandleTableItem,
  useGetFoodList,
  useSetAnimationState,
  useHandleFilter,
} from '../hooks/';
import { useEffect } from 'react';
import { View } from 'react-native';

import Container from '../components/common/Container';
import TableContainer from '../components/table/TableContainer';
import TableHeader from '../components/table/TableHeader';
import TableBody from '../components/table/TableBody';
import TableFooter from '../components/table/TableFooter';
import TableFilters from '../components/table/TableFilters';
import SquareBtn from '../components/buttons/SquareBtn';
import tw from 'twrnc';

export default function ExpiredFoods() {
  const { currentFilter, initializeFilter } = useHandleFilter();

  const { getFilteredFoodList, allExpiredFoods } = useGetFoodList();

  const {
    checkedList,
    setCheckedList,
    onEntireBoxPress,
    onCheckBoxPress, //
  } = useHandleCheckList();

  const { onDeleteExpiredFoodPress } = useHandleTableItem({
    checkedList,
    setCheckedList,
  });

  const filteredList = getFilteredFoodList(currentFilter, allExpiredFoods());

  const { animationState, setAnimationState, afterAnimation } =
    useSetAnimationState();

  useEffect(() => {
    initializeFilter();
  }, []);

  const allChecked = checkedList.length === filteredList.length;

  return (
    <SafeBottomAreaView>
      <Container>
        <TableContainer>
          <TableHeader
            title='유통기한 주의 식료품'
            entireChecked={allChecked && !!checkedList.length}
            onEntirePress={() => onEntireBoxPress(filteredList)}
          />

          <TableFilters
            filterList={[entireFilterObj, ...expiredFilters, ...spaceFilters]}
            getTableList={getFilteredFoodList}
            setCheckedList={setCheckedList}
            foodList={allExpiredFoods()}
          />

          <TableBody
            title='유통기한 주의 식료품'
            list={filteredList}
            onCheckBoxPress={onCheckBoxPress}
            checkedList={checkedList}
            animationState={animationState}
            afterAnimation={() =>
              afterAnimation(onDeleteExpiredFoodPress, allExpiredFoods())
            }
          />

          <View style={tw`-mb-3`}>
            <TableFooter list={checkedList}>
              <SquareBtn
                name='유통기한 주의 식료품 삭제'
                onPress={() =>
                  onDeleteExpiredFoodPress(setAnimationState, animationState)
                }
                icon='trash-can'
                disabled={checkedList.length === 0}
              />
            </TableFooter>
          </View>
        </TableContainer>
      </Container>
    </SafeBottomAreaView>
  );
}
