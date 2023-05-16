import { ScrollView, View } from 'react-native';
import { useState } from 'react';
import { Food, initialFoodInfo } from '../../../constant/foods';
import { Text, TouchableOpacity } from '../../native-component';
import { CompartmentType } from '../../../constant/fridgeInfo';
import FoodDetailModal from '../../modal/FoodDetailModal';
import tw from 'twrnc';
import SmallFoodTag from '../../common/SmallFoodTag';
import useGetFoodList from '../../../hooks/useGetFoodList';
import AddFoodModalBtn from './AddFoodModalBtn';

interface Props {
  compartment: CompartmentType;
}

export default function Compartment({ compartment }: Props) {
  const { space, compartmentNum } = compartment;
  const [selectedFood, setSelectedFood] = useState<Food>(initialFoodInfo);
  const [modalVisible, setModalVisible] = useState(false);

  const { getFoodList } = useGetFoodList();

  return (
    <>
      <View style={tw`flex-1 border border-slate-300 p-2 rounded-lg bg-white`}>
        <View style={tw`flex-row justify-between items-center`}>
          <View style={tw`flex-1`}>
            <Text styletw='text-xs text-indigo-600 border border-slate-400 self-start py-0.5 px-2 rounded-xl'>
              {compartmentNum} {space}
            </Text>
          </View>
          <Text styletw='text-xs text-indigo-600 mr-2'>
            식료품 총 {getFoodList(space, compartmentNum).length} 개
          </Text>
          <AddFoodModalBtn compartment={compartment} />
        </View>
        <ScrollView
          contentContainerStyle={tw`flex-row flex-wrap gap-1 items-center`}
          style={tw`mt-2 flex-1 `}
        >
          {getFoodList(space, compartmentNum).map((food: Food) => (
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
