import { ScrollView, View } from 'react-native';
import { useState } from 'react';
import { Food, initialFoodInfo } from '../../../constant/foods';
import { Text, TouchableOpacity } from '../../native-component';
import { FoodLocation } from '../../../constant/fridgeInfo';
import FoodDetailModal from '../../modal/FoodDetailModal';
import tw from 'twrnc';
import FoodItem from './FoodItem';
import useGetFoodList from '../../../hooks/useGetFoodList';
import AddFoodModalBtn from './AddFoodModalBtn';
import InnerShadow from '../../common/InnerShadow';

interface Props {
  foodLocation: FoodLocation;
}

export default function Compartment({ foodLocation }: Props) {
  const { space, compartmentNum } = foodLocation;
  const [selectedFood, setSelectedFood] = useState<Food>(initialFoodInfo);
  const [modalVisible, setModalVisible] = useState(false);

  const { getFoodList } = useGetFoodList();

  return (
    <>
      <View
        style={tw.style(`flex-1 border border-slate-300 rounded-lg bg-white`)}
      >
        <InnerShadow />
        {/* 칸 정보 */}
        <View
          style={tw`flex-row justify-between items-center pl-3 pr-1.5 rounded-t-lg`}
        >
          <View style={tw`flex-row gap-1 items-center`}>
            <Text style={tw`text-slate-600`} fontSize={13}>
              {compartmentNum}칸
            </Text>
            <Text>|</Text>
            <Text style={tw`text-slate-600`} fontSize={13}>
              식료품 {getFoodList(space, compartmentNum).length}개
            </Text>
          </View>

          <AddFoodModalBtn foodLocation={foodLocation} />
        </View>
        {/* 식료품 리스트 */}
        <ScrollView
          contentContainerStyle={tw`flex-row px-2 py-1 flex-wrap gap-1 items-center`}
          style={tw`m-1 flex-1`}
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
              <FoodItem food={food} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {modalVisible && (
        <FoodDetailModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          food={selectedFood}
        />
      )}
    </>
  );
}
