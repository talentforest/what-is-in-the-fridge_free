import { useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeBottomAreaView,
  Text,
} from '../components/native-component';
import { useSelector } from '../redux/hook';
import { useDispatch } from 'react-redux';
import { Food } from '../constant/foods';
import { setAllFoods } from '../redux/slice/allFoodsSlice';
import { setFavoriteList } from '../redux/slice/favoriteFoodsSlice';
import { Category } from '../constant/foodCategories';
import { categoryFilters, entireFilterObj, existAbsenceFilters } from '../util';

import useHandleTableItem from '../hooks/useHandleTableItem';
import useHandleCheckList from '../hooks/useHandleCheckList';
import useFavoriteFoods from '../hooks/useFavoriteFoods';
import useTableItemFilter from '../hooks/useTableItemFilter';

import Container from '../components/common/Container';
import TableContainer from '../components/common/table/TableContainer';
import TableHeader from '../components/common/table/TableHeader';
import TableFilters from '../components/common/table/TableFilters';
import TableBody from '../components/common/table/TableBody';
import TableFooter from '../components/common/table/TableFooter';
import TextInputRoundedBox from '../components/common/TextInputRoundedBox';
import FormItemDetailModal from '../components/screen-component/modal/FormItemDetailModal';
import InputCategoryBtn from '../components/common/buttons/InputCategoryBtn';
import tw from 'twrnc';

export default function FavoriteFoods() {
  const [inputValue, setInputValue] = useState('');
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [category, setCategory] = useState<Category | ''>('');

  const { allFoods } = useSelector((state) => state.allFoods);

  const { favoriteFoods, onSubmitFavoriteListItem } = useFavoriteFoods();

  const dispatch = useDispatch();

  const {
    currentFilter,
    changeFilter,
    getFavoriteTableList, //
  } = useTableItemFilter();

  const {
    checkedList,
    setCheckedList,
    onCheckBoxPress,
    isCheckedItem,
    onEntireBoxPress,
    checkedFoodNameList,
  } = useHandleCheckList();

  const changeFavStateInList = () => {
    return allFoods.map((food) => {
      const isFavoriteFood = checkedList.some(
        (item) => item.name === food.name
      );
      return isFavoriteFood ? { ...food, favorite: false } : food;
    });
  };

  const deleteAlertGuide = {
    title: '자주 먹는 식료품 해제',
    desc: `총 ${checkedList.length}개의 식료품(${checkedFoodNameList})을 자주 먹는 식료품에서 해제하시겠습니까?`,
    defaultBtnText: '해제',
    onPress: (filteredArr: Food[]) => {
      dispatch(setAllFoods(changeFavStateInList()));
      dispatch(setFavoriteList(filteredArr));
    },
  };

  const { onDeletePress, onAddShoppingListPress } = useHandleTableItem({
    deleteAlertGuide,
    checkedList,
    setCheckedList,
  });

  const onCategoryCheckBoxPress = (category: Category) => {
    setCategory(category);
    setCategoryOpen(false);
  };

  const favoriteTableList = getFavoriteTableList(currentFilter);

  return (
    <KeyboardAvoidingView>
      <SafeBottomAreaView>
        <Container>
          {/* 필터 */}
          <TableFilters
            filterList={[
              entireFilterObj,
              ...existAbsenceFilters,
              ...categoryFilters,
            ]}
            currentFilter={currentFilter}
            changeFilter={changeFilter}
            getTableList={getFavoriteTableList}
            setCheckedList={setCheckedList}
          />
          <TableContainer color='indigo'>
            <TableHeader
              title='자주 먹는 식료품'
              entireChecked={
                checkedList.length === favoriteTableList.length &&
                !!checkedList.length
              }
              onEntirePress={() => onEntireBoxPress(favoriteTableList)}
              color='indigo'
            >
              <Text style={tw`text-slate-600 w-9 text-center text-sm`}>
                종류
              </Text>
              <Text style={tw`text-slate-600 text-sm`}>유무</Text>
            </TableHeader>

            {/* 자주 먹는 식료품 목록 */}
            <TableBody
              color='indigo'
              list={favoriteTableList}
              onCheckBoxPress={onCheckBoxPress}
              isCheckedItem={isCheckedItem}
            />

            {/* 식료품 선택 개수와 버튼 */}
            <TableFooter
              list={checkedList}
              onAddPress={onAddShoppingListPress}
              onDeletePress={() => onDeletePress(favoriteFoods)}
              buttons={['delete-favorite', 'add-shopping-list']}
              color='indigo'
            />
          </TableContainer>

          {/* 인풋 */}
          <TextInputRoundedBox
            value={inputValue}
            setValue={setInputValue}
            iconName='plus'
            placeholder='자주 먹는 식료품을 추가하세요.'
            onSubmitEditing={() =>
              onSubmitFavoriteListItem(
                inputValue,
                category,
                setInputValue,
                setCategory
              )
            }
          >
            <InputCategoryBtn
              value={inputValue}
              category={category}
              setCategoryOpen={setCategoryOpen}
            />
          </TextInputRoundedBox>
        </Container>
      </SafeBottomAreaView>

      {categoryOpen && (
        <FormItemDetailModal
          modalVisible={categoryOpen}
          setModalVisible={setCategoryOpen}
          title='카테고리 선택'
          currentChecked={category}
          onCheckBoxPress={onCategoryCheckBoxPress}
        />
      )}
    </KeyboardAvoidingView>
  );
}
