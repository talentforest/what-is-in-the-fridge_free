import { fonts } from '../constant/fonts';
import { useFonts } from 'expo-font';
import { Platform, ScrollView, StatusBar, View } from 'react-native';
import { useSelector } from '../redux/hook';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import EntranceBox from '../components/screen-component/home/EntranceBox';
import useExpiredFood from '../hooks/useExpiredFoods';
import FridgeInfo from '../components/screen-component/home/FridgeInfo';
import ShoppingListBox from '../components/screen-component/home/ShoppingListBox';
import LogoTitle from '../components/screen-component/home/LogoTitle';
import tw from 'twrnc';
import useImageLoad from '../hooks/useImageLoad';

const Home = () => {
  const { allExpiredFoods } = useExpiredFood();
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const [fontsLoaded] = useFonts(fonts);
  const { isLoaded, assets } = useImageLoad({
    images: [require('../assets/ice.png'), require('../assets/fruits.png')],
  });

  if (!fontsLoaded || !isLoaded) return null;

  const statusBarHeight =
    Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

  return (
    <ScrollView
      style={tw`pt-[${(statusBarHeight || 0) + 14}px] bg-blue-50`}
      contentContainerStyle={tw`pb-20 px-4`}
      showsVerticalScrollIndicator={false}
    >
      <LogoTitle />

      {assets && <FridgeInfo assets={assets} />}

      <ShoppingListBox />

      <EntranceBox
        foods={favoriteFoods.slice(0, 10)}
        title='자주 먹는 식료품'
        desc='자주 먹는 식료품은 냉장고에 더 빠르게 추가하세요.'
      />
      <EntranceBox
        foods={allExpiredFoods.slice(0, 10)}
        title='유통기한 주의 식료품'
        desc='유통기한 주의 식료품을 쉽게 관리해보세요.'
      />
    </ScrollView>
  );
};

export default Home;
