import { useState } from 'react';
import { View } from 'react-native';
import { Food, initialFoodInfo } from '../../constant/foods';
import tw from 'twrnc';
import BigFoodTag from './BigFoodTag';
import EmptyTag from './EmptyTag';
import AddFoodModal from '../modal/AddFoodModal';

interface Props {
  foods: Food[];
}

export default function FoodTagList({ foods }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food>(initialFoodInfo);

  return (
    <>
      {foods.length !== 0 ? (
        <View style={tw`mb-4 min-h-24 gap-1 flex-row flex-wrap`}>
          {foods.map((food) => (
            <BigFoodTag
              key={food.id}
              food={food}
              setModalVisible={setModalVisible}
              setSelectedFood={setSelectedFood}
            />
          ))}
        </View>
      ) : (
        <View style={tw`mb-4 h-24 bg-white rounded-lg border border-slate-300`}>
          <EmptyTag tagName='아직 유통기한이 임박한 식료품이 없습니다' />
        </View>
      )}
      {selectedFood && modalVisible && setModalVisible && (
        <AddFoodModal
          selectedFood={selectedFood}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </>
  );
}