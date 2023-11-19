import { useCallback, useEffect, useRef } from 'react';
import {
  KeyboardAvoidingView,
  SafeBottomAreaView,
} from '../components/common/native-component';
import { entireFilterObj, existAbsenceFilters, scrollToIndex } from '../util';
import { FlatList, View } from 'react-native';
import {
  useHandleTableItem,
  useSetAnimationState,
  useHandleCheckList,
  useSubmitFoodsFromInput,
  useGetFoodList,
  useHandleFilter,
  useHandleFoodCategory,
} from '../hooks';

import Container from '../components/common/Container';
import TableFooterContainer from '../components/table/TableFooterContainer';
import TableFilters from '../components/table/TableFilters';
import TableSelectedHandleBox from '../components/table/TableSelectedHandleBox';
import TextInputRoundedBox from '../components/common/TextInputRoundedBox';
import CategoryModal from '../screen-component/modal/CategoryModal';
import InputCategoryBtn from '../components/buttons/InputCategoryBtn';
import FormMessage from '../components/form/FormMessage';
import SquareIconBtn from '../components/buttons/SquareIconBtn';
import TableBody from '../components/table/TableBody';
import AlertModal from '../screen-component/modal/AlertModal';

export default function FavoriteFoods() {
  const flatListRef = useRef<FlatList | null>(null);

  const { currentFilter, initializeFilter } = useHandleFilter();

  useEffect(() => {
    initializeFilter();
  }, []);

  // 테이블 아이템들 다루는 커스텀 훅
  const {
    checkedList,
    setCheckedList,
    onCheckBoxPress,
    onEntireBoxPress, //
  } = useHandleCheckList();

  const {
    animationState,
    setAnimationState,
    afterAnimation, //
  } = useSetAnimationState();

  const {
    onAddShoppingListBtnPress,
    onDeleteFoodPress,
    onConfirmPress, //
  } = useHandleTableItem({ checkedList, setCheckedList });

  // input과 관련된 커스텀 훅
  const {
    inputValue,
    setInputValue,
    isActiveCaution,
    onSubmitFavoriteListItem, //
  } = useSubmitFoodsFromInput();

  const {
    category,
    setCategory,
    isCategoryModalOpen,
    setIsCategoryModalOpen,
    onCategoryChangePress,
  } = useHandleFoodCategory();

  const { favoriteFoods, getFilteredFoodList } = useGetFoodList();

  const foodList = useCallback(() => {
    return getFilteredFoodList(currentFilter, favoriteFoods);
  }, [currentFilter, favoriteFoods]);

  const afterAnimationWork = () => {
    afterAnimation(onDeleteFoodPress, favoriteFoods);
  };

  const onSubmitEditing = () => {
    onSubmitFavoriteListItem(category);
    setAnimationState('slidedown-in');
    scrollToIndex(flatListRef, foodList().length - 1);
  };

  return (
    <KeyboardAvoidingView>
      <SafeBottomAreaView>
        <Container>
          <TableFilters
            filterTagList={existAbsenceFilters}
            foodList={favoriteFoods}
            setCheckedList={setCheckedList}
            setCategory={setCategory}
            withFoodCategoryFilterTag
          />

          <TableBody
            title='자주 먹는 식료품'
            foodList={foodList}
            onCheckBoxPress={onCheckBoxPress}
            checkedList={checkedList}
            animationState={animationState}
            afterAnimation={afterAnimationWork}
            flatListRef={flatListRef}
          />

          <TableFooterContainer>
            <TableSelectedHandleBox
              checkedList={checkedList}
              foodList={foodList}
              onEntirePress={onEntireBoxPress}
            >
              <SquareIconBtn
                btnName='장보기 추가'
                icon='basket-plus-outline'
                disabled={checkedList.length === 0}
                onPress={onAddShoppingListBtnPress}
              />
              <SquareIconBtn
                btnName='삭제'
                icon='tag-minus-outline'
                disabled={checkedList.length === 0}
                onPress={() => onDeleteFoodPress(animationState, favoriteFoods)}
              />
            </TableSelectedHandleBox>

            <TextInputRoundedBox
              value={inputValue}
              setValue={setInputValue}
              placeholder='자주 먹는 식료품을 추가하세요.'
              onSubmitEditing={onSubmitEditing}
              disabled={inputValue === '' || isActiveCaution}
              checkedListLength={checkedList.length}
            >
              <InputCategoryBtn
                category={category}
                setCategoryOpen={setIsCategoryModalOpen}
              />
            </TextInputRoundedBox>

            <View
              style={{ marginTop: isActiveCaution ? -12 : 0, marginLeft: 6 }}
            >
              <FormMessage
                active={isActiveCaution}
                message='이미 목록에 있는 식료품이에요.'
                color='orange'
              />
            </View>
          </TableFooterContainer>

          <AlertModal onPress={() => onConfirmPress(setAnimationState)} />
        </Container>
      </SafeBottomAreaView>

      <CategoryModal
        modalVisible={isCategoryModalOpen}
        setModalVisible={setIsCategoryModalOpen}
        currentChecked={category}
        onCheckBoxPress={onCategoryChangePress}
      />
    </KeyboardAvoidingView>
  );
}
