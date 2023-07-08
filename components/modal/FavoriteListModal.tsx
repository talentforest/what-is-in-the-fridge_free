import { Text } from '../native-component';
import { LIGHT_GRAY, ORANGE_RED } from '../../constant/colors';
import { View } from 'react-native';
import { scaleH } from '../../util';
import { useState } from 'react';
import RNModal from './common/Modal';
import TableContainer from '../common/TableContainer';
import TableItem from '../common/TableItem';
import useHandleCheckList from '../../hooks/useHandleCheckList';
import useCheckFood from '../../hooks/useCheckFood';
import SquareBtn from '../common/Buttons/SquareBtn';
import useFavoriteFoods from '../../hooks/useFavoriteFoods';
import TabBtn from '../common/Buttons/TabBtn';
import tw from 'twrnc';
import FoodTag from '../common/Box/FoodBox';
import Icon from '../native-component/Icon';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}

type TabName = '냉장고에 없어요' | '냉장고에 있어요';

export default function FavoriteListModal({
  modalVisible,
  setModalVisible,
}: Props) {
  const [openTab, setOpenTab] = useState<TabName>('냉장고에 없어요');

  const {
    checkList,
    setCheckList,
    onCheckPress,
    existInList,
    addShoppingListPress, //
  } = useHandleCheckList();
  const { checkExistShoppingList } = useCheckFood();

  const {
    favoriteFoods,
    nonExistFavoriteFoods,
    existFavoriteFoods, //
  } = useFavoriteFoods();

  return (
    <RNModal
      title='즐겨찾는 식료품 목록에서 추가'
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    >
      <View style={tw`h-[${scaleH(140)}] px-1`}>
        <View style={tw`my-2 flex-1`}>
          <View style={tw`flex-row pb-2`}>
            {['냉장고에 없어요', '냉장고에 있어요'].map((btnName) => (
              <TabBtn
                key={btnName}
                btnName={btnName}
                setOpenTab={() => {
                  setOpenTab(btnName as TabName);
                  setCheckList([]);
                }}
                active={openTab === btnName}
                length={
                  btnName === '냉장고에 없어요'
                    ? nonExistFavoriteFoods.length
                    : existFavoriteFoods.length
                }
                iconName={
                  btnName === '냉장고에 없어요'
                    ? 'fridge-off-outline'
                    : 'fridge-outline'
                }
              />
            ))}
          </View>
          <View style={tw`flex-1`}>
            {['냉장고에 없어요', '냉장고에 있어요'].map(
              (btnName) =>
                openTab === btnName && (
                  <TableContainer
                    key={btnName}
                    list={
                      btnName === '냉장고에 없어요'
                        ? nonExistFavoriteFoods
                        : existFavoriteFoods
                    }
                    renderItem={({ item }) => (
                      <TableItem
                        key={item.name}
                        food={item}
                        onCheckPress={onCheckPress}
                        existInList={existInList}
                        disabled={!!checkExistShoppingList(item)}
                      >
                        <Icon
                          type='MaterialCommunityIcons'
                          name='basket-remove-outline'
                          size={18}
                          color={
                            !checkExistShoppingList(item)
                              ? ORANGE_RED
                              : LIGHT_GRAY
                          }
                        />
                      </TableItem>
                    )}
                  />
                )
            )}
          </View>

          {!favoriteFoods.length && (
            <Text style={tw`text-slate-500 text-center mt-22`}>
              자주 먹는 식료품이 없습니다.
            </Text>
          )}
        </View>

        {!!checkList.length && (
          <View style={tw`gap-2 border-t border-indigo-300 -mx-4 px-4`}>
            <Text style={tw`mt-4 text-indigo-700`}>
              선택한 항목: {checkList.length}개
            </Text>
            <View style={tw`flex-row flex-wrap gap-1 my-2`}>
              {checkList.map((item) => (
                <FoodTag key={item.id} food={item} />
              ))}
            </View>
            <SquareBtn
              btnName='장보기 목록에 추가'
              onPress={addShoppingListPress}
            />
          </View>
        )}
      </View>
    </RNModal>
  );
}
