import { View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import { useSelector } from '../../redux/hook';
import { Space } from '../../constant/fridgeInfo';
import { getCompartments, scaleH } from '../../util';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontGmarketSansBold } from '../../constant/fonts';
import { NavigateProp } from '../../navigation/Navigation';
import CompartmentShape from './CompartmentShape';
import CompartmentInfo from '../screen-component/my-fridge/CompartmentInfo';
import tw from 'twrnc';

export default function FridgeShape() {
  const navigation = useNavigation<NavigateProp>();
  const route = useRoute();

  const {
    fridgeInfo: { compartments, freezer },
  } = useSelector((state) => state.fridgeInfo);

  const doorRadius = (space: Space) => {
    return space.includes('문쪽') ? 'rounded-r-lg' : 'rounded-l-lg';
  };

  return (
    <View style={tw`flex-row flex-1`}>
      {['안쪽', '문쪽'].map((side) => (
        <View
          key={side}
          style={tw`${freezer === 'top' ? '' : 'flex-col-reverse'} flex-1`}
        >
          {([`냉동실 ${side}`, `냉장실 ${side}`] as Space[]).map((space) => (
            <TouchableOpacity
              key={space}
              disabled={route.name !== 'Setting' ? false : true}
              onPress={() => navigation.navigate('Compartments', { space })}
              style={tw`justify-center bg-neutral-300 border-2 border-slate-300 ${
                space.includes('냉동') ? 'h-[40%]' : 'h-[60%]'
              } ${doorRadius(space)}`}
            >
              {route.name !== 'FridgeSetting' ? (
                <>
                  <View
                    style={tw`absolute z-10 w-full h-full opacity-80 bg-white
                    ${doorRadius(space)}`}
                  />
                  <CompartmentInfo space={space} />
                </>
              ) : (
                // 나의 냉장고 설정
                <>
                  <View
                    style={tw`${doorRadius(space)} ${
                      space.includes('냉동')
                        ? 'border-blue-400'
                        : 'border-yellow-400'
                    } border-4 absolute z-10 w-full h-full`}
                  />
                  <Text
                    style={tw.style(
                      `absolute z-10 w-full text-center ${
                        space.includes('냉동')
                          ? 'text-blue-600'
                          : 'text-yellow-600'
                      }`,
                      FontGmarketSansBold
                    )}
                  >
                    {space.slice(0, 3)}
                  </Text>
                </>
              )}
              <View
                style={tw`flex-1 gap-[${scaleH(1.5)}] p-[${scaleH(
                  route.name !== 'FridgeSetting' ? 8 : 4
                )}]`}
              >
                {getCompartments(compartments[space]).map(
                  ({ compartmentNum }) => (
                    <CompartmentShape
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
