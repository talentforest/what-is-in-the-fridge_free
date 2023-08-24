import { fonts } from '../constant/fonts';
import { useFonts } from 'expo-font';
import { ScrollView } from 'react-native';
import { useSelector } from '../redux/hook';
import { SafeAreaView } from 'react-native-safe-area-context';
import EntranceBox from '../components/screen-component/home/EntranceBox';
import useExpiredFood from '../hooks/useExpiredFoods';
import FridgeInfo from '../components/screen-component/home/FridgeInfo';
import LogoTitle from '../components/screen-component/home/LogoTitle';
import useImageLoad from '../hooks/useImageLoad';
import Container from '../components/common/layout/Container';
import tw from 'twrnc';

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
            foods={shoppingList}
            info={{
              title: '장봐야할 식료품',
              desc: '장봐야할 식료품을 쉽게 추가하고 관리하세요.',
              iconName: 'cart',
              bgColor: 'bg-blue-500',
              route: 'ShoppingList',
            }}
          />

          <EntranceBox
            foods={allExpiredFoods}
            info={{
              title: '유통기한 주의 식료품',
              desc: '유통기한 주의 식료품을 한눈에 파악하세요.',
              iconName: 'alert-circle',
              bgColor: 'bg-slate-600',
              route: 'ExpiredFoods',
            }}
          />

          <EntranceBox
            foods={favoriteFoods}
            info={{
              title: '자주 먹는 식료품',
              desc: '현재 어떤 자주 먹는 식료품이 없는지 확인하세요.',
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
