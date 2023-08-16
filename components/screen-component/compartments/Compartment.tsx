import { Animated, ScrollView, View } from 'react-native';
import { useRef, useState } from 'react';
import { Food, initialFoodInfo } from '../../../constant/foods';
import { Text, TouchableOpacity } from '../../native-component';
import { FoodLocation } from '../../../constant/fridgeInfo';
import { FormStep } from '../../../constant/formInfo';
import FoodDetailModal from '../modal/FoodDetailModal';
import FoodBox from './FoodBox';
import useGetFoodList from '../../../hooks/useGetFoodList';
import AddFoodBtn from './AddFoodBtn';
import useToggleModal from '../../../hooks/useToggleModal';
import tw from 'twrnc';

interface Props {
  foodLocation: FoodLocation;
}

export default function Compartment({ foodLocation }: Props) {
  const { space, compartmentNum } = foodLocation;
  const [selectedFood, setSelectedFood] = useState<Food>(initialFoodInfo);

  const { modalVisible, setModalVisible } = useToggleModal();
  const { getFoodList } = useGetFoodList();

  return (
    <>
      <View
        style={tw.style(`flex-1 border border-slate-300 rounded-lg bg-white`)}
      >
        {/* 칸 정보 */}
        <View style={tw`flex-row justify-between items-center pl-3 pr-1.5`}>
          <Text style={tw`text-slate-500`}>
            {compartmentNum}칸 | 식료품{' '}
            {getFoodList(space, compartmentNum).length}개
          </Text>
          <AddFoodBtn foodLocation={foodLocation} />
        </View>

        {/* 식료품 리스트 */}
        <ScrollView
          contentContainerStyle={tw`flex-row px-1 pt-1 pb-2 flex-wrap gap-1 items-center`}
          style={tw`p-1 pt-0 flex-1`}
          showsVerticalScrollIndicator={false}
        >
          {getFoodList(space, compartmentNum).map((food: Food) => (
            <TouchableOpacity
              key={food.id}
              onPress={() => {
                setSelectedFood(food);
                setModalVisible(true);
              }}
            >
              <FoodBox food={food} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {modalVisible && (
        <FoodDetailModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          food={selectedFood}
          formSteps={
            [
              { id: 1, name: '식품 정보' },
              { id: 2, name: '식품 날짜' },
            ] as FormStep[]
          }
        />
      )}
    </>
  );
}
