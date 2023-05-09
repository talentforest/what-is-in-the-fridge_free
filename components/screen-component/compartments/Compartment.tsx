import { View } from 'react-native';
import { useState } from 'react';
import { Food, initialFoodInfo } from '../../../constant/foods';
import { Text, TouchableOpacity } from '../../native-component';
import { useSelector } from '../../../redux/hook';
import { AddFoodBtn } from './AddFoodBtn';
import { Space } from '../../../constant/fridge';
import FoodDetailModal from '../../modal/FoodDetailModal';
import tw from 'twrnc';

interface Props {
  space: Space;
  compartmentName: string;
  index: number;
}

export default function Compartment({ space, compartmentName, index }: Props) {
  const { fridgeFoods, freezerFoods } = useSelector((state) => state.allFoods);
  const [selectedFood, setSelectedFood] = useState<Food>(initialFoodInfo);
  const [modalVisible, setModalVisible] = useState(false);

  const getFoodList = (itemNum: number) => {
    const foodList = space.includes('냉동') ? freezerFoods : fridgeFoods;
    return foodList.filter(
      (food) => food.space === space && food.compartmentNum === `${itemNum}번`
    );
  };

  return (
    <>
      <View
        style={tw`flex-1 border border-slate-400 p-2 rounded-lg bg-white shadow-md`}
      >
        <View style={tw`flex-row justify-between items-center`}>
          <View style={tw`flex-1`}>
            <Text styletw='text-xs text-indigo-600 border border-slate-400 self-start py-0.5 px-2 rounded-xl'>
              {compartmentName}
            </Text>
          </View>
          <Text styletw='text-xs text-indigo-600 mr-2'>
            식료품 총 {getFoodList(index + 1).length} 개
          </Text>
          <AddFoodBtn space={space} index={index} />
        </View>
        <View style={tw`mt-2 flex-1 flex-row flex-wrap items-center gap-2`}>
          {getFoodList(index + 1).map((food: Food) => (
            <TouchableOpacity
              key={food.id}
              onPress={() => {
                setSelectedFood(food);
                setModalVisible(true);
              }}
            >
              <Text styletw='text-2xl'>{food.image}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
