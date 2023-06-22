import { View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import { useSelector } from '../../redux/hook';
import { Space } from '../../constant/fridgeInfo';
import { getCompartments, scaleH } from '../../util';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';
import CompartmentShape from './CompartmentShape';
import tw from 'twrnc';

interface FridgeShapeProps {
  showInfo?: boolean;
}

export default function FridgeShape({ showInfo = false }: FridgeShapeProps) {
  const navigation = useNavigation<NavigateProp>();

  const {
    fridgeInfo: { compartments, freezer },
  } = useSelector((state) => state.fridgeInfo);

  return (
    <View style={tw`flex-row flex-1`}>
      {['안쪽', '문쪽'].map((side) => (
        <View
          key={side}
          style={tw`${
            freezer === 'top' ? '' : 'flex-col-reverse'
          } flex-1 rounded-md`}
        >
          {[`냉동실 ${side}`, `냉장실 ${side}`].map((space) => (
            <TouchableOpacity
              key={space}
              disabled={showInfo ? false : true}
              onPress={() => navigation.navigate('Compartments', { space })}
              style={tw`justify-center bg-neutral-200 border border-slate-400 ${
                space.includes('냉동') ? 'h-[40%]' : 'h-[60%]'
              } ${space.includes('문쪽') ? 'rounded-r-md' : 'rounded-l-md'}`}
            >
              <View
                style={tw`border absolute z-10 left-[${scaleH(
                  2.5
                )}] -top-[${scaleH(
                  2
                )}] px-2 py-1 rounded-full border-slate-400 bg-indigo-200`}
              >
                <Text
                  style={tw`${
                    space.includes('냉동') ? 'text-blue-500' : 'text-teal-600'
                  }`}
                  fontSize={12}
                >
                  {space}
                </Text>
              </View>
              <View style={tw`flex-1 gap-1 py-[${scaleH(6)}]`}>
                {getCompartments(compartments[space as Space]).map(
                  ({ compartmentNum }) => (
                    <CompartmentShape
                      key={compartmentNum}
                      showInfo={showInfo}
                      space={space as Space}
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
