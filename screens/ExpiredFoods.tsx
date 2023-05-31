import { useState } from 'react';
import { View } from 'react-native';
import { SafeBottomAreaView, Text } from '../components/native-component';
import { Food } from '../constant/foods';
import { setAllFoods } from '../redux/slice/allFoodsSlice';
import { useDispatch, useSelector } from '../redux/hook';
import { DEEP_INDIGO, ORANGE_RED } from '../constant/colors';
import { caution } from '../constant/caution';
import useExpiredFood from '../hooks/useExpiredFoods';
import TableLabel from '../components/common/TableLabel';
import FoodListItem from '../components/common/FoodListItem';
import TableListContainer from '../components/common/TableListContainer';
import FixedBtn from '../components/common/FixedBtn';
import LeftDay from '../components/common/LeftDay';
import Icon from 'react-native-vector-icons/Octicons';
import tw from 'twrnc';

export default function ExpiredFoods() {
  const [checkList, setCheckList] = useState<Food[]>([]);
  const { allFoods } = useSelector((state) => state.allFoods);

  const {
    allLeftAndExpiredFoods,
    freezerLeftExpiredFoods,
    fridgeLeftExpiredFoods,
  } = useExpiredFood();
  const dispatch = useDispatch();

  const onDeletePress = () => {
    const filteredArr = allFoods.filter((item1) => {
      return !checkList.some((item2) => item2.id === item1.id);
    });

    dispatch(setAllFoods(filteredArr));
    setCheckList([]);
  };

  const getCaution = (length: number) => {
    const level =
      length <= 3
        ? 1
        : length <= 8
        ? 2
        : length <= 15
        ? 3
        : length > 15
        ? 4
        : null;
    return caution.find((item) => item.level === level);
  };

  const length = allLeftAndExpiredFoods.length;

  return (
    <SafeBottomAreaView>
      <View style={tw`flex-row gap-1 items-center py-3 px-5`}>
        <Icon
          name={
            getCaution(length)?.level === 1
              ? 'thumbsup'
              : getCaution(length)?.level === 2
              ? 'alert'
              : ''
          }
          size={16}
          color={
            getCaution(length)?.level === 1
              ? DEEP_INDIGO
              : getCaution(length)?.level === 2
              ? ORANGE_RED
              : getCaution(length)?.level === 3
              ? 'red'
              : ''
          }
        />
        <Text styletw='text-slate-600 flex-1'>{getCaution(length)?.guide}</Text>
      </View>
      <View style={tw`flex-1 gap-2`}>
        <TableListContainer>
          <TableLabel title='냉동실 식료품' label='유통기한 경과' />
          {freezerLeftExpiredFoods.length !== 0 ? (
            freezerLeftExpiredFoods.map((food) => (
              <FoodListItem
                key={food.id}
                food={food}
                checkList={checkList}
                setCheckList={setCheckList}
              >
                <LeftDay expiredDate={food.expiredDate} />
              </FoodListItem>
            ))
          ) : (
            <Text styletw='px-4 text-sm text-center self-center mt-15 text-slate-500'>
              냉동실에 유통기한이 임박한 식품이 없습니다.
            </Text>
          )}
        </TableListContainer>
        <TableListContainer>
          <TableLabel title='냉장실 식료품' label='유통기한 경과' />
          {fridgeLeftExpiredFoods.length !== 0 ? (
            fridgeLeftExpiredFoods.map((food) => (
              <FoodListItem
                key={food.id}
                food={food}
                checkList={checkList}
                setCheckList={setCheckList}
              >
                <LeftDay expiredDate={food.expiredDate} />
              </FoodListItem>
            ))
          ) : (
            <Text styletw='px-4 text-sm text-center self-center mt-15 text-slate-500'>
              냉동실에 유통기한이 임박한 식품이 없습니다.
            </Text>
          )}
        </TableListContainer>
      </View>
      {!!checkList.length && (
        <FixedBtn
          btnName='나의 냉장고에서 삭제'
          onDeletePress={onDeletePress}
        />
      )}
    </SafeBottomAreaView>
  );
}
