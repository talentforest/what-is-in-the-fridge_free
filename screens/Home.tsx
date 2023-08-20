import { fonts } from '../constant/fonts';
import { useFonts } from 'expo-font';
import { ScrollView } from 'react-native';
import { useSelector } from '../redux/hook';
import { statusBarHeight } from '../constant/statusBarHeight';
import { HEADER_BGCOLOR } from '../constant/colors';
import EntranceBox from '../components/screen-component/home/EntranceBox';
import useExpiredFood from '../hooks/useExpiredFoods';
import FridgeInfo from '../components/screen-component/home/FridgeInfo';
import LogoTitle from '../components/screen-component/home/LogoTitle';
import useImageLoad from '../hooks/useImageLoad';
import Container from '../components/common/layout/Container';
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const { allExpiredFoods } = useExpiredFood();
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const { shoppingList } = useSelector((state) => state.shoppingList);
  const [fontsLoaded] = useFonts(fonts);
  const { isLoaded, assets } = useImageLoad({
    images: [require('../assets/ice.png'), require('../assets/fruits.png')],
  });

  if (!fontsLoaded || !isLoaded) return null;

  return (
    <SafeAreaView edges={['top']} style={tw`bg-blue-50`}>
      <ScrollView
        contentContainerStyle={tw`pb-10 bg-blue-50`}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <LogoTitle />

          {assets && <FridgeInfo assets={assets} />}

          <EntranceBox
            foods={allExpiredFoods}
            info={{
              title: '유통기한 주의 식료품',
              desc: '유통기한 주의 식료품을 쉽게 관리해보세요.',
              iconName: 'alert-circle',
              bgColor: 'bg-slate-600',
              route: 'ExpiredFoods',
            }}
          />

          <EntranceBox
            foods={shoppingList}
            info={{
              title: '장봐야할 식료품',
              desc: '장보기 목록에 있는 식료품을 한눈에 볼 수 있어요.',
              iconName: 'cart',
              bgColor: 'bg-blue-500',
              route: 'ShoppingList',
            }}
          />

          <EntranceBox
            foods={favoriteFoods}
            info={{
              title: '자주 먹는 식료품',
              desc: '자주 먹는 식료품은 장보기 목록에 빠르게 추가하세요.',
              iconName: 'tag-heart',
              bgColor: 'bg-indigo-500',
              route: 'FavoriteFoods',
            }}
          />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
