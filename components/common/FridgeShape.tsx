import { View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import { useSelector } from '../../redux/hook';
import { Space } from '../../constant/fridgeInfo';
import { getCompartments } from '../../util';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';
import Compartment from './Compartment';
import tw from 'twrnc';

interface FridgeShapeProps {
  showInfo?: boolean;
}

export default function FridgeShape({ showInfo = false }: FridgeShapeProps) {
  const navigation = useNavigation<NavigateProp>();
  const {
    fridgeInfo: { compartments, freezer },
  } = useSelector((state) => state.fridgeInfo);

  const fridgeLocation = freezer === 'top' ? '' : 'flex-col-reverse';

  return (
    <View style={tw`flex-row flex-1`}>
      {['안쪽', '문쪽'].map((side) => (
        <View
          key={side}
          style={tw`${fridgeLocation} flex-1 rounded-lg bg-neutral-200`}
        >
          {[`냉동실 ${side}`, `냉장실 ${side}`].map((space) => (
            <TouchableOpacity
              key={space}
              disabled={showInfo ? false : true}
              onPress={() => navigation.navigate('Compartments', { space })}
              style={tw`justify-center border border-slate-300 ${
                space.includes('냉동')
                  ? 'h-[40%] rounded-t-lg'
                  : 'h-[60%] rounded-b-lg'
              }`}
            >
              <Text
                style={tw`${
                  space.includes('냉동') ? 'text-blue-500' : 'text-teal-600'
                } absolute top-3 z-10 left-3`}
                fontSize={14}
              >
                {space}
              </Text>
              <View style={tw`flex-1 gap-1 py-2`}>
                {getCompartments(compartments[space as Space]).map(
                  ({ compartmentNum }) => (
                    <Compartment
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
