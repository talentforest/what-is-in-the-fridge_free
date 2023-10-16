import { Food } from '../../constant/foodInfo';
import { TouchableOpacity } from '../common/native-component';
import { FlatList, View } from 'react-native';
import { BLUE } from '../../constant/colors';
import { AnimationState } from '../../hooks/';
import { useSelector } from '../../redux/hook';
import { useEffect, useRef } from 'react';

import LeftDay from '../common/LeftDay';
import TableItem from './TableItem';
import Icon from '../common/native-component/Icon';
import EmptySign from '../common/EmptySign';
import IndicatorExist from '../common/IndicatorExist';
import tw from 'twrnc';

interface Props {
  title: '소비기한 주의 식료품' | '자주 먹는 식료품' | '장보기 식료품';
  totalLength?: number;
  filteredList: Food[];
  onCheckBoxPress: (food: Food) => void;
  addToFridgePress?: (food: Food) => void;
  checkedList: Food[];
  animationState: AnimationState;
  afterAnimation: () => void;
}

export default function TableBody({
  title,
  totalLength,
  filteredList,
  onCheckBoxPress,
  addToFridgePress,
  checkedList,
  animationState,
  afterAnimation,
}: Props) {
  const { filter } = useSelector((state) => state.filter);
  const flatListRef = useRef<FlatList | null>(null);

  useEffect(() => {
    // 리스트에 아이템이 추가되어 전체 개수가 변할 때만 아래로 자동 스크롤
    flatListRef?.current?.scrollToEnd({ animated: true });
  }, [totalLength]);

  return (
    <>
      {!!filteredList.length ? (
        <View style={tw`flex-1 -mx-2`}>
          <FlatList
            ref={flatListRef}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`pb-20 px-2`}
            data={filteredList}
            renderItem={({ item }) => (
              <TableItem
                food={item}
                onCheckBoxPress={onCheckBoxPress}
                isCheckedItem={!!checkedList.find(({ id }) => id === item.id)}
                animationState={animationState}
                afterAnimation={afterAnimation}
              >
                {title === '소비기한 주의 식료품' && (
                  <View style={tw`items-end w-20`}>
                    <LeftDay
                      expiredDate={item.expiredDate}
                      size={14}
                      dateMark
                    />
                  </View>
                )}

                {title === '자주 먹는 식료품' && (
                  <View style={tw`ml-2`}>
                    <IndicatorExist name={item.name} space={item.space} />
                  </View>
                )}

                {title === '장보기 식료품' && addToFridgePress && (
                  <TouchableOpacity
                    onPress={() => addToFridgePress(item)}
                    style={tw`h-full justify-center w-[10%] items-center -mr-3`}
                    disabled={!!checkedList.length}
                  >
                    <Icon
                      type='MaterialCommunityIcons'
                      name='plus'
                      size={23}
                      color={!!checkedList.length ? '#e0e0e0' : BLUE}
                    />
                  </TouchableOpacity>
                )}
              </TableItem>
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
