import { Food } from '../../constant/foodInfo';
import {
  FlatList,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { MutableRefObject } from 'react';
import { closeKeyboard } from '../../util';
import { useHandleFilter } from '../../hooks';
import { setCheckedList } from '../../redux/slice/food-list/checkListSlice';
import { useDispatch } from '../../redux/hook';

import TableItem, { TABLE_ITEM_HEIGHT } from './TableItem';
import TableItemFront from './TableItemFront';
import TableItemEnd, { TableTitle } from './TableItemEnd';
import EmptySign from '../common/EmptySign';
import tw from 'twrnc';

interface Props {
  title: TableTitle;
  foodList: Food[];
  flatListRef?: MutableRefObject<FlatList>;
}

export default function TableBody({ title, foodList, flatListRef }: Props) {
  const { currentFilter } = useHandleFilter();

  const dispatch = useDispatch();

  const uncheckAllItems = () => {
    dispatch(setCheckedList([]));
    closeKeyboard();
  };

  return (
    <>
      {!!foodList.length ? (
        <Pressable
          style={tw`-mx-2 overflow-hidden flex-1`}
          onPress={uncheckAllItems}
        >
          <Pressable onPress={(e) => e.preventDefault()}>
            <FlatList
              ref={flatListRef}
              keyExtractor={(item) => item.id}
              disableVirtualization={false}
              initialNumToRender={15}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={tw`pb-2 px-2`}
              data={foodList}
              getItemLayout={(_, index) => ({
                length: TABLE_ITEM_HEIGHT,
                offset: TABLE_ITEM_HEIGHT * index,
                index,
              })}
              renderItem={({ item }) => (
                <TableItem
                  food={item}
                  checkBox={title !== '식료품'}
                  frontChildren={<TableItemFront food={item} />}
                  endChildren={<TableItemEnd food={item} title={title} />}
                />
              )}
            />
          </Pressable>
        </Pressable>
      ) : (
        <TouchableWithoutFeedback onPress={closeKeyboard}>
          <View style={tw`pt-24 flex-1 -mx-4`}>
            <EmptySign
              message={
                title === '장볼 식료품' || currentFilter === '전체'
                  ? `아직 ${
                      title === '전체 식료품' ? '식료품' : title
                    }이 없어요`
                  : `${currentFilter}에 ${
                      title === '전체 식료품' ? '식료품' : title
                    }이 없어요`
              }
              assetSize={100}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
}
