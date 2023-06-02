import { FlatList, View } from 'react-native';
import { SafeBottomAreaView, Text } from '../components/native-component';
import { setAllFoods } from '../redux/slice/allFoodsSlice';
import { useDispatch, useSelector } from '../redux/hook';
import { ORANGE_RED } from '../constant/colors';
import { caution } from '../constant/caution';
import useExpiredFood from '../hooks/useExpiredFoods';
import TableLabel from '../components/common/TableLabel';
import TableItem from '../components/common/TableItem';
import useHandleCheckList from '../hooks/useHandleCheckList';
import TableTotalItem from '../components/common/TableTotalItem';
import FixedBtn from '../components/common/FixedBtn';
import LeftDay from '../components/common/LeftDay';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';

export default function ExpiredFoods() {
  const { allFoods } = useSelector((state) => state.allFoods);
  const dispatch = useDispatch();

  const { allExpiredFoods, filterExpiredFoods } = useExpiredFood();

  const {
    entireCheck,
    setEntireCheck,
    checkList,
    setCheckList,
    onEntirePress,
  } = useHandleCheckList();

  const onDeletePress = () => {
    const filteredArr = allFoods.filter((item1) => {
      return !checkList.some((item2) => item2.id === item1.id);
    });

    dispatch(setAllFoods(filteredArr));
    setCheckList([]);
  };

  const getCaution = (length: number) => {
    return caution.find((item) => item.max > length);
  };

  const length = allExpiredFoods.length;

  return (
    <SafeBottomAreaView>
      <View style={tw`flex-1 pb-2`}>
        <View style={tw`flex-row gap-1 items-center py-3 px-5`}>
          <Icon
            name={length > 3 ? 'fridge-alert-outline' : 'fridge-outline'}
            size={18}
            color={length > 15 ? 'red' : length > 3 ? 'orange' : 'green'}
          />
          <Text styletw='text-slate-600 flex-1'>
            {getCaution(length)?.guide}
          </Text>
        </View>
        <View style={tw`flex-1 bg-white px-4 border-b border-slate-300`}>
          <TableLabel title='냉동실 식료품' label='유통기한 경과' />
          {filterExpiredFoods('냉동실').length !== 0 ? (
            <FlatList
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              data={filterExpiredFoods('냉동실')}
              renderItem={({ item }) => (
                <TableItem
                  key={item.name}
                  food={item}
                  checkList={checkList}
                  setCheckList={setCheckList}
                  setEntireCheck={setEntireCheck}
                >
                  <LeftDay expiredDate={item.expiredDate} />
                </TableItem>
              )}
            />
          ) : (
            <Text styletw='text-slate-500 text-center mt-22'>
              유통기한 주의 식료품이 없습니다.
            </Text>
          )}
        </View>
        <View style={tw`flex-1 bg-white px-4`}>
          <TableLabel title='냉장실 식료품' label='유통기한 경과' />
          {filterExpiredFoods('냉장실').length !== 0 ? (
            <FlatList
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              data={filterExpiredFoods('냉장실')}
              renderItem={({ item }) => (
                <TableItem
                  key={item.name}
                  food={item}
                  checkList={checkList}
                  setCheckList={setCheckList}
                  setEntireCheck={setEntireCheck}
                >
                  <LeftDay expiredDate={item.expiredDate} />
                </TableItem>
              )}
            />
          ) : (
            <Text styletw='text-slate-500 text-center mt-22'>
              유통기한 주의 식료품이 없습니다.
            </Text>
          )}
        </View>

        {!!allExpiredFoods.length && (
          <TableTotalItem
            label={`총 ${allExpiredFoods.length}개의 유통기한 주의 식료품`}
            onEntirePress={() => onEntirePress(allExpiredFoods)}
            list={allExpiredFoods}
            entireCheck={entireCheck}
          />
        )}

        {!!checkList.length && (
          <FixedBtn
            btnName='나의 냉장고에서 삭제'
            onDeletePress={onDeletePress}
            listLength={checkList.length}
          />
        )}
      </View>
    </SafeBottomAreaView>
  );
}
