import { Keyboard, Platform, View } from 'react-native';
import { TouchableOpacity } from './native-component';
import { useSelector } from '../../redux/hook';
import { Space, SpaceSide } from '../../constant/fridgeInfo';
import { getCompartments } from '../../util';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PlatformIOS } from '../../constant/statusBarHeight';
import { NavigateProp } from '../../navigation/Navigation';
import { shadowStyle } from '../../constant/shadowStyle';

import FridgeSpaceInfo from '../../screen-component/my-fridge/FridgeSpaceInfo';
import FridgeInfo from '../../screen-component/fridge-setting/FridgeInfo';
import FridgeShape, {
  FRIDGE_COLOR,
} from '../../screen-component/my-fridge/FridgeShape';
import tw from 'twrnc';

export default function Fridge() {
  const {
    fridgeInfo: { compartments, freezer },
  } = useSelector((state) => state.fridgeInfo);

  const route = useRoute();
  const routeFridgeSetting = route.name === 'FridgeSetting';
  const navigation = useNavigation<NavigateProp>();

  const doorRadius = (space: Space) => {
    return space.includes('문쪽') ? `rounded-r-lg` : `rounded-l-lg`;
  };

  const spaceHeight = (space: Space) => {
    return space.includes('냉동') ? 'h-[40%]' : 'h-[60%]';
  };

  const sideStyle = (side: SpaceSide) => {
    const iosStyle = side === '문쪽' ? 'w-[43%]' : 'w-[45%]';
    return PlatformIOS ? iosStyle : 'flex-1';
  };

  const transformStyle = (side: SpaceSide) => {
    return side === '문쪽'
      ? Platform.select({
          ios: {
            transform: [
              { skewY: '7deg' },
              { translateY: routeFridgeSetting ? 4 : 9 },
            ],
          },
        })
      : {};
  };

  const freezerPosition = freezer === 'top' ? '' : 'flex-col-reverse';

  return (
    <FridgeShape>
      {(['안쪽', '문쪽'] as SpaceSide[]).map((side) => (
        <View
          key={side}
          style={tw.style(
            `${freezerPosition} ${sideStyle(side)}`,
            transformStyle(side),
            shadowStyle(8)
          )}
        >
          {([`냉동실 ${side}`, `냉장실 ${side}`] as Space[]).map((space) => (
            <TouchableOpacity
              key={space}
              disabled={routeFridgeSetting ? true : false}
              onPress={() => {
                Keyboard.dismiss();
                navigation.navigate('Compartments', { space });
              }}
              style={tw`${spaceHeight(space)}`}
            >
              {/* 나의 냉장고 정보 */}
              {!routeFridgeSetting && (
                <View
                  style={tw`${doorRadius(space)} 
                  p-1.8 ${FRIDGE_COLOR} border`}
                >
                  <FridgeSpaceInfo
                    space={space}
                    compartmentsLength={
                      getCompartments(compartments[space]).length
                    }
                  />
                </View>
              )}

              {/* 냉장고 설정 */}
              {routeFridgeSetting && (
                <FridgeInfo space={space} compartments={compartments} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </FridgeShape>
  );
}
