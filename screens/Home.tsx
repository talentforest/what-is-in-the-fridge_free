import { fonts } from '../constant/fonts';
import { useFonts } from 'expo-font';
import { SafeBottomAreaView, Text } from '../components/native-component';
import { ScrollView, View, Image } from 'react-native';
import { useSelector } from '../redux/hook';
import tw from 'twrnc';
import BannerSlider from '../components/screen-component/home/BannerSlider';
import Header from '../components/screen-component/home/Header';
import Footer from '../components/screen-component/home/Footer';
import EntranceBox from '../components/screen-component/home/EntranceBox';
import useImageLoad from '../hooks/useImageLoad';
import useExpiredFood from '../hooks/useExpiredFoods';
import SmallFoodTag from '../components/common/SmallFoodTag';
import EmptyTag from '../components/common/EmptyTag';

const Home = () => {
  const { allLeftAndExpiredFoods } = useExpiredFood();
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const [fontsLoaded] = useFonts(fonts);

  const { isLoaded, assets } = useImageLoad({
    images: [
      require('../assets/fridge.png'),
      require('../assets/organize-fridge.png'),
      require('../assets/shopping.png'),
    ],
  });

  if (!fontsLoaded || !isLoaded) return null;

  return (
    <SafeBottomAreaView>
      <ScrollView style={tw`px-4 mt-14`}>
        <Header />
        <View style={tw`flex-row justify-between gap-2 mt-2`}>
          {assets && (
            <EntranceBox title='나의 냉장고' destination='EntranceFridgeSpace'>
              {assets && (
                <Image
                  source={assets[0]}
                  style={tw`w-20 h-20 self-center mt-2`}
                />
              )}
            </EntranceBox>
          )}
          {assets && (
            <EntranceBox title='나의 장바구니 목록' destination='ShoppingList'>
              {assets && (
                <Image
                  source={assets[2]}
                  style={tw`w-20 h-20 self-center mt-2`}
                />
              )}
            </EntranceBox>
          )}
        </View>
        {assets && <BannerSlider assets={assets} />}
        <View style={tw`gap-2`}>
          <EntranceBox title='자주 먹는 식료품' destination='FavoriteFoods'>
            {favoriteFoods.length !== 0 ? (
              <View style={tw`gap-1 flex-1 flex-row flex-wrap`}>
                {favoriteFoods.slice(0, 8).map((food) => (
                  <SmallFoodTag key={food.id} food={food} />
                ))}
                {favoriteFoods.length > 8 && <Text styletw='pt-2'>...</Text>}
              </View>
            ) : (
              <EmptyTag tagName='아직 자주 먹는 식료품 정보가 없습니다' />
            )}
          </EntranceBox>
          <EntranceBox
            title='유통기한이 임박한 식료품'
            destination='ExpiredFoods'
          >
            {allLeftAndExpiredFoods.length !== 0 ? (
              <View style={tw`gap-1 flex-row flex-wrap`}>
                {allLeftAndExpiredFoods.slice(0, 8).map((food) => (
                  <SmallFoodTag key={food.id} food={food} />
                ))}
                {allLeftAndExpiredFoods.length > 8 && (
                  <Text styletw='pt-2'>...</Text>
                )}
              </View>
            ) : (
              <EmptyTag tagName='아직 유통기한이 임박한 식료품이 없습니다' />
            )}
          </EntranceBox>
        </View>
        <Footer />
      </ScrollView>
    </SafeBottomAreaView>
  );
};

export default Home;
