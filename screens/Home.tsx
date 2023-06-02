import { fonts } from '../constant/fonts';
import { useFonts } from 'expo-font';
import { Platform, ScrollView, StatusBar, View } from 'react-native';
import { useSelector } from '../redux/hook';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Text } from '../components/native-component';
import { BG_LIGHT_GRAY, GRAY } from '../constant/colors';
import BannerSlider from '../components/screen-component/home/BannerSlider';
import Header from '../components/screen-component/home/Header';
import Footer from '../components/screen-component/home/Footer';
import EntranceBox from '../components/screen-component/home/EntranceBox';
import useImageLoad from '../hooks/useImageLoad';
import useExpiredFood from '../hooks/useExpiredFoods';
import Icon from 'react-native-vector-icons/Octicons';
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
    <ScrollView
      style={tw`pt-[${(statusBarHeight || 0) + 14}px] bg-[${BG_LIGHT_GRAY}]`}
      contentContainerStyle={tw`pb-10 px-4`}
      showsVerticalScrollIndicator={false}
    >
      <Header />
      <View style={tw`border border-slate-300 bg-white p-3 rounded-lg`}>
        <Text styletw='text-base text-indigo-600'>나의 냉장고 정보</Text>
        <View style={tw`self-center mt-5 mb-2`}>
          <Text styletw='text-slate-500 mb-2'>
            냉장고 정보가 아직 설정되지 않았습니다.
          </Text>
          <View
            style={tw`flex-row items-center gap-2 self-center border border-slate-400 rounded-lg bg-amber-300 px-3 py-2`}
          >
            <Text styletw='text-slate-700'>설정하러 가기</Text>
            <Icon name='chevron-right' size={18} color={GRAY} />
          </View>
        </View>
      </View>

      <EntranceBox
        foods={favoriteFoods.slice(0, 10)}
        title='자주 먹는 식료품 목록'
      />

      {assets && <BannerSlider assets={[assets[0], assets[1]]} />}

      <EntranceBox
        foods={allExpiredFoods.slice(0, 10)}
        title='유통기한 주의 식료품 목록'
      />

      <Footer />
    </ScrollView>
  );
};

export default Home;
