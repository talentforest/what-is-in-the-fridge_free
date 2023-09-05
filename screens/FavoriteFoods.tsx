import { useDispatch, useSelector } from '../redux/hook';
import { useCallback, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeBottomAreaView,
  Text,
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

import Container from '../components/common/Container';
import TableContainer from '../components/table/TableContainer';
import TableHeader from '../components/table/TableHeader';
import TableFilters from '../components/table/TableFilters';
import TableBody from '../components/table/TableBody';
import TableFooter from '../components/table/TableFooter';
import TextInputRoundedBox from '../components/common/TextInputRoundedBox';
import FormItemDetailModal from '../screen-component/modal/FormItemDetailModal';
import InputCategoryBtn from '../components/buttons/InputCategoryBtn';
import Message from '../components/form/Message';
import tw from 'twrnc';
import { useFocusEffect } from '@react-navigation/native';
import { changeFilter } from '../redux/slice/filterSlice';

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

  const { checkedList, setCheckedList, onCheckBoxPress, onEntireBoxPress } =
    useHandleCheckList();

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
      setCategory,
      setShowCaution
    );
    setAnimationState('slidedown-in');
  };

  const filteredList = getFilteredFoodList(currentFilter, favoriteFoods);

  return (
    <KeyboardAvoidingView>
      <SafeBottomAreaView>
        <Container>
          {/* 필터 */}
          <TableFilters
            filterList={[entireFilterObj, ...existAbsenceFilters]}
            categoryFilters={categoryFilters}
            getTableList={getFilteredFoodList}
            setCheckedList={setCheckedList}
            foodList={favoriteFoods}
          />

          <TableContainer color='indigo'>
            <TableHeader
              title='자주 먹는 식료품'
              entireChecked={
                checkedList.length === filteredList.length &&
                !!checkedList.length
              }
              onEntirePress={() => onEntireBoxPress(filteredList)}
              color='indigo'
              length={filteredList.length}
            >
              <Text style={tw`text-slate-600 w-14 text-center text-sm`}>
                카테고리
              </Text>
              <Text style={tw`text-slate-600 text-sm`}>유무</Text>
            </TableHeader>

            {/* 자주 먹는 식료품 목록 */}
            <TableBody
              title='자주 먹는 식료품'
              color='indigo'
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
              onAddPress={onAddShoppingListPress}
              onDeletePress={() =>
                onDeletePress(favoriteFoods, setAnimationState, animationState)
              }
              buttons={['delete-favorite', 'add-shopping-list']}
              color='indigo'
            />
          </TableContainer>

          {/* 인풋 */}
          <View>
            <TextInputRoundedBox
              value={inputValue}
              setValue={setInputValue}
              iconName='plus'
              placeholder='자주 먹는 식료품을 추가하세요.'
              onSubmitEditing={onSubmitEditing}
              iconActive={inputValue !== '' && category !== ''}
            >
              <InputCategoryBtn
                category={category}
                setCategoryOpen={setCategoryOpen}
              />
            </TextInputRoundedBox>

            {inputValue !== '' && (
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
            )}
          </View>
          {categoryOpen && (
            <FormItemDetailModal
              modalVisible={categoryOpen}
              setModalVisible={setCategoryOpen}
              title='카테고리 선택'
              currentChecked={category}
              onCheckBoxPress={onCategoryCheckBoxPress}
            />
          )}
        </Container>
      </SafeBottomAreaView>
    </KeyboardAvoidingView>
  );
}
