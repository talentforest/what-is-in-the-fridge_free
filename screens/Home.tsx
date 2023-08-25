import { ScrollView } from 'react-native';
import { useSelector } from '../redux/hook';
import { SafeAreaView } from 'react-native-safe-area-context';
import EntranceBox from '../components/screen-component/home/EntranceBox';
import useExpiredFood from '../hooks/useExpiredFoods';
import LogoTitle from '../components/screen-component/home/LogoTitle';
import Container from '../components/common/layout/Container';
import tw from 'twrnc';

const Home = () => {
  const { allExpiredFoods } = useExpiredFood();
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const { shoppingList } = useSelector((state) => state.shoppingList);

  return (
    <SafeAreaView edges={['top']} style={tw`bg-blue-50`}>
      <ScrollView
        contentContainerStyle={tw`pb-10 bg-blue-50`}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <LogoTitle />

          <EntranceBox
            foods={shoppingList}
            info={{
              title: '장보기 목록 식료품',
              desc: '장보기 목록 식료품을 쉽게 추가하고 관리할 수 있어요.',
              iconName: 'cart',
              bgColor: 'bg-blue-500',
              route: 'ShoppingList',
            }}
          />

          <EntranceBox
            foods={allExpiredFoods}
            info={{
              title: '유통기한 주의 식료품',
              desc: '유통기한 주의 식료품을 한눈에 파악할 수 있어요.',
              iconName: 'alert-circle',
              bgColor: 'bg-amber-500',
              route: 'ExpiredFoods',
            }}
          />

          <EntranceBox
            foods={favoriteFoods}
            info={{
              title: '자주 먹는 식료품',
              desc: '현재 어떤 식료품이 없는지 확인할 수 있어요.',
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
