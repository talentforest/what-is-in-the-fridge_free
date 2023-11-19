import { Pressable, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useImageLoad } from '../hooks';
import { navigationBtns } from '../constant/navigationBtn';
import { closeKeyboard, findAsset } from '../util';

import Container, { BG_COLOR } from '../components/common/Container';
import SearchFoodSection from '../screen-component/home/SearchFoodSection';
import Fridge from '../components/fridge/Fridge';
import NavigationBtnBox from '../screen-component/home/NavigationBtnBox';
import PantyEntranceBtn from '../screen-component/home/PantyEntranceBtn';
import HomeHeader from '../screen-component/home/HomeHeader';
import tw from 'twrnc';

const Home = () => {
  const { isLoaded, assets } = useImageLoad({
    images: [
      require('../assets/food/apple.png'),
      require('../assets/food/meat.png'),
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
          <View style={tw`flex-1`}>
            <View style={tw`flex-1 mt-1`}>
              <HomeHeader />

              <View
                style={tw`items-center justify-center mt-15 mb-2 flex-1 
                min-h-[${height * 0.6}px]`}
              >
                <PantyEntranceBtn />
                <Fridge />
              </View>

              <SearchFoodSection />

              {assets && (
                <View style={tw`pb-12 gap-1 flex-row justify-between`}>
                  {navigationBtns.map(
                    ({ title, assetName, navigationName }) => (
                      <NavigationBtnBox
                        key={title}
                        title={title}
                        uri={findAsset(assets, assetName).localUri}
                        navigatonName={navigationName}
                      />
                    )
                  )}
                </View>
              )}
            </View>
          </View>
        </Container>
      </Pressable>
    </SafeAreaView>
  );
};

export default Home;
