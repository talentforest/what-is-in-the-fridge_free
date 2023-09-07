import { useDispatch, useSelector } from '../redux/hook';
import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeBottomAreaView,
} from '../components/common/native-component';
import { Category } from '../constant/foodCategories';
import { categoryFilters, entireFilterObj, existAbsenceFilters } from '../util';
import { Animated, View } from 'react-native';
import {
  useHandleTableItem,
  useSlideAnimation,
  useSetAnimationState,
  useHandleCheckList,
  useSubmitFavoriteFoods,
  useGetFoodList,
  useFindFood,
} from '../hooks';
import { changeFilter } from '../redux/slice/filterSlice';

import Container from '../components/common/Container';
import TableContainer from '../components/table/TableContainer';
import TableHeader from '../components/table/TableHeader';
import TableFilters from '../components/table/TableFilters';
import TableBody from '../components/table/TableBody';
import TableFooter from '../components/table/TableFooter';
import TextInputRoundedBox from '../components/common/TextInputRoundedBox';
import CategoryModal from '../screen-component/modal/CategoryModal';
import InputCategoryBtn from '../components/buttons/InputCategoryBtn';
import Message from '../components/form/Message';
import SquareBtn from '../components/buttons/SquareBtn';

export default function FavoriteFoods() {
  const { currentFilter } = useSelector((state) => state.currentFilter);
  const [inputValue, setInputValue] = useState('');
  const [showCaution, setShowCaution] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [category, setCategory] = useState<Category | ''>('');

  const dispatch = useDispatch();
  const { findFavoriteListItem } = useFindFood();
  const { favoriteFoods, getFilteredFoodList } = useGetFoodList();
  const { onSubmitFavoriteListItem } = useSubmitFavoriteFoods();

  const {
    checkedList,
    setCheckedList,
    onCheckBoxPress,
    onEntireBoxPress, //
  } = useHandleCheckList();

  const { height, interpolatedOpacity } = useSlideAnimation({
    initialValue: 0,
    toValue: 20,
    active: showCaution,
  });

  const { animationState, setAnimationState, afterAnimation } =
    useSetAnimationState();

  const { onDeletePress, onAddShoppingListPress } = useHandleTableItem({
    checkedList,
    setCheckedList,
  });

  useEffect(() => {
    if (currentFilter !== '전체') {
      dispatch(changeFilter('전체'));
    }
    if (inputValue === '') {
      setShowCaution(false);
    }
  }, [inputValue]);

  const onCategoryCheckBoxPress = (category: Category) => {
    setCategory(category);
    setCategoryOpen(false);
  };

  const onSubmitEditing = () => {
    onSubmitFavoriteListItem(
      inputValue,
      category,
      setInputValue,
      setCategory,
      setShowCaution
    );
    setAnimationState('slidedown-in');
  };

  const filteredList = getFilteredFoodList(currentFilter, favoriteFoods);

  const allChecked = checkedList.length === filteredList.length;

  return (
    <KeyboardAvoidingView>
      <SafeBottomAreaView>
        <Container>
          <TableContainer>
            {/* 필터 */}
            <TableFilters
              filterList={[entireFilterObj, ...existAbsenceFilters]}
              categoryFilters={categoryFilters}
              getTableList={getFilteredFoodList}
              setCheckedList={setCheckedList}
              foodList={favoriteFoods}
            />
            <TableHeader title='식료품 목록' columnTitle='냉장고' />

            {/* 자주 먹는 식료품 목록 */}
            <TableBody
              title='자주 먹는 식료품'
              list={filteredList}
              onCheckBoxPress={onCheckBoxPress}
              checkedList={checkedList}
              animationState={animationState}
              afterAnimation={() =>
                afterAnimation(onDeletePress, favoriteFoods)
              }
            />

            {/* 식료품 선택 개수와 버튼 */}
            <TableFooter
              list={checkedList}
              entireChecked={allChecked && !!checkedList.length}
              onEntirePress={() => onEntireBoxPress(filteredList)}
            >
              <SquareBtn
                name='장보기 목록 추가'
                icon='cart'
                disabled={checkedList.length === 0}
                onPress={onAddShoppingListPress}
              />
              <SquareBtn
                name='자주 먹는 식료품 해제'
                icon='tag-minus'
                disabled={checkedList.length === 0}
                onPress={() =>
                  onDeletePress(
                    favoriteFoods,
                    setAnimationState,
                    animationState
                  )
                }
              />
            </TableFooter>
          </TableContainer>

          {/* 인풋 */}
          <View>
            <TextInputRoundedBox
              value={inputValue}
              setValue={setInputValue}
              iconName='plus'
              placeholder='자주 먹는 식료품을 추가하세요.'
              onSubmitEditing={onSubmitEditing}
              disabled={inputValue === '' || category === ''}
            >
              <InputCategoryBtn
                category={category}
                setCategoryOpen={setCategoryOpen}
              />
            </TextInputRoundedBox>

            <Animated.View
              style={{
                height,
                opacity: interpolatedOpacity,
                paddingLeft: 12,
              }}
            >
              {showCaution &&
                (findFavoriteListItem(inputValue) ? (
                  <Message
                    message='이미 목록에 있는 식료품이에요.'
                    color='orange'
                  />
                ) : (
                  category === '' && (
                    <Message
                      message='카테고리를 설정해주세요.'
                      color='orange'
                    />
                  )
                ))}
            </Animated.View>
          </View>

          {categoryOpen && (
            <CategoryModal
              modalVisible={categoryOpen}
              setModalVisible={setCategoryOpen}
              currentChecked={category}
              onCheckBoxPress={onCategoryCheckBoxPress}
            />
          )}
        </Container>
      </SafeBottomAreaView>
    </KeyboardAvoidingView>
  );
}
