import { useFonts } from 'expo-font';
import { View } from 'react-native';
import { SafeBottomAreaView, Text } from '../components/native-component';
import { fonts } from '../constant/fonts';
import { useSelector } from '../redux/hook';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import FoodTagList from '../components/common/FoodTagList';
import EmptyTag from '../components/common/EmptyTag';
import EditBtn from '../components/common/EditBtn';

export default function FavoriteFoods() {
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const [fontsLoaded] = useFonts(fonts);
  const navigation = useNavigation();
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        favoriteFoods.length !== 0 && (
          <EditBtn
            onPress={() => setEditing((prev) => !prev)}
            editing={editing}
          />
        ),
    });
  }, [editing]);

  if (!fontsLoaded) return null;

  return (
    <SafeBottomAreaView>
      <View style={tw`flex-1 bg-indigo-50 p-4 gap-1`}>
        {favoriteFoods.length !== 0 ? (
          <>
            <Text styletw='mb-2 text-indigo-600'>자주 먹는 식료품 목록</Text>
            <FoodTagList foods={favoriteFoods} editing={editing} />
          </>
        ) : (
          <EmptyTag tagName='아직 자주 먹는 식료품 정보가 없습니다' />
        )}
      </View>
    </SafeBottomAreaView>
  );
}
