import { Keyboard, Pressable, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useImageLoad } from '../hooks';
import { useState } from 'react';
import { Food } from '../constant/foodInfo';
import { navigationBtns } from '../constant/navigationBtn';
import { findAsset } from '../util';

import Container, { BG_COLOR } from '../components/common/Container';
import SearchFoodSection from '../screen-component/home/SearchFoodSection';
import Fridge from '../components/fridge/Fridge';
import SearchedFoodList from '../screen-component/home/SearchedFoodList';
import NavigationBtnBox from '../screen-component/home/NavigationBtnBox';
import PantyEntranceBtn from '../screen-component/home/PantyEntranceBtn';
import HomeHeader from '../screen-component/home/HomeHeader';
import tw from 'twrnc';

const Home = () => {
  const [keyword, setKeyword] = useState('');
  const [searchedFoods, setSearchedFoods] = useState<Food[]>([]);

  const { height } = useWindowDimensions();

  const { isLoaded, assets } = useImageLoad({
    images: [
      require('../assets/food/apple.png'),
      require('../assets/food/meat.png'),
      require('../assets/shoppinglist.png'),
      require('../assets/expired-foods.png'),
      require('../assets/favorite-foods.png'),
    ],
  });

  if (!isLoaded) return null;

  return (
    <SafeAreaView edges={['top', 'bottom']} style={tw`${BG_COLOR} flex-1`}>
      <Pressable style={tw`flex-1`} onPress={() => Keyboard.dismiss()}>
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

              <View style={tw`absolute top-12 w-full`}>
                <SearchFoodSection
                  keyword={keyword}
                  setKeyword={setKeyword}
                  setSearchedFoods={setSearchedFoods}
                />
                <SearchedFoodList
                  keyword={keyword}
                  searchedFoods={searchedFoods}
                />
              </View>

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
