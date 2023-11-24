import { Pressable, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useImageLoad } from '../hooks';
import { navigationBtns } from '../constant/navigationBtn';
import { closeKeyboard, findAsset } from '../util';

import Container, { BG_COLOR } from '../components/common/Container';
import SearchFoodSection from '../screen-component/home/SearchFoodSection';
import Fridge from '../components/fridge/Fridge';
import NavigationBtnBox from '../screen-component/home/NavigationBtnBox';
import HomeHeader from '../screen-component/home/HomeHeader';
import tw from 'twrnc';

const Home = () => {
  const { isLoaded, assets } = useImageLoad({
    images: [
      require('../assets/shoppinglist.png'),
      require('../assets/expired-foods.png'),
      require('../assets/favorite-foods.png'),
    ],
  });

  const { height } = useWindowDimensions();

  if (!isLoaded) return null;

  return (
    <SafeAreaView edges={['top', 'bottom']} style={tw`${BG_COLOR} flex-1`}>
      <Pressable style={tw`flex-1`} onPress={closeKeyboard}>
        <Container>
          <View style={tw`flex-1 mt-1`}>
            <HomeHeader />

            <View
              style={tw`items-center justify-center mt-12 flex-1 
                min-h-[${height * 0.6}px]`}
            >
              <Fridge />
            </View>

            <SearchFoodSection />

            {assets && (
              <View style={tw`gap-1 flex-row justify-between mb-10`}>
                {navigationBtns.map((btn) => (
                  <NavigationBtnBox
                    key={btn.title}
                    btn={btn}
                    uri={findAsset(assets, btn.assetName).localUri}
                  />
                ))}
              </View>
            )}
          </View>
        </Container>
      </Pressable>
    </SafeAreaView>
  );
};

export default Home;
