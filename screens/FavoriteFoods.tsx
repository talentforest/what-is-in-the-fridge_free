import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeBottomAreaView,
} from '../components/common/native-component';
import { Category, foodCategories } from '../constant/foodCategories';
import { entireFilterObj, existAbsenceFilters } from '../util';
import { Animated, View } from 'react-native';
import {
  useHandleTableItem,
  useSlideAnimation,
  useSetAnimationState,
  useHandleCheckList,
  useSubmitFavoriteFoods,
  useGetFoodList,
  useFindFood,
  useHandleFilter,
} from '../hooks';
import { Food } from '../constant/foodInfo';

import Container from '../components/common/Container';
import TableContainer from '../components/table/TableContainer';
import TableHeader from '../components/table/TableHeader';
import TableFilters from '../components/table/TableFilters';
import TableBody from '../components/table/TableBody';
import TableFooter from '../components/table/TableFooter';
import TextInputRoundedBox from '../components/common/TextInputRoundedBox';
import CategoryModal from '../screen-component/modal/CategoryModal';
import InputCategoryBtn from '../components/buttons/InputCategoryBtn';
import FormMessage from '../components/form/FormMessage';
import SquareBtn from '../components/buttons/SquareBtn';
import tw from 'twrnc';

export default function FavoriteFoods() {
  const { currentFilter, initializeFilter } = useHandleFilter();
  const [inputValue, setInputValue] = useState('');
  const [showCaution, setShowCaution] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [category, setCategory] = useState<Category | ''>('');

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
    checkedList: checkedList as Food[],
    setCheckedList,
  });

  useEffect(() => {
    initializeFilter();
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
            <TableHeader
              title='자주 먹는 식료품'
              entireChecked={allChecked && !!checkedList.length}
              onEntirePress={() => onEntireBoxPress(filteredList)}
            />

            {/* 필터 */}
            <TableFilters
              filterList={[entireFilterObj, ...existAbsenceFilters]}
              categoryFilters={foodCategories}
              getTableList={getFilteredFoodList}
              setCheckedList={setCheckedList}
              foodList={favoriteFoods}
            />

            {/* 자주 먹는 식료품 목록 */}
            <TableBody
              title='자주 먹는 식료품'
              list={filteredList}
              onCheckBoxPress={onCheckBoxPress}
              checkedList={checkedList as Food[]}
              animationState={animationState}
              afterAnimation={() =>
                afterAnimation(onDeletePress, favoriteFoods)
              }
            />

            {/* 식료품 선택 개수와 버튼 */}
            <View>
              <TableFooter list={checkedList as Food[]}>
                <SquareBtn
                  name='장보기 추가'
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
            </View>
          </TableContainer>

          <View style={tw`mt-2`}>
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
                  <FormMessage
                    message='이미 목록에 있는 식료품이에요.'
                    color='orange'
                  />
                ) : (
                  category === '' && (
                    <FormMessage
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
