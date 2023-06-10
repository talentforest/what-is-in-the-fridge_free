import { FontGmarketSansBold, fonts } from '../constant/fonts';
import { useFonts } from 'expo-font';
import {
  Dimensions,
  Platform,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
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

// 6. 배너 슬라이드 이미지....
// 1. 냉장고 문쪽 칸막이 추가.
// 2. 자주 먹는 식료품에도 input 추가?
// 3. FridgeShape 하나의 컴포넌트로. 그래서 props에 따라 안의 내용 보여주고 안보여주고 하면 되잖아.
//    --- 그런데. 칸 자체를 이미지로 못하나??
// 4. 식품 정보 입력 설정 삭제
// 5. 데이터 관리

// 식료품 없을 때 보여줄 이미지도 필요.

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
        contentContainerStyle={tw`pb-4 px-4`}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`flex-row items-center justify-between mb-5`}>
          <Text style={tw.style({ ...FontGmarketSansBold })} fontSize={18}>
            냉장고에 뭐가 있지?
          </Text>
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
