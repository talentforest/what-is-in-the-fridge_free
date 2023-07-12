import { View } from 'react-native';
import { SafeBottomAreaView, Text } from '../components/native-component';
import { useState } from 'react';
import { scaleH } from '../util';
import useExpiredFood from '../hooks/useExpiredFoods';
import TableLabel from '../components/common/Table/TableLabel';
import TableItem from '../components/common/Table/TableItem';
import useHandleCheckList from '../hooks/useHandleCheckList';
import TableTotalItem from '../components/common/Table/TableTotalItem';
import LeftDay from '../components/common/LeftDay';
import ExpiredState from '../components/screen-component/expired-foods/ExpiredState';
import TableList from '../components/common/Table/TableList';
import tw from 'twrnc';
import SquareBtn from '../components/common/Buttons/SquareBtn';
import TabBtn from '../components/common/Buttons/TabBtn';
import TableContainer from '../components/common/Table/TableContainer';

export type FoodType = '냉동실' | '냉장실';

export default function ExpiredFoods() {
  const [tab, setTab] = useState<FoodType>('냉장실');
  const { allExpiredFoods, filterExpiredFoods } = useExpiredFood();

  const {
    entireCheck,
    setEntireCheck,
    checkList,
    setCheckList,
    onEntirePress,
    onDeletePress,
    onCheckPress,
    existInList,
  } = useHandleCheckList(tab);

  const onTabPress = (name: FoodType) => {
    setTab(name);
    setEntireCheck(false);
    setCheckList([]);
  };

  return (
    <SafeBottomAreaView>
      <View style={tw`flex-1 p-[${scaleH(14)}px] bg-blue-50`}>
        {/* 탭 버튼 */}
        <View style={tw`flex-row items-center mb-2`}>
          {['냉장실', '냉동실'].map((btnName) => (
            <TabBtn
              key={btnName}
              btnName={`${btnName} 보기`}
              iconName='fridge'
              setOpenTab={() => onTabPress(btnName as FoodType)}
              active={btnName === tab}
              length={filterExpiredFoods(btnName as FoodType).length}
            />
          ))}
        </View>
        {/* 목록 표 */}
        <TableContainer>
          <TableLabel title={`${tab} 식료품`} label='유통기한' />
          {/* 냉장고 상태 문구 */}
          <ExpiredState length={filterExpiredFoods(tab as FoodType).length} />
          {!!filterExpiredFoods(tab).length ? (
            <TableList
              list={filterExpiredFoods(tab)}
              renderItem={({ item }) => (
                <TableItem
                  key={item.name}
                  food={item}
                  onCheckPress={onCheckPress}
                  existInList={existInList}
                >
                  <View style={tw`flex-row items-center`}>
                    <LeftDay fontSize={13} expiredDate={item.expiredDate} />
                  </View>
                </TableItem>
              )}
            />
          ) : (
            <Text style={tw`text-slate-400 text-center mt-14`}>
              유통기한 주의 식료품이 없습니다.
            </Text>
          )}
          {/* 전체 선택하기 */}
          {!!filterExpiredFoods(tab).length && (
            <TableTotalItem
              onEntirePress={() => onEntirePress(filterExpiredFoods(tab))}
              list={filterExpiredFoods(tab)}
              entireCheck={entireCheck}
            />
          )}
        </TableContainer>

        {!!checkList.length && (
          <View style={tw`gap-1 px-4 mt-4`}>
            <Text style={tw`text-slate-600`}>
              선택한 항목: {checkList.length}개
            </Text>
            <SquareBtn
              btnName='나의 냉장고에서 삭제'
              onPress={() => onDeletePress(allExpiredFoods)}
            />
          </View>
        )}
      </View>
    </SafeBottomAreaView>
  );
}
