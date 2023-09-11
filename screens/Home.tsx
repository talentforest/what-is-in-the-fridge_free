import { ScrollView, View } from 'react-native';
import { Text } from '../components/common/native-component';
import { useSelector } from '../redux/hook';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Cafe24Ssurround } from '../constant/fonts';
import { useGetFoodList } from '../hooks';
import { PlatformIOS } from '../constant/statusBarHeight';

import Container, { BG_COLOR } from '../components/common/Container';
import ShoppingListSection from '../screen-component/home/ShoppingListSection';
import ExpiredFoodSection from '../screen-component/home/ExpiredFoodSection';
import FavoriteFoodSection from '../screen-component/home/FavoriteFoodSection';
import tw from 'twrnc';

const Home = () => {
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const { shoppingList } = useSelector((state) => state.shoppingList);

  const { allExpiredFoods } = useGetFoodList();

  return (
    <SafeAreaView edges={['top']} style={tw`${BG_COLOR}`}>
      <ScrollView
        contentContainerStyle={tw`pb-10 ${BG_COLOR}`}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <View
            style={tw`flex-row items-center justify-between ${
              PlatformIOS ? 'my-4' : 'mt-2 mb-4'
            }`}
          >
            <Text
              style={tw.style(
                `text-blue-600 ${PlatformIOS ? 'text-[22px]' : 'text-2xl'}`,
                Cafe24Ssurround
              )}
            >
              냉장고에 뭐가 있지?
            </Text>
          </View>

          <ShoppingListSection foodList={shoppingList} />

          <ExpiredFoodSection foodList={allExpiredFoods()} />

          <FavoriteFoodSection foodList={favoriteFoods} />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
