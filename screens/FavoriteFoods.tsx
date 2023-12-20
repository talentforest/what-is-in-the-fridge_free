import { useEffect, useRef } from 'react';
import { KeyboardAvoidingView } from '../components/common/native-component';
import { entireFilterObj, existAbsenceFilters, scrollToIndex } from '../util';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from '../redux/hook';
import { setCheckedList } from '../redux/slice/food-list/checkListSlice';
import {
  useHandleTableFooterBtns,
  useSubmitFoodsFromInput,
  useGetFoodList,
  useHandleFilter,
} from '../hooks';
import { changeCategory } from '../redux/slice/food/categorySlice';
import { NAME_MAX_LENGTH } from '../constant/foodInfo';
import { SafeAreaView } from 'react-native-safe-area-context';

import Container, { BG_COLOR } from '../components/common/Container';
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
import tw from 'twrnc';

export default function FavoriteFoods() {
  const { category } = useSelector((state) => state.category);

  const flatListRef = useRef<FlatList | null>(null);

  const { currentFilter, initializeFilter, diffCategory } = useHandleFilter();

  const {
    onAddShoppingListBtnPress,
    onDeleteBtnPress, //
  } = useHandleTableFooterBtns();

  const {
    inputValue,
    setInputValue,
    existCaution,
    onSubmitFavoriteListItem, //
  } = useSubmitFoodsFromInput();

  const { favoriteFoods, getFilteredFoodList } = useGetFoodList();

  const dispatch = useDispatch();

  useEffect(() => {
    initializeFilter();
    return () => {
      dispatch(changeCategory('신선식품류'));
      dispatch(setCheckedList([]));
    };
  }, []);

  const foodList = getFilteredFoodList(currentFilter, favoriteFoods);

  const onSubmitEditing = () => {
    onSubmitFavoriteListItem();
    // 카테고리별 필터일 때 카테고리 설정 정보가 다른 경우 스크롤 안하고 리턴
    if (diffCategory) return;
    scrollToIndex(flatListRef, foodList.length - 1);
  };

  return (
    <SafeAreaView edges={['bottom']} style={tw`${BG_COLOR} flex-1`}>
      <KeyboardAvoidingView>
        <Container>
          {favoriteFoods.length ? (
            <TableFilters
              filterTagList={[entireFilterObj, ...existAbsenceFilters]}
              foodList={favoriteFoods}
              withCategoryFilterTag
            />
          ) : (
            <></>
          )}

          <TableBody
            title='자주 먹는 식료품'
            foodList={foodList}
            flatListRef={flatListRef}
          />

          <TableFooterContainer>
            <TableSelectedHandleBox foodList={foodList}>
              <SquareIconBtn
                btnName='장보기 추가'
                icon='basket-plus-outline'
                onPress={onAddShoppingListBtnPress}
              />
              <SquareIconBtn
                btnName='삭제'
                icon='trash-can-outline'
                onPress={onDeleteBtnPress}
              />
            </TableSelectedHandleBox>

            <TextInputRoundedBox
              value={inputValue}
              setValue={setInputValue}
              placeholder='자주 먹는 식료품을 추가하세요'
              onSubmitEditing={onSubmitEditing}
              disabled={inputValue === '' || existCaution}
            >
              <InputCategoryBtn />
            </TextInputRoundedBox>

            <View
              style={{
                marginTop: existCaution ? -14 : 0,
                marginLeft: 6,
                marginBottom:
                  diffCategory && !!inputValue && existCaution ? 10 : 0,
              }}
            >
              <FormMessage
                active={existCaution}
                message='이미 목록에 있는 식료품이에요'
                color='orange'
              />
            </View>

            <View
              style={{
                marginTop: diffCategory && !!inputValue ? -14 : 0,
                marginLeft: 6,
              }}
            >
              <FormMessage
                active={diffCategory && !!inputValue}
                message={`${category} 카테고리에 저장됩니다`}
                color='green'
              />
            </View>

            <View
              style={{
                marginTop: inputValue.length >= NAME_MAX_LENGTH ? -14 : 0,
                marginLeft: 6,
              }}
            >
              <FormMessage
                active={inputValue.length >= NAME_MAX_LENGTH}
                message={`식료품 이름은 ${NAME_MAX_LENGTH}자를 넘을 수 없어요`}
                color='orange'
              />
            </View>
          </TableFooterContainer>

          <AlertModal />
        </Container>

        <CategoryModal />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
