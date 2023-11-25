import { View, useWindowDimensions } from 'react-native';
import { TouchableOpacity } from '../common/native-component';
import { useSelector } from '../../redux/hook';
import { Space, SpaceSide } from '../../constant/fridgeInfo';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';
import { shadowStyle } from '../../constant/shadowStyle';
import { FRIDGE_COLOR } from '../../constant/colors';
import { useRouteName } from '../../hooks/useRouteName';
import { closeKeyboard } from '../../util';

import FridgeSpaceInfo from '../../screen-component/home/FridgeSpaceInfo';
import FridgeInfo from '../../screen-component/fridge-setting/FridgeInfo';
import SvgFridgeContainer from './SvgFridgeContainer';
import FoodLimit from '../../screen-component/setting/FoodLimit';
import PantyEntranceBtn from '../../screen-component/home/PantyEntranceBtn';
import tw from 'twrnc';

export default function Fridge() {
  const { limit } = useSelector((state) => state.limit);
  const {
    fridgeInfo: { compartments, freezer },
  } = useSelector((state) => state.fridgeInfo);

  const navigation = useNavigation<NavigateProp>();

  const { routeFridgeSetting } = useRouteName();

  const { height, width } = useWindowDimensions();

  const homeFridgeHeight =
    height > 900
      ? width < 500
        ? 440
        : 500
      : height * 0.5 >= 400
      ? 370
      : height * 0.45;

  const fridgeHeight = routeFridgeSetting ? 160 : homeFridgeHeight;

  const onSpacePress = (space: Space) => {
    closeKeyboard();
    navigation.navigate('Compartments', { space });
  };

  return (
    <View style={tw`w-[${fridgeHeight / 1.2}px] self-center gap-0`}>
      {!routeFridgeSetting && <PantyEntranceBtn />}
      <View style={tw`h-[${fridgeHeight}px]`}>
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
                      style={tw`${routeFridgeSetting ? 'p-0.8' : 'p-1.2'} 
                    ${space.includes('냉동') ? 'h-[40%] pb-1' : 'h-[60%] pt-1'} 
                    `}
                      onPress={() => onSpacePress(space)}
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

      {limit && !routeFridgeSetting && <FoodLimit />}
    </View>
  );
}
