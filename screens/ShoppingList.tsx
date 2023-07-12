import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToShoppingList } from '../redux/slice/shoppingList';
import { View } from 'react-native';
import {
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from '../components/native-component';
import { useSelector } from '../redux/hook';
import { DEEP_INDIGO, INDIGO } from '../constant/colors';
import { Food, initialFoodInfo } from '../constant/foods';
import TableLabel from '../components/common/TableLabel';
import TableItem from '../components/common/TableItem';
import AddSelectFoodModal from '../components/modal/AddSelectFoodModal';
import useCheckFood from '../hooks/useCheckFood';
import useHandleCheckList from '../hooks/useHandleCheckList';
import useToggleModal from '../hooks/useToggleModal';
import TableTotalItem from '../components/common/TableTotalItem';
import TableContainer from '../components/common/TableContainer';
import Icon from '../components/native-component/Icon';
import TextInputBox from '../components/common/TextInputBox';
import UUIDGenerator from 'react-native-uuid';
import FavoriteListModal from '../components/modal/FavoriteListModal';
import SquareBtn from '../components/common/Buttons/SquareBtn';
import tw from 'twrnc';
import HeaderBtn from '../components/common/Buttons/HeaderBtn';

export default function ShoppingList() {
  const [keyword, setKeyword] = useState('');
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
  const navigation = useNavigation();
  const [listModal, setListModal] = useState(false);
  const { checkExistFood } = useCheckFood();
  const { modalVisible, setModalVisible, onModalPress } = useToggleModal();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderBtn
          iconName='heart-plus'
          onPress={() => setListModal((prev) => !prev)}
        />
      ),
    });
  }, []);

  const addToFridgePress = (food: Food) => {
    checkExistFood(food)
      ? onExistFoodPress(food, onModalPress)
      : onModalPress(food);
  };

  const dispatch = useDispatch();
  const myUuid = UUIDGenerator.v4();

  const onSubmitEditing = () => {
    if (keyword === '') return;
    dispatch(
      addToShoppingList({
        ...initialFoodInfo,
        id: myUuid as string,
        name: keyword,
      })
    );
    setKeyword('');
  };

  return (
    <KeyboardAvoidingView>
      <View style={tw`flex-1`}>
        <View
          style={tw`flex-1 px-4 bg-stone-50 rounded-sm border border-slate-300`}
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
                  image={false}
                >
                  <TouchableOpacity
                    style={tw`pl-2`}
                    onPress={() => addToFridgePress(item)}
                  >
                    <Icon
                      type='MaterialCommunityIcons'
                      name='plus'
                      size={22}
                      color={checkExistFood(item) ? INDIGO : DEEP_INDIGO}
                    />
                  </TouchableOpacity>
                </TableItem>
              )}
            />
          ) : (
            <Text style={tw`text-slate-500 text-center mt-22 flex-1`}>
              아직 장보기 목록이 없습니다.
            </Text>
          )}
          <TableTotalItem
            onEntirePress={() => onEntirePress(shoppingList)}
            list={shoppingList}
            entireCheck={entireCheck}
          />
        </View>

        {/* {!!checkList.length && (
          <View style={tw`gap-1 px-4 mt-4`}>
            <Text style={tw`text-slate-600`}>
              선택한 항목: {checkList.length}개
            </Text>
            <SquareBtn
              btnName='장보기 리스트에서 삭제'
              onPress={() => onDeletePress(shoppingList)}
            />
          </View>
        )} */}
      </View>

      <TextInputBox
        value={keyword}
        setValue={setKeyword}
        iconName='plus'
        placeholder='식료품 이름을 작성해주세요.'
        onSubmitEditing={onSubmitEditing}
      />

      {modalVisible && (
        <AddSelectFoodModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
      {listModal && (
        <FavoriteListModal
          modalVisible={listModal}
          setModalVisible={setListModal}
        />
      )}
    </KeyboardAvoidingView>
  );
}
