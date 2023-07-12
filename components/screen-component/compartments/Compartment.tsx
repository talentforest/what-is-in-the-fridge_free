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
        <View
          style={tw`flex-row justify-between items-center pt-1.5 px-2 rounded-t-lg`}
        >
          <View style={tw`flex-1`}>
            <Text style={tw`text-indigo-600`} fontSize={12}>
              {compartmentNum}칸
            </Text>
          </View>
          <Text style={tw`text-indigo-600 mr-2`} fontSize={12}>
            식료품 총 {getFoodList(space, compartmentNum).length}개
          </Text>
          <AddFoodModalBtn foodLocation={foodLocation} />
        </View>
        <ScrollView
          contentContainerStyle={tw`flex-row flex-wrap gap-1 items-center`}
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
