import { Pressable, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { closeKeyboard } from '../util';
import { useSelector } from '../redux/hook';
import { useState } from 'react';

import Container, { BG_COLOR } from '../components/common/Container';
import SearchFoodSection from '../screen-component/home/SearchFoodSection';
import Fridge from '../components/fridge/Fridge';
import EntranceAllFoodsBtn from '../screen-component/home/EntranceAllFoodsBtn';
import HomeHeader from '../screen-component/home/HomeHeader';
import EntrancePantryBtn from '../screen-component/home/EntrancePantryBtn';
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

            <View style={tw`h-[${height * 0.78}px] mt-12`}>
              <View
                style={tw`flex-1 justify-center gap-5 items-center overflow-hidden`}
              >
                {!purchased && <FoodLimit />}

                <View style={tw`min-h-[${height * 0.6}px]`}>
                  <EntranceAllFoodsBtn />
                  <Fridge />
                  <EntrancePantryBtn />
                </View>
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
