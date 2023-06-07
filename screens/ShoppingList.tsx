import { View } from 'react-native';
import {
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  SafeBottomAreaView,
} from '../components/native-component';
import { useSelector } from '../redux/hook';
import { DEEP_INDIGO, INDIGO } from '../constant/colors';
import { Food } from '../constant/foods';
import TextInputToAddList from '../components/screen-component/shopping-list/TextInputToAddList';
import TableLabel from '../components/common/TableLabel';
import TableItem from '../components/common/TableItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddSelectFoodModal from '../components/modal/AddSelectFoodModal';
import FixedBtn from '../components/common/FixedBtn';
import useCheckFood from '../hooks/useCheckFood';
import useHandleCheckList from '../hooks/useHandleCheckList';
import useToggleModal from '../hooks/useToggleModal';
import TableTotalItem from '../components/common/TableTotalItem';
import TableContainer from '../components/common/TableContainer';
import tw from 'twrnc';

export default function ShoppingList() {
  const { shoppingList } = useSelector((state) => state.shoppingList);

  const {
    entireCheck,
    checkList,
    onDeletePress,
    onEntirePress,
    onExistFoodPress,
    onCheckPress,
    existInList,
  } = useHandleCheckList();

  const { checkExistFood } = useCheckFood();
  const { modalVisible, setModalVisible, onModalPress } = useToggleModal();

  const addToFridgePress = (food: Food) => {
    checkExistFood(food)
      ? onExistFoodPress(food, onModalPress)
      : onModalPress(food);
  };

  return (
    <KeyboardAvoidingView>
      <Text styletw={`pb-2 px-4 text-lg`}>장보기 목록</Text>

      <View style={tw`mx-4 flex-1`}>
        <View
          style={tw`flex-1 px-4 bg-white rounded-lg border border-slate-300`}
        >
          <TableLabel title='식료품' label='냉장고 추가' />
          {shoppingList.length !== 0 ? (
            <TableContainer
              list={shoppingList}
              renderItem={({ item }) => (
                <TableItem
                  key={item.name}
                  food={item}
                  onCheckPress={onCheckPress}
                  existInList={existInList}
                >
                  <TouchableOpacity
                    style={tw`pl-2`}
                    onPress={() => addToFridgePress(item)}
                  >
                    <Icon
                      name='plus'
                      size={22}
                      color={checkExistFood(item) ? INDIGO : DEEP_INDIGO}
                    />
                  </TouchableOpacity>
                </TableItem>
              )}
            />
          ) : (
            <Text styletw='text-slate-500 text-center mt-22 flex-1'>
              아직 장보기 목록이 없습니다.
            </Text>
          )}
          <TableTotalItem
            onEntirePress={() => onEntirePress(shoppingList)}
            list={shoppingList}
            entireCheck={entireCheck}
          />
        </View>

        {!!checkList.length && (
          <FixedBtn
            btnName='장보기 리스트에서 삭제'
            onDeletePress={() => onDeletePress(shoppingList)}
            listLength={checkList.length}
          />
        )}
      </View>
      <TextInputToAddList />

      {modalVisible && (
        <AddSelectFoodModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </KeyboardAvoidingView>
  );
}
