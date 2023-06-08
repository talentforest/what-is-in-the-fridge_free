import { View } from 'react-native';
import { Text } from '../native-component';
import { useSelector } from '../../redux/hook';
import { Space } from '../../constant/fridgeInfo';
import { getCompartments } from '../../util';
import tw from 'twrnc';
import Compartment from './Compartment';

export default function FridgeShape() {
  const {
    fridgeInfo: { compartments, freezer },
  } = useSelector((state) => state.fridgeInfo);

  return (
    <View style={tw`flex-row w-2/3 h-84`}>
      <View
        style={tw`${
          freezer === 'top' ? '' : 'flex-col-reverse'
        } flex-1 gap-1 border border-slate-400 p-1 rounded-lg bg-neutral-300`}
      >
        {['냉동실 안쪽', '냉장실 안쪽'].map((space) => (
          <View
            style={tw`gap-0.5 ${space.includes('냉동') ? 'h-1/3' : 'flex-1'}`}
          >
            <Text
              styletw={`${
                space.includes('냉동') ? 'text-blue-500' : 'text-teal-600'
              } text-sm absolute top-1 z-10 text-xs left-1`}
            >
              {space}
            </Text>
            {getCompartments(compartments[space as Space]).map(
              ({ compartmentNum }) => (
                <Compartment
                  key={compartmentNum}
                  compartmentNum={compartmentNum}
                />
              )
            )}
          </View>
        ))}
      </View>
      <View
        style={tw`${
          freezer === 'top' ? '' : 'flex-col-reverse'
        } flex-1 gap-1 border border-slate-400 p-1 rounded-lg bg-neutral-300`}
      >
        {['냉동실 문쪽', '냉장실 문쪽'].map((space) => (
          <View
            style={tw`gap-0.5 ${space.includes('냉동') ? 'h-1/3' : 'flex-1'}`}
          >
            <Text
              styletw={`${
                space.includes('냉동') ? 'text-blue-500' : 'text-teal-600'
              } text-sm absolute top-1 z-10 text-xs left-1`}
            >
              {space}
            </Text>
            {getCompartments(compartments[space as Space]).map(
              ({ compartmentNum }) => (
                <Compartment
                  key={compartmentNum}
                  compartmentNum={compartmentNum}
                />
              )
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
