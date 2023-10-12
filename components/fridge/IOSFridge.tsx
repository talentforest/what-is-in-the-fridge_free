import { Keyboard, View } from 'react-native';
import { TouchableOpacity } from '../common/native-component';
import { useSelector } from '../../redux/hook';
import { Space, SpaceSide } from '../../constant/fridgeInfo';
import { getCompartments } from '../../util';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';
import { shadowStyle } from '../../constant/shadowStyle';
import { FRIDGE_COLOR } from '../../constant/colors';

import IOSFridgeContainer from './IOSFridgeContainer';
import FridgeSpaceInfo from '../../screen-component/my-fridge/FridgeSpaceInfo';
import FridgeInfo from '../../screen-component/fridge-setting/FridgeInfo';
import tw from 'twrnc';

export default function IOSFridge() {
  const {
    fridgeInfo: { compartments, freezer },
  } = useSelector((state) => state.fridgeInfo);

  const navigation = useNavigation<NavigateProp>();
  const route = useRoute();
  const routeFridgeSetting = route.name === 'FridgeSetting';

  const transformStyle = {
    transform: [{ skewY: '7deg' }, { translateY: routeFridgeSetting ? 4 : 9 }],
  };

  return (
    <IOSFridgeContainer routeFridgeSetting={routeFridgeSetting}>
      {(['안쪽', '문쪽'] as SpaceSide[]).map((side) => (
        <View
          key={side}
          style={tw.style(
            `${FRIDGE_COLOR} border 
            ${routeFridgeSetting ? '' : 'p-0.8'}
            ${freezer === 'top' ? '' : 'flex-col-reverse'} 
            ${side === '문쪽' ? 'w-[42%]' : 'w-[43%]'}
            rounded-${side.includes('문쪽') ? 'r' : 'l'}-lg`,
            side === '문쪽' ? transformStyle : {},
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
              style={tw`${space.includes('냉동') ? 'h-[40%]' : 'h-[60%]'}
              ${routeFridgeSetting ? 'p-1' : 'p-1.2'}`}
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
    </IOSFridgeContainer>
  );
}
