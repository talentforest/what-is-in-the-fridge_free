import { View } from 'react-native';
import { useState } from 'react';
import { Food, initialFoodInfo } from '../../../constant/foods';
import { Text, TouchableOpacity } from '../../native-component';
import { AddFoodBtn } from './AddFoodBtn';
import { Space } from '../../../constant/fridgeInfo';
import FoodDetailModal from '../../modal/FoodDetailModal';
import tw from 'twrnc';
import SmallFoodTag from '../../common/SmallFoodTag';
import useGetFoodList from '../../../hooks/useGetFoodList';

interface Props {
  space: Space;
  compartmentName: string;
  index: number;
}

export default function Compartment({ space, compartmentName, index }: Props) {
  const [selectedFood, setSelectedFood] = useState<Food>(initialFoodInfo);
  const [modalVisible, setModalVisible] = useState(false);

  const { getFoodList } = useGetFoodList();

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
            식료품 총 {getFoodList(index + 1, space).length} 개
          </Text>
          <AddFoodBtn space={space} index={index} />
        </View>
        <View style={tw`mt-2 flex-1 flex-row flex-wrap items-center gap-2`}>
          {getFoodList(index + 1, space).map((food: Food) => (
            <TouchableOpacity
              key={food.id}
              onPress={() => {
                setSelectedFood(food);
                setModalVisible(true);
              }}
            >
              <SmallFoodTag food={food} />
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
