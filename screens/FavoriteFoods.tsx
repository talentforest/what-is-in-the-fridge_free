import { useFonts } from 'expo-font';
import { View } from 'react-native';
import { Text } from '../components/native-component';
import { fonts } from '../constant/fonts';
import { useSelector } from '../redux/hook';
import tw from 'twrnc';
import FoodTagList from '../components/common/FoodTagList';
import EmptyTag from '../components/common/EmptyTag';

export default function FavoriteFoods() {
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) return null;

  return (
    <View style={tw`flex-1 bg-indigo-50 p-4 gap-1`}>
      {favoriteFoods.length !== 0 ? (
        <>
          <Text styletw='mb-2 text-indigo-600'>자주 먹는 식료품 목록</Text>
          <FoodTagList foods={favoriteFoods} />
        </>
      ) : (
        <EmptyTag tagName='아직 자주 먹는 식료품 정보가 없습니다' />
      )}
    </View>
  );
}
