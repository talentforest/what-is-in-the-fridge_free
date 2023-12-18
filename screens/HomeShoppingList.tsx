import { useEffect, useRef } from 'react';
import { KeyboardAvoidingView } from '../components/common/native-component';
import { useDispatch, useSelector } from '../redux/hook';
import { FlatList, View } from 'react-native';
import { closeKeyboard, scrollToIndex } from '../util';
import { useHandleTableFooterBtns, useSubmitFoodsFromInput } from '../hooks';
import { setCheckedList } from '../redux/slice/food-list/checkListSlice';
import { NAME_MAX_LENGTH } from '../constant/foodInfo';
import { SafeAreaView } from 'react-native-safe-area-context';

import AddShoppingListFoodModal from '../screen-component/modal/AddShoppingListFoodModal';
import Container, { BG_COLOR } from '../components/common/Container';
import TableBody from '../components/table/TableBody';
import TableSelectedHandleBox from '../components/table/TableSelectedHandleBox';
import TextInputRoundedBox from '../components/common/TextInputRoundedBox';
import SquareIconBtn from '../components/buttons/SquareIconBtn';
import TableFooterContainer from '../components/table/TableFooterContainer';
import AddAtOnceModal from '../screen-component/modal/AddAtOnceModal';
import FormMessage from '../components/form/FormMessage';
import HomeHeader from '../screen-component/home/HomeHeader';
import HeaderIconBtn from '../components/buttons/HeaderIconBtn';
import tw from 'twrnc';

export default function HomeShoppingList() {
  const { shoppingList } = useSelector((state) => state.shoppingList);

  const flatListRef = useRef<FlatList | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setCheckedList([]));
    };
  }, []);

  const { onDeleteBtnPress, onAddAtOnceBtnPress } = useHandleTableFooterBtns();

  const {
    existCaution,
    inputValue,
    setInputValue,
    onSubmitShoppingListItem, //
  } = useSubmitFoodsFromInput();

  const onSubmitEditing = () => {
    if (inputValue === '') return closeKeyboard();
    onSubmitShoppingListItem(inputValue);
    setInputValue('');
    scrollToIndex(flatListRef, shoppingList.length - 1);
  };

  return (
    <SafeAreaView edges={['bottom']} style={tw`${BG_COLOR} flex-1`}>
      <KeyboardAvoidingView>
        <Container>
          <HomeHeader title='장볼게 뭐가 있지'>
            <HeaderIconBtn iconName='star-fill' />
          </HomeHeader>

          <TableBody
            title='장볼 식료품'
            foodList={shoppingList}
            flatListRef={flatListRef}
          />

          <TableFooterContainer>
            <TableSelectedHandleBox foodList={shoppingList}>
              <SquareIconBtn
                btnName='한번에 추가'
                icon='shape-square-rounded-plus'
                onPress={onAddAtOnceBtnPress}
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
              placeholder='식료품 이름을 작성해주세요'
              onSubmitEditing={onSubmitEditing}
              disabled={inputValue === '' || existCaution}
            />

            <View
              style={{
                marginTop: existCaution ? -14 : 0,
                marginLeft: 6,
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

          <AddShoppingListFoodModal />

          <AddAtOnceModal />
        </Container>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
