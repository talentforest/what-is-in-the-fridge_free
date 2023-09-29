import { View } from 'react-native';
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

import Container from '../components/common/Container';
import TableContainer from '../components/table/TableContainer';
import TableBody from '../components/table/TableBody';
import TableFooter from '../components/table/TableFooter';
import TableFilters from '../components/table/TableFilters';
import SquareIconBtn from '../components/buttons/SquareIconBtn';
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

  const { onDeleteExpiredFoodPress, onAddShoppingListBtnPress } =
    useHandleTableItem({
      checkedList,
      setCheckedList,
    });

  const { animationState, setAnimationState, afterAnimation } =
    useSetAnimationState();

  useEffect(() => {
    initializeFilter();
  }, []);

  const filteredList = getFilteredFoodList(currentFilter, allExpiredFoods());
  const allChecked = checkedList.length === filteredList.length;

  return (
    <SafeBottomAreaView>
      <Container>
        <TableContainer>
          <TableFilters
            filterList={[entireFilterObj, ...expiredFilters, ...spaceFilters]}
            getTableList={getFilteredFoodList}
            setCheckedList={setCheckedList}
            foodList={allExpiredFoods()}
          />

          <TableBody
            list={filteredList}
            onCheckBoxPress={onCheckBoxPress}
            checkedList={checkedList}
            animationState={animationState}
            afterAnimation={() =>
              afterAnimation(onDeleteExpiredFoodPress, allExpiredFoods())
            }
          />

          <View style={tw`-my-3`}>
            <TableFooter
              list={checkedList}
              entireChecked={allChecked && !!checkedList.length}
              onEntirePress={() => onEntireBoxPress(filteredList)}
            >
              <SquareIconBtn
                icon='basket-plus'
                disabled={checkedList.length === 0}
                onPress={onAddShoppingListBtnPress}
              />
              <SquareIconBtn
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
