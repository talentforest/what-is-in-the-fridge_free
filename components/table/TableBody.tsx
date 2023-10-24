import { Food } from '../../constant/foodInfo';
import { FlatList, View } from 'react-native';
import { AnimationState } from '../../hooks/';
import { useSelector } from '../../redux/hook';
import { MutableRefObject } from 'react';

import TableItem from './TableItem';
import TableItemFront from './TableItemFront';
import TableItemEnd from './TableItemEnd';
import EmptySign from '../common/EmptySign';
import tw from 'twrnc';

interface Props {
  title: '소비기한 주의 식료품' | '자주 먹는 식료품' | '장보기 식료품';
  filteredList: Food[];
  checkedList: Food[];
  onCheckBoxPress: (food: Food) => void;
  addToFridgePress?: (food: Food) => void;
  animationState: AnimationState;
  afterAnimation: () => void;
  flatListRef?: MutableRefObject<FlatList>;
}

export default function TableBody({
  title,
  filteredList,
  checkedList,
  onCheckBoxPress,
  addToFridgePress,
  animationState,
  afterAnimation,
  flatListRef,
}: Props) {
  const { filter } = useSelector((state) => state.filter);

  return (
    <>
      {!!filteredList.length ? (
        <View style={tw`flex-1 -mx-2`}>
          <FlatList
            ref={flatListRef}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`pb-10 px-2`}
            data={filteredList}
            renderItem={({ item }) => (
              <TableItem
                food={item}
                onCheckBoxPress={onCheckBoxPress}
                isCheckedItem={!!checkedList.find(({ id }) => id === item.id)}
                animationState={animationState}
                afterAnimation={afterAnimation}
                frontChildren={<TableItemFront food={item} />}
                endChildren={
                  <TableItemEnd
                    food={item}
                    title={title}
                    addToFridgePress={addToFridgePress}
                    isCheckList={!!checkedList.length}
                  />
                }
              />
            )}
          />
        </View>
      ) : (
        <View style={tw`pt-24 flex-1 -mx-4`}>
          <EmptySign
            message={
              title === '장보기 식료품' || filter === '전체'
                ? `${title}이 없어요`
                : `${filter}에 ${title}이 없어요.`
            }
          />
        </View>
      )}
    </>
  );
}
