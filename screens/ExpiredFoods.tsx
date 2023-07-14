import { View } from 'react-native';
import { SafeBottomAreaView, Text } from '../components/native-component';
import { useState } from 'react';
import useExpiredFood from '../hooks/useExpiredFoods';
import TableLabel from '../components/common/Table/TableLabel';
import TableItem from '../components/common/Table/TableItem';
import useHandleCheckList from '../hooks/useHandleCheckList';
import LeftDay from '../components/common/LeftDay';
import ExpiredState from '../components/screen-component/expired-foods/ExpiredState';
import TableList from '../components/common/Table/TableList';
import TabBtn from '../components/common/Buttons/TabBtn';
import TableContainer from '../components/common/Table/TableContainer';
import Container from '../components/common/LayoutBox/Container';
import TableItemSetting from '../components/common/Table/TableItemSetting';
import tw from 'twrnc';

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
      <Container>
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
          <TableLabel
            title={`${tab} 식료품`}
            label='유통기한'
            entireChecked={entireCheck}
            onEntirePress={() => onEntirePress(filterExpiredFoods(tab))}
          />
          {/* 냉장고 상태 문구 */}
          <ExpiredState length={filterExpiredFoods(tab).length} />
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
            <Text style={tw`text-slate-400 text-center pt-14 flex-1`}>
              유통기한 주의 식료품이 없습니다.
            </Text>
          )}
          <TableItemSetting
            list={checkList}
            onPress={() => onDeletePress(allExpiredFoods)}
            buttons={['delete']}
          />
        </TableContainer>
      </Container>
    </SafeBottomAreaView>
  );
}
