import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeBottomAreaView, Text } from '../components/native-component';
import { Food } from '../constant/foods';
import { setAllFoods } from '../redux/slice/allFoodsSlice';
import { useDispatch, useSelector } from '../redux/hook';
import useExpiredFood from '../hooks/useExpiredFoods';
import TableLabel from '../components/common/TableLabel';
import FoodListItem from '../components/common/FoodListItem';
import TableListContainer from '../components/common/TableListContainer';
import FixedBtn from '../components/common/FixedBtn';
import LeftDay from '../components/common/LeftDay';
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

  return (
    <SafeBottomAreaView>
      <ScrollView style={tw`bg-neutral-50 gap-1`}>
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
      </ScrollView>
      {!!checkList.length && (
        <FixedBtn
          btnName='나의 냉장고에서 삭제'
          onDeletePress={onDeletePress}
        />
      )}
    </SafeBottomAreaView>
  );
}
