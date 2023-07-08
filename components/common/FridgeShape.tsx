import { View } from 'react-native';
import { TouchableOpacity } from '../native-component';
import { useSelector } from '../../redux/hook';
import { Space } from '../../constant/fridgeInfo';
import { getCompartments, scaleH } from '../../util';
import { useNavigation, useRoute } from '@react-navigation/native';
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

  return (
    <View style={tw`flex-row flex-1`}>
      {['안쪽', '문쪽'].map((side) => (
        <View
          key={side}
          style={tw`${
            freezer === 'top' ? '' : 'flex-col-reverse'
          } flex-1 rounded-md`}
        >
          {([`냉동실 ${side}`, `냉장실 ${side}`] as Space[]).map((space) => (
            <TouchableOpacity
              key={space}
              disabled={route.name !== 'Setting' ? false : true}
              onPress={() => navigation.navigate('Compartments', { space })}
              style={tw`justify-center bg-neutral-200 border border-slate-400 ${
                space.includes('냉동') ? 'h-[40%]' : 'h-[60%]'
              } ${space.includes('문쪽') ? 'rounded-r-md' : 'rounded-l-md'}`}
            >
              {route.name !== 'FridgeSetting' && (
                <CompartmentInfo space={space} />
              )}
              <View style={tw`flex-1 gap-1 py-[${scaleH(6)}]`}>
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
