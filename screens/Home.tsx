import { ScrollView, View } from 'react-native';
import { Text } from '../components/common/native-component';
import { useSelector } from '../redux/hook';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Cafe24Ssurround } from '../constant/fonts';
import { useGetFoodList } from '../hooks';
import { PlatformIOS } from '../constant/statusBarHeight';

import EntranceBox from '../screen-component/home/EntranceBox';
import Container, { BG_COLOR } from '../components/common/Container';
import tw from 'twrnc';

const Home = () => {
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const { shoppingList } = useSelector((state) => state.shoppingList);

  const { allExpiredFoodList } = useGetFoodList();

  return (
    <SafeAreaView edges={['top']} style={tw`${BG_COLOR}`}>
      <ScrollView
        contentContainerStyle={tw`pb-10 ${BG_COLOR}`}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <View
            style={tw`flex-row items-center justify-between ${
              PlatformIOS ? 'mb-3' : 'mt-2 mb-4'
            }`}
          >
            <Text
              style={tw.style(
                `text-stone-700 ${PlatformIOS ? 'text-[22px]' : 'text-2xl'}`,
                Cafe24Ssurround
              )}
            >
              냉장고에 뭐가 있지?
            </Text>
          </View>

          <EntranceBox
            foods={shoppingList}
            info={{
              title: '장보기 목록 식료품',
              desc: '장보기 목록에 쉽게 추가하고 관리할 수 있어요.',
              iconName: 'cart',
              route: 'ShoppingList',
            }}
            color='blue'
          />

          <EntranceBox
            foods={allExpiredFoodList}
            info={{
              title: '유통기한 주의 식료품',
              desc: '유통기한 주의 식료품을 한눈에 파악할 수 있어요.',
              iconName: 'alert-circle',
              route: 'ExpiredFoods',
            }}
            color='amber'
          />

          <EntranceBox
            foods={favoriteFoods}
            info={{
              title: '자주 먹는 식료품',
              desc: '현재 어떤 식료품이 없는지 확인할 수 있어요.',
              iconName: 'tag-heart',
              route: 'FavoriteFoods',
            }}
            color='indigo'
          />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
