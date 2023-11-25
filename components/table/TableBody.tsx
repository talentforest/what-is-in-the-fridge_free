import { Food } from '../../constant/foodInfo';
import { FlatList, TouchableWithoutFeedback, View } from 'react-native';
import { useSelector } from '../../redux/hook';
import { MutableRefObject } from 'react';
import { closeKeyboard } from '../../util';

import TableItem, { TABLE_ITEM_HEIGHT } from './TableItem';
import TableItemFront from './TableItemFront';
import TableItemEnd from './TableItemEnd';
import EmptySign from '../common/EmptySign';
import tw from 'twrnc';

interface Props {
  title: '소비기한 주의 식료품' | '자주 먹는 식료품' | '장보기 식료품';
  foodList: Food[];
  flatListRef?: MutableRefObject<FlatList>;
}

export default function TableBody({ title, foodList, flatListRef }: Props) {
  const { filter } = useSelector((state) => state.filter);

  return (
    <>
      {!!foodList.length ? (
        <View style={tw`flex-1 -mx-2`}>
          <FlatList
            ref={flatListRef}
            keyExtractor={(item) => item.id}
            disableVirtualization={false}
            initialNumToRender={15}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`pb-4 px-2`}
            data={foodList}
            getItemLayout={(_, index) => ({
              length: TABLE_ITEM_HEIGHT,
              offset: TABLE_ITEM_HEIGHT * index,
              index,
            })}
            renderItem={({ item }) => (
              <TableItem
                food={item}
                frontChildren={<TableItemFront food={item} />}
                endChildren={<TableItemEnd food={item} title={title} />}
              />
            )}
          />
        </View>
      ) : (
        <TouchableWithoutFeedback onPress={closeKeyboard}>
          <View style={tw`pt-24 flex-1 -mx-4`}>
            <EmptySign
              message={
                title === '장보기 식료품' || filter === '전체'
                  ? `${title}이 없어요`
                  : `${filter}에 ${title}이 없어요.`
              }
              assetSize={100}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
}
