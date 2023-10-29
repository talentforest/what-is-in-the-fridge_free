import { ScrollView, View } from 'react-native';
import { Text } from '../components/common/native-component';
import { useSelector } from '../redux/hook';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetFoodList } from '../hooks';
import { PlatformIOS } from '../constant/statusBarHeight';

import Container, { BG_COLOR } from '../components/common/Container';
import ShoppingListSection from '../screen-component/home/ShoppingListSection';
import ExpiredFoodSection from '../screen-component/home/ExpiredFoodSection';
import FavoriteFoodSection from '../screen-component/home/FavoriteFoodSection';
import SearchFoodSection from '../screen-component/home/SearchFoodSection';
import AnchoredBannerAd from '../components/ads/AnchoredBannerAd';
import tw from 'twrnc';

const Home = () => {
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const { shoppingList } = useSelector((state) => state.shoppingList);

  const { allExpiredFoods } = useGetFoodList();

  return (
    <SafeAreaView edges={['top']} style={tw`${BG_COLOR}`}>
      <ScrollView
        contentContainerStyle={tw`${BG_COLOR}`}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <View
            style={tw`flex-row items-center justify-between ${
              PlatformIOS ? 'my-4' : 'my-2'
            }`}
          >
            <Text
              style={tw.style(
                `text-[#3284FF] ${PlatformIOS ? 'text-[22px]' : 'text-2xl'}`
              )}
            >
              냉장고에 뭐가 있지
            </Text>
          </View>

          <SearchFoodSection />

          <ShoppingListSection foodList={shoppingList} />

          <ExpiredFoodSection foodList={allExpiredFoods()} />

          <FavoriteFoodSection foodList={favoriteFoods} />
        </Container>

        {/* 광고 */}
        <View style={tw`my-5`}>{/* <AnchoredBannerAd /> */}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
