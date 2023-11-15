import { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeBottomAreaView,
} from '../components/common/native-component';
import { Category } from '../constant/foodCategories';
import { entireFilterObj, existAbsenceFilters, scrollToIndex } from '../util';
import { Animated, FlatList } from 'react-native';
import {
  useHandleTableItem,
  useSlideAnimation,
  useSetAnimationState,
  useHandleCheckList,
  useSubmitFoodsFromInput,
  useGetFoodList,
  useFindFood,
  useHandleFilter,
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
  const [inputValue, setInputValue] = useState('');
  const [showCaution, setShowCaution] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [category, setCategory] = useState<Category>('신선식품류');

  const flatListRef = useRef<FlatList | null>(null);

  const { isFavoriteItem } = useFindFood();
  const { currentFilter, initializeFilter } = useHandleFilter();
  const { favoriteFoods, getFilteredFoodList } = useGetFoodList();
  const { onSubmitFavoriteListItem } = useSubmitFoodsFromInput();

  const {
    checkedList,
    setCheckedList,
    onCheckBoxPress,
    onEntireBoxPress, //
  } = useHandleCheckList();

  const { height, interpolatedOpacity } = useSlideAnimation({
    initialValue: 0,
    toValue: 20,
    active: !!(showCaution && isFavoriteItem(inputValue)),
  });

  const { animationState, setAnimationState, afterAnimation } =
    useSetAnimationState();

  const {
    onAddShoppingListBtnPress,
    onDeleteFoodPress,
    onConfirmPress, //
  } = useHandleTableItem({ checkedList, setCheckedList });

  useEffect(() => {
    initializeFilter();
  }, []);

  const onCategoryCheckBoxPress = (category: Category) => {
    setCategory(category);
    setCategoryOpen(false);
  };

  const onSubmitEditing = () => {
    onSubmitFavoriteListItem(
      inputValue,
      category,
      setInputValue,
      setShowCaution
    );
    setAnimationState('slidedown-in');
    scrollToIndex(flatListRef, filteredFoodList().length - 1);
  };

  const filteredList = getFilteredFoodList(currentFilter, favoriteFoods);

  const filteredFoodList = () => {
    return currentFilter === '전체'
      ? favoriteFoods
      : getFilteredFoodList(currentFilter, favoriteFoods);
  };

  const allChecked = checkedList.length === filteredList.length;

  return (
    <KeyboardAvoidingView>
      <SafeBottomAreaView>
        <Container>
          <TableFilters
            filterList={[entireFilterObj, ...existAbsenceFilters]}
            getTableList={getFilteredFoodList}
            setCheckedList={setCheckedList}
            setCategory={setCategory}
            foodList={favoriteFoods}
          />

          <TableBody
            title='자주 먹는 식료품'
            onCheckBoxPress={onCheckBoxPress}
            checkedList={checkedList}
            animationState={animationState}
            filteredList={filteredFoodList()}
            afterAnimation={() =>
              afterAnimation(onDeleteFoodPress, favoriteFoods)
            }
            flatListRef={flatListRef}
          />

          <TableFooterContainer>
            <TableSelectedHandleBox
              list={checkedList}
              entireChecked={allChecked && !!checkedList.length}
              onEntirePress={() => onEntireBoxPress(filteredList)}
            >
              <SquareIconBtn
                btnName='장보기 추가'
                icon='basket-plus-outline'
                disabled={checkedList.length === 0}
                onPress={onAddShoppingListBtnPress}
              />
              <SquareIconBtn
                btnName='해제'
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
              disabled={inputValue === ''}
              checkedListLength={checkedList.length}
            >
              <InputCategoryBtn
                category={category}
                setCategoryOpen={setCategoryOpen}
              />
            </TextInputRoundedBox>

            <Animated.View
              style={{
                height,
                marginTop: -15,
                marginBottom: 15,
                opacity: interpolatedOpacity,
                paddingLeft: 8,
              }}
            >
              <FormMessage
                active={!!(showCaution && isFavoriteItem(inputValue))}
                message='이미 목록에 있는 식료품이에요.'
                color='orange'
              />
            </Animated.View>
          </TableFooterContainer>

          <AlertModal onPress={() => onConfirmPress(setAnimationState)} />
        </Container>
      </SafeBottomAreaView>

      <CategoryModal
        modalVisible={categoryOpen}
        setModalVisible={setCategoryOpen}
        currentChecked={category}
        onCheckBoxPress={onCategoryCheckBoxPress}
      />
    </KeyboardAvoidingView>
  );
}
