import { Keyboard, View } from 'react-native';
import { Text, TouchableOpacity } from './native-component';
import { useSelector } from '../../redux/hook';
import { Space } from '../../constant/fridgeInfo';
import { getCompartments } from '../../util';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontGmarketSansBold } from '../../constant/fonts';
import { NavigateProp } from '../../navigation/Navigation';

import CompartmentBox from '../../screen-component/fridge-setting/CompartmentBox';
import FridgeSpaceInfo from '../../screen-component/my-fridge/FridgeSpaceInfo';
import tw from 'twrnc';

export default function FridgeShape() {
  const route = useRoute();
  const routeFridgeSetting = route.name === 'FridgeSetting';
  const navigation = useNavigation<NavigateProp>();

  const {
    fridgeInfo: { compartments, freezer },
  } = useSelector((state) => state.fridgeInfo);

  const doorRadius = (space: Space) => {
    const size = routeFridgeSetting ? 'md' : 'lg';
    return space.includes('문쪽') ? `rounded-r-${size}` : `rounded-l-${size}`;
  };

  const spaceHeight = (space: Space) => {
    return space.includes('냉동') ? 'h-[40%]' : 'h-[60%]';
  };

  const spaceColor = (space: Space) => {
    return space.includes('냉동') ? 'blue' : 'stone';
  };

  const freezerPosition = freezer === 'top' ? '' : 'flex-col-reverse';

  return (
    <View style={tw`flex-row flex-1`}>
      {['안쪽', '문쪽'].map((side) => (
        <View key={side} style={tw`${freezerPosition} flex-1`}>
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
                  p-1.8 bg-stone-200 border border-stone-400`}
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
                <View
                  style={tw`border border-slate-400 bg-slate-300 
                  ${doorRadius(space)} justify-center`}
                >
                  <View
                    style={tw`absolute w-full h-full
                    ${doorRadius(space)} bg-white opacity-70`}
                  />
                  <View style={tw`absolute z-10 w-full`}>
                    <Text
                      style={tw.style(
                        `text-center text-${spaceColor(space)}-600 text-sm`,
                        FontGmarketSansBold
                      )}
                    >
                      {space.slice(0, 3)}
                    </Text>
                    <Text
                      style={tw.style(
                        `text-center text-${spaceColor(space)}-600 text-sm`,
                        FontGmarketSansBold
                      )}
                    >
                      {space.slice(3)}
                    </Text>
                  </View>
                  <View style={tw`h-full gap-1 p-1`}>
                    {getCompartments(compartments[space]).map(
                      ({ compartmentNum }) => (
                        <CompartmentBox
                          key={compartmentNum}
                          space={space}
                          compartmentNum={compartmentNum}
                        />
                      )
                    )}
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}
