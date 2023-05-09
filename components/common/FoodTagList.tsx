import { useState } from 'react';
import { View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import { Food } from '../../constant/foods';
import { cutLetter } from '../../util';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/AntDesign';
import AddFavoriteFoodModal from '../modal/AddFavoriteFoodModal';

interface Props {
  foods: Food[];
  modalVisible?: boolean;
  setModalVisible?: (modalVisible: boolean) => void;
  sm?: boolean;
  addFood?: boolean;
}

export default function FoodTagList({
  modalVisible,
  setModalVisible,
  foods,
  sm,
  addFood,
}: Props) {
  const [selectedFood, setSelectedFood] = useState<Food>();

  return (
    <>
      {foods.length !== 0 ? (
        <View style={tw`flex-row flex-wrap gap-1.5 min-h-20 rounded-lg mt-2`}>
          {foods.map((food) => (
            <View
              key={food.id}
              style={tw`p-2 border bg-white border-slate-300 gap-1 justify-center items-center ${
                sm ? 'h-8 flex-row px-3 rounded-2xl' : 'w-24 h-24 rounded-lg'
              }`}
            >
              <Text styletw={`${sm ? 'text-sm' : 'text-3xl'}  text-center`}>
                {food.image}
              </Text>
              <Text styletw={'text-xs text-center text-slate-600'}>
                {cutLetter(food.name, 6)}
              </Text>
              {!sm && !addFood && (
                <Text styletw='text-xs text-indigo-500'>
                  {new Date(food.expirationDate).getDate() -
                    new Date().getDate()}
                  일 남음
                </Text>
              )}
              {addFood && setModalVisible && (
                <TouchableOpacity
                  style={tw`self-end`}
                  onPress={() => {
                    setSelectedFood(food);
                    setModalVisible(true);
                  }}
                >
                  <Icon name='pluscircle' size={18} color='#4a46e5' />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      ) : (
        <View
          style={tw`border mt-5 mb-8 border-slate-300 self-center px-4 py-1 rounded-2xl bg-white justify-center items-center`}
        >
          <Text styletw='text-sm text-slate-500'>아직 정보가 없습니다.</Text>
        </View>
      )}
      {selectedFood && modalVisible && setModalVisible && (
        <AddFavoriteFoodModal
          food={selectedFood}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </>
  );
}
