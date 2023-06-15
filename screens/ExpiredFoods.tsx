import { View } from 'react-native';
import { SafeBottomAreaView, Text } from '../components/native-component';
import { BG_LIGHT_GRAY } from '../constant/colors';
import { useState } from 'react';
import useExpiredFood from '../hooks/useExpiredFoods';
import TableLabel from '../components/common/TableLabel';
import TableItem from '../components/common/TableItem';
import useHandleCheckList from '../hooks/useHandleCheckList';
import TableTotalItem from '../components/common/TableTotalItem';
import LeftDay from '../components/common/LeftDay';
import ExpiredState from '../components/screen-component/expired-foods/ExpiredState';
import TableContainer from '../components/common/TableContainer';
import tw from 'twrnc';
import SquareBtn from '../components/common/SquareBtn';
import TabBtn from '../components/common/TabBtn';

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
      <View style={tw`flex-1 pb-4 px-4 bg-[${BG_LIGHT_GRAY}]`}>
        <ExpiredState length={allExpiredFoods.length} />

        <View style={tw`flex-row gap-1 items-center mb-2`}>
          {['냉장실', '냉동실'].map((btnName) => (
            <TabBtn
              key={btnName}
              btnName={btnName}
              setOpenTab={() => onTabPress(btnName as FoodType)}
              active={btnName.slice(0, 3) === tab}
              length={filterExpiredFoods(btnName as FoodType).length}
            />
          ))}
        </View>

        <View
          style={tw`bg-white px-4 flex-1 rounded-lg border border-slate-300`}
        >
          <TableLabel title='식료품' label='유통기한 임박 순' />
          {!!filterExpiredFoods(tab).length ? (
            <TableContainer
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

          {!!filterExpiredFoods(tab).length && (
            <TableTotalItem
              onEntirePress={() => onEntirePress(filterExpiredFoods(tab))}
              list={filterExpiredFoods(tab)}
              entireCheck={entireCheck}
            />
          )}
        </View>

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
