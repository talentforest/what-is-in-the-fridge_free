import { fonts } from '../constant/fonts';
import { useFonts } from 'expo-font';
import { Platform, ScrollView, StatusBar, View } from 'react-native';
import { useSelector } from '../redux/hook';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { BG_LIGHT_GRAY } from '../constant/colors';
import { SafeBottomAreaView, Text } from '../components/native-component';
import BannerSlider from '../components/screen-component/home/BannerSlider';
import Footer from '../components/screen-component/home/Footer';
import EntranceBox from '../components/screen-component/home/EntranceBox';
import useImageLoad from '../hooks/useImageLoad';
import useExpiredFood from '../hooks/useExpiredFoods';
import FridgeInfo from '../components/screen-component/home/FridgeInfo';
import tw from 'twrnc';

const Home = () => {
  const { allExpiredFoods } = useExpiredFood();
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const [fontsLoaded] = useFonts(fonts);

  const { isLoaded, assets } = useImageLoad({
    images: [
      require('../assets/fridge.png'),
      require('../assets/shopping-list.png'),
      require('../assets/magnifier-fridge.png'),
      require('../assets/foods-in-fridge.png'),
    ],
  });

  if (!fontsLoaded || !isLoaded) return null;

  const statusBarHeight =
    Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

  return (
    <SafeBottomAreaView>
      <ScrollView
        style={tw`pt-[${(statusBarHeight || 0) + 14}px] bg-[${BG_LIGHT_GRAY}]`}
        contentContainerStyle={tw`pb-10 px-4`}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`flex-row items-center justify-between mb-3`}>
          <Text styletw='flex-1 text-xl'>냉장고에 뭐가 있지?</Text>
        </View>
        <FridgeInfo />
        <EntranceBox
          foods={favoriteFoods.slice(0, 10)}
          title='자주 먹는 식료품'
        />
        {assets && <BannerSlider assets={[assets[0], assets[1]]} />}
        <EntranceBox
          foods={allExpiredFoods.slice(0, 10)}
          title='유통기한 주의 식료품'
        />
        <Footer />
      </ScrollView>
    </SafeBottomAreaView>
  );
};

export default Home;
