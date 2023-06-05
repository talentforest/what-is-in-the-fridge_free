import { View } from 'react-native';
import { Text } from '../native-component';
import { useSelector } from '../../redux/hook';
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
        {/* 냉동실 안쪽 */}
        <View style={tw`gap-0.5 h-1/3`}>
          <Text styletw='text-blue-500 text-sm absolute top-1 z-10 text-xs left-1 '>
            냉동실 안쪽
          </Text>
          {getCompartments(compartments['freezerInner']).map(
            ({ compartmentNum }) => (
              <Compartment
                key={compartmentNum}
                compartmentNum={compartmentNum}
              />
            )
          )}
        </View>
        {/* 냉장실 안쪽 */}
        <View style={tw`flex-1 gap-0.5`}>
          <Text styletw='text-indigo-500 text-sm absolute top-1 z-10 left-1 text-xs'>
            냉장실 안쪽
          </Text>
          {getCompartments(compartments['fridgeInner']).map(
            ({ compartmentNum }) => (
              <Compartment
                key={compartmentNum}
                compartmentNum={compartmentNum}
              />
            )
          )}
        </View>
      </View>
      <View
        style={tw`${
          freezer === 'top' ? '' : 'flex-col-reverse'
        } flex-1 gap-1 border border-slate-400 p-1 rounded-lg bg-neutral-300`}
      >
        {/* 냉동실 문쪽 */}
        <View style={tw`h-1/3 gap-0.5`}>
          <Text styletw='text-blue-500 text-sm absolute top-1 z-10 left-1 text-xs'>
            냉동실 문쪽
          </Text>
          {getCompartments(compartments['freezerDoor']).map(
            ({ compartmentNum }) => (
              <Compartment
                key={compartmentNum}
                compartmentNum={compartmentNum}
              />
            )
          )}
        </View>
        {/* 냉장실 문쪽 */}
        <View style={tw`flex-1 gap-0.5`}>
          <Text styletw='text-indigo-500 text-sm absolute top-1 z-10 left-1 text-xs'>
            냉장실 문쪽
          </Text>
          {getCompartments(compartments['fridgeDoor']).map(
            ({ compartmentNum }) => (
              <Compartment
                key={compartmentNum}
                compartmentNum={compartmentNum}
              />
            )
          )}
        </View>
      </View>
    </View>
  );
}
