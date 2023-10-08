import { Image, Keyboard, View } from 'react-native';
import { TouchableOpacity } from '../common/native-component';
import { useSelector } from '../../redux/hook';
import { Space, SpaceSide } from '../../constant/fridgeInfo';
import { getCompartments } from '../../util';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';
import { shadowStyle } from '../../constant/shadowStyle';
import { useImageLoad } from '../../hooks';
import { FRIDGE_COLOR } from '../../constant/colors';

import FridgeSpaceInfo from '../../screen-component/my-fridge/FridgeSpaceInfo';
import FridgeInfo from '../../screen-component/fridge-setting/FridgeInfo';
import tw from 'twrnc';

export default function AndroidFridge() {
  const {
    fridgeInfo: { compartments, freezer },
  } = useSelector((state) => state.fridgeInfo);

  const navigation = useNavigation<NavigateProp>();
  const route = useRoute();
  const routeFridgeSetting = route.name === 'FridgeSetting';

  const { isLoaded, assets } = useImageLoad({
    images: [
      require('../../assets/fridge-container.png'),
      require('../../assets/long-fridge-container.png'),
    ],
  });

  if (!isLoaded) return null;

  const margin = {
    top: routeFridgeSetting ? 4 : 9,
    left: routeFridgeSetting ? 4 : 8,
    right: routeFridgeSetting ? 1.5 : 2.5,
  };

  return (
    <View style={tw`flex-row flex-1`}>
      {/* 안드로이드 냉장고 이미지 */}
      {assets && (
        <View style={tw`absolute h-full w-full`}>
          <Image
            source={{
              uri: routeFridgeSetting
                ? (assets[0].localUri as string)
                : (assets[1].localUri as string),
            }}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
      )}

      {(['안쪽', '문쪽'] as SpaceSide[]).map((side) => (
        <View
          key={side}
          style={tw.style(
            `${freezer === 'top' ? '' : 'flex-col-reverse'}
            ${
              side === '문쪽'
                ? `w-[42%] mr-${margin.right}`
                : `ml-${margin.left} flex-1`
            } mt-${margin.top} border ${FRIDGE_COLOR}
            ${routeFridgeSetting ? '' : 'p-0.5'}
            ${`rounded-${side.includes('문쪽') ? 'r' : 'l'}-lg`}`,
            shadowStyle(8)
          )}
        >
          {([`냉동실 ${side}`, `냉장실 ${side}`] as Space[]).map((space) => (
            <TouchableOpacity
              key={space}
              disabled={routeFridgeSetting}
              onPress={() => {
                Keyboard.dismiss();
                navigation.navigate('Compartments', { space });
              }}
              style={tw`${space.includes('냉동') ? 'h-[40%]' : 'h-[60%]'} ${
                routeFridgeSetting ? 'p-0.8' : 'p-1.2'
              }`}
            >
              {/* 나의 냉장고 정보 */}
              {!routeFridgeSetting && (
                <FridgeSpaceInfo
                  space={space}
                  compartmentsLength={
                    getCompartments(compartments[space]).length
                  }
                />
              )}

              {/* 냉장고 설정 */}
              {routeFridgeSetting && (
                <FridgeInfo space={space} compartments={compartments} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}
