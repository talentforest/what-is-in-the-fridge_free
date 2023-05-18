import { fonts } from '../constant/fonts';
import { useFonts } from 'expo-font';
import { Text } from '../components/native-component';
import { Platform, ScrollView, StatusBar, View } from 'react-native';
import { useSelector } from '../redux/hook';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import tw from 'twrnc';
import BannerSlider from '../components/screen-component/home/BannerSlider';
import Header from '../components/screen-component/home/Header';
import Footer from '../components/screen-component/home/Footer';
import EntranceBox from '../components/screen-component/home/EntranceBox';
import useImageLoad from '../hooks/useImageLoad';
import useExpiredFood from '../hooks/useExpiredFoods';
import SmallFoodTag from '../components/common/SmallFoodTag';
import EmptyTag from '../components/common/EmptyTag';
import FridgeInfo from '../components/screen-component/home/FridgeInfo';

const Home = () => {
  const { allLeftAndExpiredFoods } = useExpiredFood();
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const [fontsLoaded] = useFonts(fonts);

  const { isLoaded, assets } = useImageLoad({
    images: [
      require('../assets/fridge.png'),
      require('../assets/select-food.png'),
      require('../assets/shopping-list.png'),
      require('../assets/magnifier-fridge.png'),
      require('../assets/foods-in-fridge.png'),
    ],
  });

  if (!fontsLoaded || !isLoaded) return null;

  const statusBarHeight =
    Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

  return (
    <ScrollView
      style={tw`pt-[${(statusBarHeight || 0) + 14}px] bg-neutral-50`}
      contentContainerStyle={tw`pb-10 px-4`}
    >
      <Header />
      {assets && <BannerSlider assets={assets} />}
      {assets && <FridgeInfo asset={[assets[3], assets[4]]} />}
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
      <EntranceBox title='유통기한이 임박한 식료품' destination='ExpiredFoods'>
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
      <Footer />
    </ScrollView>
  );
};

export default Home;
