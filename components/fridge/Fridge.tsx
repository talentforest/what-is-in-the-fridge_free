import { View, useWindowDimensions } from 'react-native';
import { TouchableOpacity } from '../common/native-component';
import { useSelector } from '../../redux/hook';
import { Space, SpaceSide } from '../../constant/fridgeInfo';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';
import { useRouteName } from '../../hooks/useRouteName';
import { closeKeyboard } from '../../util';

import FridgeSpaceInfo from '../../screen-component/home/FridgeSpaceInfo';
import FridgeInfo from '../../screen-component/fridge-setting/FridgeInfo';
import SvgFridgeContainer, {
  fridgeBorderColor,
  fridgeColor,
} from './SvgFridgeContainer';
import tw from 'twrnc';

export default function Fridge() {
  const {
    fridgeInfo: { compartments, freezer },
  } = useSelector((state) => state.fridgeInfo);

  const navigation = useNavigation<NavigateProp>();

  const { routeHome } = useRouteName();

  const { height, width } = useWindowDimensions();

  const homeFridgeHeight =
    height > 900
      ? width < 500
        ? 440
        : 500
      : height * 0.5 >= 400
      ? 372
      : height * 0.48;

  const fridgeHeight = routeHome ? homeFridgeHeight : 160;

  const onSpacePress = (space: Space) => {
    closeKeyboard();
    navigation.navigate('Compartments', { space });
  };

  return (
    <View style={tw`w-[${fridgeHeight / 1.2}px]  self-center`}>
      <View style={tw`h-[${fridgeHeight}px]`}>
        <View style={tw`flex-row flex-1 justify-end items-end`}>
          {/* 냉장고 그림 컨테이너 */}
          <View style={tw`absolute pb-0.5`}>
            <SvgFridgeContainer height={fridgeHeight} />
          </View>

          <View style={tw`flex-row w-[86%] mr-[3%] mt-0.5`}>
            {(['안쪽', '문쪽'] as SpaceSide[]).map((side) => (
              <View
                key={side}
                style={tw.style(
                  `h-[${routeHome ? '90%' : '89%'}] 
                  gap-2 flex-1 border border-[${fridgeBorderColor}] bg-[${fridgeColor}]
                  ${freezer === 'top' ? '' : 'flex-col-reverse'}
                  ${routeHome ? 'p-2 rounded-xl' : 'p-0.8 rounded-md'} `
                )}
              >
                {([`냉동실 ${side}`, `냉장실 ${side}`] as Space[]).map(
                  (space) => (
                    <TouchableOpacity
                      key={space}
                      disabled={!routeHome}
                      style={tw`h-[${space.includes('냉동') ? '37%' : '63%'}]`}
                      onPress={() => onSpacePress(space)}
                    >
                      {routeHome ? (
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
    </View>
  );
}
