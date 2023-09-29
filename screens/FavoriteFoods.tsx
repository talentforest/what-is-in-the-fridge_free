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
  useSubmitFoodsFromInput,
  useGetFoodList,
  useFindFood,
  useHandleFilter,
} from '../hooks';

import Container from '../components/common/Container';
import TableCategorizedBody from '../components/table/TableCategorizedBody';
import TableContainer from '../components/table/TableContainer';
import TableFilters from '../components/table/TableFilters';
import TableFooter from '../components/table/TableFooter';
import TextInputRoundedBox from '../components/common/TextInputRoundedBox';
import CategoryModal from '../screen-component/modal/CategoryModal';
import InputCategoryBtn from '../components/buttons/InputCategoryBtn';
import FormMessage from '../components/form/FormMessage';
import SquareIconBtn from '../components/buttons/SquareIconBtn';
import tw from 'twrnc';

export default function FavoriteFoods() {
  const [inputValue, setInputValue] = useState('');
  const [showCaution, setShowCaution] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [category, setCategory] = useState<Category>('신선식품류');

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
    active: showCaution,
  });

  const { animationState, setAnimationState, afterAnimation } =
    useSetAnimationState();

  const { onAddShoppingListBtnPress, onDeleteFoodPress } = useHandleTableItem({
    checkedList,
    setCheckedList,
  });

  useEffect(() => {
    if (inputValue === '') {
      setShowCaution(false);
    }
  }, [inputValue]);

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
  };

  const filteredList = getFilteredFoodList(currentFilter, favoriteFoods);

  const allChecked = checkedList.length === filteredList.length;

  return (
    <KeyboardAvoidingView>
      <SafeBottomAreaView>
        <Container>
          <TableContainer>
            <TableFilters
              filterList={[entireFilterObj, ...existAbsenceFilters]}
              categoryFilters={foodCategories}
              getTableList={getFilteredFoodList}
              setCheckedList={setCheckedList}
              foodList={favoriteFoods}
            />

            <TableCategorizedBody
              onCheckBoxPress={onCheckBoxPress}
              checkedList={checkedList}
              animationState={animationState}
              afterAnimation={() =>
                afterAnimation(onDeleteFoodPress, favoriteFoods)
              }
            />

            <View style={tw`-my-3`}>
              <TableFooter
                list={checkedList}
                entireChecked={allChecked && !!checkedList.length}
                onEntirePress={() => onEntireBoxPress(filteredList)}
              >
                <SquareIconBtn
                  icon='tag-minus'
                  disabled={checkedList.length === 0}
                  onPress={() =>
                    onDeleteFoodPress(
                      setAnimationState,
                      animationState,
                      favoriteFoods
                    )
                  }
                />
                <SquareIconBtn
                  icon='basket-plus'
                  disabled={checkedList.length === 0}
                  onPress={onAddShoppingListBtnPress}
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
              disabled={inputValue === ''}
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
              {showCaution && isFavoriteItem(inputValue) && (
                <FormMessage
                  message='이미 목록에 있는 식료품이에요.'
                  color='orange'
                />
              )}
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
