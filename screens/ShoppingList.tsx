import { View } from 'react-native';
import {
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from '../components/native-component';
import { useSelector } from '../redux/hook';
import { GRAY, INDIGO } from '../constant/colors';
import RecommendedFoods from '../components/screen-component/shopping-list/RecommendedFoods';
import TextInputToAddList from '../components/screen-component/shopping-list/TextInputToAddList';
import TableListContainer from '../components/common/TableListContainer';
import TableLabel from '../components/common/TableLabel';
import FoodListItem from '../components/common/FoodListItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddSelectFoodModal from '../components/modal/AddSelectFoodModal';
import FixedBtn from '../components/common/FixedBtn';
import useCheckFood from '../hooks/useCheckFood';
import useHandleCheckList from '../hooks/useHandleCheckList';
import useToggleModal from '../hooks/useToggleModal';
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

  return (
    <KeyboardAvoidingView>
      <Text styletw={`pb-2 px-4 text-lg`}>장보기 목록</Text>

      <RecommendedFoods />

      <TableListContainer
        onEntirePress={onEntirePress}
        entireCheck={entireCheck}
      >
        <TableLabel title='식료품' label='냉장고 추가' />
        {shoppingList.length === 0 ? (
          <Text styletw='text-center flex-1 mt-40 mb-4 text-slate-500'>
            장보기 식료품 정보가 없습니다.
          </Text>
        ) : (
          shoppingList.map((food) => (
            <FoodListItem
              key={food.name}
              food={food}
              checkList={checkList}
              setCheckList={setCheckList}
              setEntireCheck={setEntireCheck}
            >
              <View style={tw`flex-row items-center`}>
                {checkExistFood(food) && (
                  <View
                    style={tw`flex-row gap-1 items-center bg-indigo-50 border border-indigo-500 py-0.5 px-2 rounded-full`}
                  >
                    <Icon name='fridge' size={12} color={INDIGO} />
                    <Text styletw='text-[10px] text-indigo-700'>있음</Text>
                  </View>
                )}
                <TouchableOpacity
                  style={tw`py-2 pl-2`}
                  onPress={() => {
                    // 삭제 후 추가
                    checkExistFood(food)
                      ? onExistFoodPress(food, onModalPress)
                      : onModalPress(food);
                  }}
                >
                  <Icon
                    name='plus'
                    size={22}
                    color={checkExistFood(food) ? GRAY : INDIGO}
                  />
                </TouchableOpacity>
              </View>
            </FoodListItem>
          ))
        )}
      </TableListContainer>

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
