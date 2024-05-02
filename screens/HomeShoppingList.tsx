import { useRef } from 'react';
import { KeyboardAvoidingView } from '../components/common/native-component';
import { useSelector } from '../redux/hook';
import { FlatList, View } from 'react-native';
import { closeKeyboard, scrollToIndex } from '../util';
import { useHandleTableFooterBtns, useSubmitFoodsFromInput } from '../hooks';
import { NAME_MAX_LENGTH } from '../constant/foodInfo';
import { SafeAreaView } from 'react-native-safe-area-context';

import AddShoppingListFoodModal from '../screen-component/modal/AddShoppingListFoodModal';
import Container from '../components/common/Container';
import TableBody from '../components/table/TableBody';
import TableSelectedHandleBox from '../components/table/TableSelectedHandleBox';
import TextInputRoundedBox from '../components/common/TextInputRoundedBox';
import SquareIconBtn from '../components/buttons/SquareIconBtn';
import TableFooterContainer from '../components/table/TableFooterContainer';
import AddAtOnceModal from '../screen-component/modal/AddAtOnceModal';
import FormMessage from '../components/form/FormMessage';
import HomeHeader from '../screen-component/home/HomeHeader';
import HeaderIconBtn from '../components/buttons/HeaderIconBtn';
import RecommendationFoodList from '../components/form/RecommendationFoodList';
import tw from 'twrnc';

export default function HomeShoppingList() {
  const { checkedList } = useSelector((state) => state.checkedList);
  const { shoppingList } = useSelector((state) => state.shoppingList);

  const flatListRef = useRef<FlatList | null>(null);

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

  const onMatchedFoodPress = (name: string) => setInputValue(name);

  return (
    <SafeAreaView edges={[]} style={tw`flex-1`}>
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
        </Container>

        <TableFooterContainer color='stone'>
          <View style={tw`px-4`}>
            <TextInputRoundedBox
              value={inputValue}
              setValue={setInputValue}
              placeholder='식료품 이름을 작성해주세요'
              onSubmitEditing={onSubmitEditing}
              disabled={inputValue === '' || existCaution}
            />
            {checkedList.length === 0 && (
              <View style={tw`absolute bottom-14 mx-3 w-full`}>
                <RecommendationFoodList
                  name={inputValue}
                  onPress={onMatchedFoodPress}
                />
              </View>
            )}
          </View>

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

          {!checkedList.length && (
            <>
              <View
                style={tw.style(`pl-6 ${existCaution ? 'py-0.5 pb-1.5' : ''}`, {
                  marginTop: existCaution ? -14 : 0,
                })}
              >
                <FormMessage
                  active={existCaution}
                  message='이미 목록에 있는 식료품이에요'
                  color='orange'
                />
              </View>

              <View
                style={tw.style(
                  `pl-6 ${
                    inputValue.length >= NAME_MAX_LENGTH ? 'py-0.5 pb-1.5' : ''
                  }`,
                  {
                    marginTop: inputValue.length >= NAME_MAX_LENGTH ? -14 : 0,
                  }
                )}
              >
                <FormMessage
                  active={inputValue.length >= NAME_MAX_LENGTH}
                  message={`식료품 이름은 ${NAME_MAX_LENGTH}자를 넘을 수 없어요`}
                  color='orange'
                />
              </View>
            </>
          )}
        </TableFooterContainer>
      </KeyboardAvoidingView>

      <AddShoppingListFoodModal />

      <AddAtOnceModal />
    </SafeAreaView>
  );
}
