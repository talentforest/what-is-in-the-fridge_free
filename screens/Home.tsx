import { fonts } from '../constant/fonts';
import { useFonts } from 'expo-font';
import { SafeAreaView } from '../components/native-component';
import { ScrollView, View, Image } from 'react-native';
import { useSelector } from '../redux/hook';
import tw from 'twrnc';
import BannerSlider from '../components/screen-component/home/BannerSlider';
import Header from '../components/screen-component/home/Header';
import FoodTagList from '../components/common/FoodTagList';
import Footer from '../components/screen-component/home/Footer';
import EntranceBox from '../components/screen-component/home/EntranceBox';
import useImageLoad from '../hooks/useImageLoad';
import useExpiredFood from '../hooks/useExpiredFoods';

const Home = () => {
  const { allThreeDaysLeftFoods, allExpiredFoods } = useExpiredFood();
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
    <SafeAreaView>
      <ScrollView style={tw`px-4 mt-4`}>
        <Header />
        <View style={tw`flex-row justify-between gap-2 mt-2`}>
          {assets && (
            <EntranceBox title='나의 냉장고' destination='EntranceFridge'>
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
          <EntranceBox title='자주 먹는 식료품' destination='Favorite'>
            <FoodTagList foods={favoriteFoods} sm />
          </EntranceBox>
          <EntranceBox
            title='유통기한이 임박한 식료품'
            destination='ExpiredFoods'
          >
            <FoodTagList
              foods={[...allThreeDaysLeftFoods, ...allExpiredFoods]}
              sm
            />
          </EntranceBox>
        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
