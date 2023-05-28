import { useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeBottomAreaView, Text } from '../components/native-component';
import { Food } from '../constant/foods';
import { setAllFoods } from '../redux/slice/allFoodsSlice';
import { useDispatch, useSelector } from '../redux/hook';
import { getLeftDays } from '../util';
import useExpiredFood from '../hooks/useExpiredFoods';
import TableLabel from '../components/common/TableLabel';
import FoodListItem from '../components/common/FoodListItem';
import tw from 'twrnc';
import TableListContainer from '../components/common/TableListContainer';
import FixedBtn from '../components/common/FixedBtn';

export default function ExpiredFoods() {
  const { fridgeFoods } = useSelector((state) => state.allFoods);
  const { fridgeFoodList, freezerFoodList } = useExpiredFood();
  const [freezerCheckList, setFreezerCheckList] = useState<Food[]>([]);
  const [fridgeCheckList, setFridgeCheckList] = useState<Food[]>([]);
  const dispatch = useDispatch();

  const onDeletePress = () => {
    const filteredArr = fridgeFoods.filter((item1) => {
      return !fridgeCheckList.some((item2) => item2.id === item1.id);
    });

    dispatch(setAllFoods(filteredArr));
    setFridgeCheckList([]);
  };

  return (
    <SafeBottomAreaView>
      <ScrollView style={tw`flex-1 bg-neutral-50 gap-1`}>
        <TableListContainer>
          <TableLabel title='냉동실 식료품' label='유통기한 경과' />
          {freezerFoodList.length !== 0 ? (
            freezerFoodList.map((food) => (
              <FoodListItem
                food={food}
                checkList={freezerCheckList}
                setCheckList={setFreezerCheckList}
              >
                <Text
                  styletw={`${
                    0 > getLeftDays(food.expirationDate)
                      ? 'text-red-600'
                      : 'text-amber-600'
                  }`}
                >
                  {getLeftDays(food.expirationDate)}일
                </Text>
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
          {fridgeFoodList.length !== 0 ? (
            fridgeFoodList.map((food) => (
              <FoodListItem
                food={food}
                checkList={fridgeCheckList}
                setCheckList={setFridgeCheckList}
              >
                <Text
                  styletw={`${
                    0 > getLeftDays(food.expirationDate)
                      ? 'text-red-600'
                      : 'text-amber-600'
                  }`}
                >
                  {getLeftDays(food.expirationDate)}일
                </Text>
              </FoodListItem>
            ))
          ) : (
            <Text styletw='px-4 text-sm text-center self-center mt-15 text-slate-500'>
              냉동실에 유통기한이 임박한 식품이 없습니다.
            </Text>
          )}
        </TableListContainer>
      </ScrollView>
      {(fridgeCheckList || freezerCheckList) && (
        <FixedBtn
          btnName='자주 먹는 식료품에서 삭제'
          onDeletePress={onDeletePress}
        />
      )}
    </SafeBottomAreaView>
  );
}
