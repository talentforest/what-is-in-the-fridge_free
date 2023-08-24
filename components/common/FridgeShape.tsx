import { View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import { useSelector } from '../../redux/hook';
import { Space } from '../../constant/fridgeInfo';
import { getCompartments, scaleH } from '../../util';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontGmarketSansBold } from '../../constant/fonts';
import { NavigateProp } from '../../navigation/Navigation';
import CompartmentBox from '../screen-component/fridge-setting/CompartmentBox';
import FridgeSpace from '../screen-component/my-fridge/FridgeSpace';
import tw from 'twrnc';

export default function FridgeShape() {
  const navigation = useNavigation<NavigateProp>();
  const route = useRoute();
  const routeFridgeSetting = route.name === 'FridgeSetting';

  const {
    fridgeInfo: { compartments, freezer },
  } = useSelector((state) => state.fridgeInfo);

  const doorRadius = (space: Space) => {
    return space.includes('문쪽') ? 'rounded-r-lg' : 'rounded-l-lg';
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
              disabled={!routeFridgeSetting ? false : true}
              onPress={() => navigation.navigate('Compartments', { space })}
              style={tw`justify-center bg-neutral-300 border-2 border-slate-300  
              ${spaceHeight(space)} ${doorRadius(space)}`}
            >
              {!routeFridgeSetting && (
                <>
                  <View
                    style={tw`absolute z-10 w-full h-full opacity-80 bg-white 
                    ${doorRadius(space)}`}
                  />
                  <FridgeSpace space={space} />
                </>
              )}
              {routeFridgeSetting && (
                <View
                  style={tw`${doorRadius(space)} 
                  absolute z-10 w-full h-full justify-center`}
                >
                  <View
                    style={tw`absolute w-full h-full opacity-30
                    bg-${spaceColor(space)}-200 ${doorRadius(space)}`}
                  />
                  <Text
                    style={tw.style(
                      `text-center text-${spaceColor(space)}-600`,
                      FontGmarketSansBold
                    )}
                    fontSize={13}
                  >
                    {space.slice(0, 3)}
                  </Text>
                  <Text
                    style={tw.style(
                      `text-center text-${spaceColor(space)}-600`,
                      FontGmarketSansBold
                    )}
                    fontSize={13}
                  >
                    {space.slice(3)}
                  </Text>
                </View>
              )}
              <View
                style={tw`flex-1 gap-[${scaleH(5)}px]
                p-[${scaleH(!routeFridgeSetting ? 8 : 4)}]`}
              >
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
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}
