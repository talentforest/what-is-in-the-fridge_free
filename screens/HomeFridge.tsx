import { Pressable, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { closeKeyboard } from '../util';
import { useSelector } from '../redux/hook';

import Container, { BG_COLOR } from '../components/common/Container';
import SearchFoodSection from '../screen-component/home/SearchFoodSection';
import Fridge from '../components/fridge/Fridge';
import NavigationBtnBox from '../screen-component/home/NavigationBtnBox';
import HomeHeader from '../screen-component/home/HomeHeader';
import PantryEntranceBtn from '../screen-component/home/PantryEntranceBtn';
import FoodLimit from '../screen-component/setting/FoodLimit';
import HeaderIconBtn from '../components/buttons/HeaderIconBtn';
import tw from 'twrnc';

export default function HomeFridge() {
  const { purchased } = useSelector((state) => state.purchaseState);

  const { height } = useWindowDimensions();

  return (
    <SafeAreaView edges={['bottom']} style={tw`${BG_COLOR} flex-1`}>
      <Pressable style={tw`flex-1`} onPress={closeKeyboard}>
        <Container>
          <View style={tw`flex-1`}>
            <HomeHeader title='냉장고에 뭐가 있지'>
              <HeaderIconBtn btn='setting' />
            </HomeHeader>

            <View
              style={tw`items-center gap-3 mt-12 mb-10 flex-1 overflow-hidden
              pt-${!purchased ? 12 : 16}  min-h-[${height * 0.55}px]`}
            >
              {!purchased && <FoodLimit />}

              <View style={tw`mt-4`}>
                <NavigationBtnBox />
                <Fridge />
              </View>

              <PantryEntranceBtn />
            </View>

            <SearchFoodSection />
          </View>
        </Container>
      </Pressable>
    </SafeAreaView>
  );
}
