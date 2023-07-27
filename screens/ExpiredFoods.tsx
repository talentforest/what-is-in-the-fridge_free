import { View } from 'react-native';
import { SafeBottomAreaView } from '../components/native-component';
import { useState } from 'react';
import { SpaceType } from '../constant/fridgeInfo';
import useExpiredFood from '../hooks/useExpiredFoods';
import useHandleCheckList from '../hooks/useHandleCheckList';
import ExpiredState from '../components/screen-component/expired-foods/ExpiredState';
import Container from '../components/common/layout/Container';
import TableContainer from '../components/common/table/TableContainer';
import TabBtn from '../components/common/buttons/TabBtn';
import TableHeader from '../components/common/table/TableHeader';
import TableBody from '../components/common/table/TableBody';
import TableFooter from '../components/common/table/TableFooter';
import tw from 'twrnc';

export default function ExpiredFoods() {
  const [tab, setTab] = useState<SpaceType>('냉장실');
  const { allExpiredFoods, filterExpiredFoods } = useExpiredFood();

  const totalLength = filterExpiredFoods(tab as SpaceType).length;
  const {
    entireCheck,
    setEntireCheck,
    checkList,
    setCheckList,
    onEntirePress,
    onDeletePress,
    onCheckPress,
    existInList,
  } = useHandleCheckList(totalLength, tab);

  const onTabPress = (name: SpaceType) => {
    setTab(name);
    setEntireCheck(false);
    setCheckList([]);
  };

  return (
    <SafeBottomAreaView>
      <Container>
        {/* 탭 버튼 */}
        <View style={tw`flex-row items-center ml-1 gap-0.5`}>
          {['냉장실', '냉동실'].map((btnName) => (
            <TabBtn
              key={btnName}
              btnName={`${btnName} 보기`}
              setOpenTab={() => onTabPress(btnName as SpaceType)}
              active={btnName === tab}
            />
          ))}
        </View>

        {/* 전체 표 */}
        <TableContainer>
          <TableHeader
            title={`유통기한 주의 식료품`}
            listLength={filterExpiredFoods(tab).length}
            entireChecked={entireCheck}
            onEntirePress={() => onEntirePress(filterExpiredFoods(tab))}
            columnTitle='유통기한'
          />

          {/* 식료품 리스트 */}
          <TableBody
            existListItem={!!filterExpiredFoods(tab).length}
            list={filterExpiredFoods(tab)}
            onCheckPress={onCheckPress}
            existInList={existInList}
            noneItemNoti='유통기한 주의 식료품이 없습니다.'
          />

          {/* 냉장고 상태 문구 */}
          <ExpiredState length={filterExpiredFoods(tab).length} />

          {/* 식료품 선택 개수와 버튼 */}
          <TableFooter
            list={checkList}
            onPress={() => onDeletePress(allExpiredFoods)}
            buttons={['delete']}
          />
        </TableContainer>
      </Container>
    </SafeBottomAreaView>
  );
}
