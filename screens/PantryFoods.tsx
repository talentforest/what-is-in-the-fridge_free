import { useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableOpacity,
} from '../components/common/native-component';
import { Alert, View } from 'react-native';
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
import { alertPhrase } from '../constant/alertPhrase';
import { MAX_LIST_LENGTH } from '../components/buttons/AddFoodBtn';

import Container from '../components/common/Container';
import TableContainer from '../components/table/TableContainer';
import TableHeader from '../components/table/TableHeader';
import AddPantryFoodModal from '../screen-component/modal/AddPantryFoodModal';
import TableFooter from '../components/table/TableFooter';
import SquareBtn from '../components/buttons/SquareIconBtn';
import Icon from '../components/common/native-component/Icon';
import TableCategorizedBody from '../components/table/TableCategorizedBody';
import TableFilters from '../components/table/TableFilters';
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

  const { onDeleteFoodPress } = useHandleTableItem({
    checkedList,
    setCheckedList,
    setModalVisible,
  });

  useFocusEffect(
    useCallback(() => {
      initializeFilter();
      return () => {
        setCheckedList([]); // unfocus시 빈배열
        initializeFilter();
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
          <TableFilters
            filterList={[entireFilterObj, favoriteFilterObj]}
            categoryFilters={foodCategories}
            getTableList={getFilteredFoodList}
            setCheckedList={setCheckedList}
            foodList={pantryFoods}
          />

          <TableHeader title='팬트리 식료품' length={filteredList.length} />

          <View style={tw`flex-1 -mb-2`}>
            <TableCategorizedBody
              onCheckBoxPress={onCheckBoxPress}
              checkedList={checkedList}
              animationState={animationState}
              afterAnimation={() =>
                afterAnimation(onDeleteFoodPress, pantryFoods)
              }
            />

            <TouchableOpacity
              onPress={() => {
                if (pantryFoods.length === MAX_LIST_LENGTH) {
                  Alert.alert(alertPhrase.excess.title, alertPhrase.excess.msg);
                } else {
                  setModalVisible(true);
                }
              }}
              style={tw`absolute bottom-5 right-2 self-end h-18 w-18 items-center justify-center shadow-md bg-blue-100 rounded-full`}
            >
              <Icon type='MaterialCommunityIcons' name='plus' size={30} />
            </TouchableOpacity>
          </View>

          <TableFooter
            list={checkedList}
            entireChecked={allChecked && !!checkedList.length}
            onEntirePress={() => onEntireBoxPress(filteredList)}
          >
            <SquareBtn
              icon='trash-can'
              disabled={checkedList.length === 0}
              onPress={() => {
                onDeleteFoodPress(
                  setAnimationState,
                  animationState,
                  pantryFoods
                );
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
