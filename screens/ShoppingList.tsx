import { FlatList, View } from 'react-native';
import {
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from '../components/native-component';
import { useSelector } from '../redux/hook';
import { GRAY, INDIGO } from '../constant/colors';
import { Food } from '../constant/foods';
import RecommendedFoods from '../components/screen-component/shopping-list/RecommendedFoods';
import TextInputToAddList from '../components/screen-component/shopping-list/TextInputToAddList';
import TableLabel from '../components/common/TableLabel';
import TableItem from '../components/common/TableItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddSelectFoodModal from '../components/modal/AddSelectFoodModal';
import FixedBtn from '../components/common/FixedBtn';
import useCheckFood from '../hooks/useCheckFood';
import useHandleCheckList from '../hooks/useHandleCheckList';
import useToggleModal from '../hooks/useToggleModal';
import ExistFoodMark from '../components/common/ExistFoodMark';
import TableTotalItem from '../components/common/TableTotalItem';
import tw from 'twrnc';

export default function ShoppingList() {
  const { shoppingList } = useSelector((state) => state.shoppingList);

  const { checkExistFood } = useCheckFood();
  const { modalVisible, setModalVisible, onModalPress } = useToggleModal();
  const {
    entireCheck,
    setEntireCheck,
    checkList,
    setCheckList,
    onDeleteListPress,
    onEntirePress,
    onExistFoodPress,
  } = useHandleCheckList();

  const addToFridgePress = (food: Food) => {
    checkExistFood(food)
      ? onExistFoodPress(food, onModalPress)
      : onModalPress(food);
  };

  return (
    <KeyboardAvoidingView>
      <Text styletw={`pb-2 px-4 text-lg`}>장보기 목록</Text>

      <RecommendedFoods />

      <View style={tw`flex-1 bg-white px-4`}>
        <TableLabel title='식료품' label='냉장고 추가' />
        {shoppingList.length !== 0 ? (
          <FlatList
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            data={shoppingList}
            renderItem={({ item }) => (
              <TableItem
                key={item.name}
                food={item}
                checkList={checkList}
                setCheckList={setCheckList}
                setEntireCheck={setEntireCheck}
              >
                <View style={tw`flex-row items-center`}>
                  <ExistFoodMark exist={!!checkExistFood(item)} />
                  <TouchableOpacity
                    style={tw`py-2 pl-2`}
                    onPress={() => addToFridgePress(item)}
                  >
                    <Icon
                      name='plus'
                      size={22}
                      color={checkExistFood(item) ? GRAY : INDIGO}
                    />
                  </TouchableOpacity>
                </View>
              </TableItem>
            )}
          />
        ) : (
          <Text styletw='text-slate-500 text-center mt-22'>
            아직 장보기 목록이 없습니다.
          </Text>
        )}
      </View>

      {!!shoppingList.length && (
        <TableTotalItem
          label={`장보기 목록 : 총 ${shoppingList.length}개`}
          onEntirePress={() => onEntirePress(shoppingList)}
          list={shoppingList}
          entireCheck={entireCheck}
        />
      )}

      {!!checkList.length && (
        <FixedBtn
          btnName='장보기 리스트에서 삭제'
          onDeletePress={onDeleteListPress}
          listLength={checkList.length}
        />
      )}

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
