import { Pressable, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { closeKeyboard } from '../util';
import { useSelector } from '../redux/hook';
import { useState } from 'react';

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
  const [closeSearchedList, setCloseSearchList] = useState(false);

  const { height } = useWindowDimensions();

  const onEmptySpacePress = () => {
    closeKeyboard();
    setCloseSearchList(true);
  };

  return (
    <SafeAreaView edges={['bottom']} style={tw`${BG_COLOR} flex-1`}>
      <Pressable style={tw`flex-1`} onPress={onEmptySpacePress}>
        <Container>
          <View style={tw`flex-1`}>
            <HomeHeader title='냉장고에 뭐가 있지'>
              <HeaderIconBtn iconName='setting' iconSize={21} />
            </HomeHeader>

            <View
              style={tw`h-[${height * 0.78}px] 
              mt-12 justify-center pb-2 items-center gap-1.5 overflow-hidden`}
            >
              {!purchased && <FoodLimit />}

              <View style={tw`py-2 gap-1 min-h-[${height * 0.6}px] `}>
                <NavigationBtnBox />

                <Fridge />

                <PantryEntranceBtn />
              </View>
            </View>

            <SearchFoodSection
              closeSearchedList={closeSearchedList}
              setCloseSearchList={setCloseSearchList}
            />
          </View>
        </Container>
      </Pressable>
    </SafeAreaView>
  );
}
