import { useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableOpacity,
} from '../components/common/native-component';
import { Alert, FlatList, View } from 'react-native';
import { useSelector } from '../redux/hook';
import { useFocusEffect } from '@react-navigation/native';
import {
  useGetFoodList,
  useHandleCheckList,
  useHandleTableItem,
  useSetAnimationState,
  useHandleFilter,
} from '../hooks';
import { foodCategories } from '../constant/foodCategories';
import { entireFilterObj, favoriteFilterObj } from '../util';
import { MAX_LIST_LENGTH, alertExcess } from '../components/buttons/AddFoodBtn';

import Container from '../components/common/Container';
import TableContainer from '../components/table/TableContainer';
import TableHeader from '../components/table/TableHeader';
import PantryListBox from '../screen-component/pantry-foods/PantryListBox';
import AddPantryFoodModal from '../screen-component/modal/AddPantryFoodModal';
import TableFooter from '../components/table/TableFooter';
import SquareBtn from '../components/buttons/SquareBtn';
import Icon from '../components/common/native-component/Icon';
import TableFilters from '../components/table/TableFilters';
import EmptySign from '../components/common/EmptySign';
import tw from 'twrnc';

export default function PantryFoods() {
  const { pantryFoods } = useSelector((state) => state.pantryFoods);
  const [modalVisible, setModalVisible] = useState(false);

  const { currentFilter, initializeFilter } = useHandleFilter();
  const { getFilteredFoodList } = useGetFoodList();

  const {
    checkedList,
    setCheckedList,
    onCheckBoxPress,
    onEntireBoxPress, //
  } = useHandleCheckList();

  const { onDeletePress, onAddShoppingListPress } = useHandleTableItem({
    checkedList,
    setCheckedList,
    setModalVisible,
  });

  useFocusEffect(
    useCallback(() => {
      initializeFilter();
      return () => {
        initializeFilter();
        setCheckedList([]);
      };
    }, [])
  );

  const {
    animationState,
    setAnimationState,
    afterAnimation, //
  } = useSetAnimationState();

  const allChecked = checkedList.length === pantryFoods.length;

  const filteredList = getFilteredFoodList(currentFilter, pantryFoods);

  return (
    <KeyboardAvoidingView>
      <Container>
        <TableContainer>
          <TableHeader
            title='팬트리 식료품'
            length={filteredList.length}
            entireChecked={allChecked && !!checkedList.length}
            onEntirePress={() => onEntireBoxPress(pantryFoods)}
          />

          <TableFilters
            filterList={[entireFilterObj, favoriteFilterObj]}
            categoryFilters={foodCategories}
            getTableList={getFilteredFoodList}
            setCheckedList={setCheckedList}
            foodList={pantryFoods}
          />

          <View style={tw`flex-1 mb-4 -mx-2`}>
            {!!filteredList.length && (
              <FlatList
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                style={tw`flex-1 w-full`}
                contentContainerStyle={tw`pb-20`}
                data={filteredList}
                renderItem={({ item }) => (
                  <PantryListBox
                    key={item.id}
                    food={item}
                    onCheckBoxPress={onCheckBoxPress}
                    isCheckedItem={
                      !!checkedList.find((food) => food.id === item.id)
                    }
                    animationState={animationState}
                    afterAnimation={() =>
                      afterAnimation(onDeletePress, pantryFoods)
                    }
                  />
                )}
              />
            )}

            {!filteredList.length && (
              <View
                style={tw`flex-1 -mx-2 pt-20 px-8 border-t border-slate-300`}
              >
                <EmptySign
                  message={`${
                    currentFilter === '전체'
                      ? ''
                      : `${currentFilter} 카테고리의, `
                  } 팬트리 식료품이 없어요.`}
                />
              </View>
            )}

            <TouchableOpacity
              onPress={() => {
                if (pantryFoods.length === MAX_LIST_LENGTH) {
                  Alert.alert(alertExcess.title, alertExcess.msg);
                } else {
                  setModalVisible(true);
                }
              }}
              style={tw`absolute -bottom-0 right-2 self-end h-18 w-18 items-center justify-center shadow-md bg-blue-100 rounded-full`}
            >
              <Icon type='MaterialCommunityIcons' name='plus' size={30} />
            </TouchableOpacity>
          </View>

          <TableFooter list={checkedList}>
            <SquareBtn
              name='장보기 추가'
              icon='cart'
              disabled={checkedList.length === 0}
              onPress={onAddShoppingListPress}
            />
            <SquareBtn
              name='팬트리에서 삭제'
              icon='trash-can'
              disabled={checkedList.length === 0}
              onPress={() => {
                onDeletePress(pantryFoods, setAnimationState, animationState);
              }}
            />
          </TableFooter>
        </TableContainer>

        {modalVisible && (
          <AddPantryFoodModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        )}
      </Container>
    </KeyboardAvoidingView>
  );
}
