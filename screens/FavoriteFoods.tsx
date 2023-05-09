import { useState } from 'react';
import { useFonts } from 'expo-font';
import { View } from 'react-native';
import { Text } from '../components/native-component';
import { fonts } from '../constant/fonts';
import { useSelector } from '../redux/hook';
import tw from 'twrnc';
import FoodTagList from '../components/common/FoodTagList';

export default function FavoriteFoods() {
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const [fontsLoaded] = useFonts(fonts);
  const [modalVisible, setModalVisible] = useState(false);

  if (!fontsLoaded) return null;

  return (
    <View style={tw`flex-1 bg-indigo-50 p-4 gap-1`}>
      <Text styletw='text-indigo-600'>자주 먹는 식료품 목록</Text>
      <FoodTagList
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        foods={favoriteFoods}
        addFood
      />
    </View>
  );
}
