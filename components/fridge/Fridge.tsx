import { Keyboard, View, useWindowDimensions } from 'react-native';
import { TouchableOpacity } from '../common/native-component';
import { useSelector } from '../../redux/hook';
import { Space, SpaceSide } from '../../constant/fridgeInfo';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';
import { shadowStyle } from '../../constant/shadowStyle';
import { FRIDGE_COLOR } from '../../constant/colors';
import { useRouteName } from '../../hooks/useRouteName';

import FridgeSpaceInfo from '../../screen-component/home/FridgeSpaceInfo';
import FridgeInfo from '../../screen-component/fridge-setting/FridgeInfo';
import SvgFridgeContainer from './SvgFridgeContainer';
import tw from 'twrnc';

export default function Fridge() {
  const {
    fridgeInfo: { compartments, freezer },
  } = useSelector((state) => state.fridgeInfo);

  const navigation = useNavigation<NavigateProp>();
  const { routeFridgeSetting } = useRouteName();

  const { height } = useWindowDimensions();

  const homeFridgeHeight = height * 0.5 >= 400 ? 370 : height * 0.49;
  const fridgeHeight = routeFridgeSetting ? 160 : homeFridgeHeight;

  return (
    <View
      style={tw`w-[${fridgeHeight / 1.2}px] h-[${fridgeHeight}px] self-center`}
    >
      <View style={tw`flex-row flex-1 justify-end items-end`}>
        <View style={tw`absolute`}>
          <SvgFridgeContainer height={fridgeHeight} />
        </View>

        <View style={tw`flex-row w-[86%] mr-[3%] mt-0.5`}>
          {(['안쪽', '문쪽'] as SpaceSide[]).map((side) => (
            <View
              key={side}
              style={tw.style(
                `h-[91%] flex-1 rounded-lg border
                ${freezer === 'top' ? '' : 'flex-col-reverse'}
                ${routeFridgeSetting ? '' : 'p-0.5'} ${FRIDGE_COLOR} `,
                shadowStyle(8)
              )}
            >
              {([`냉동실 ${side}`, `냉장실 ${side}`] as Space[]).map(
                (space) => (
                  <TouchableOpacity
                    key={space}
                    disabled={routeFridgeSetting}
                    style={tw`${space.includes('냉동') ? 'h-[40%]' : 'h-[60%]'} 
                    ${routeFridgeSetting ? 'p-0.8' : 'p-1.2'}`}
                    onPress={() => {
                      Keyboard.dismiss();
                      navigation.navigate('Compartments', { space });
                    }}
                  >
                    {!routeFridgeSetting ? (
                      <FridgeSpaceInfo space={space} />
                    ) : (
                      <FridgeInfo space={space} compartments={compartments} />
                    )}
                  </TouchableOpacity>
                )
              )}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
