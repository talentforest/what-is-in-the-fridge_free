import { View } from 'react-native';
import { Text } from '../../components/common/native-component';
import { Space } from '../../constant/fridgeInfo';
import { getCompartments } from '../../util';
import { MaxCompartmentsNumObj } from '../../redux/slice/fridgeInfoSlice';

import CompartmentBox from './CompartmentBox';
import IconChevronsRight from '../../components/svg/arrow/IconChevronsRight';
import tw from 'twrnc';

interface Props {
  space: Space;
  compartments: MaxCompartmentsNumObj;
}

export default function FridgeInfo({ space, compartments }: Props) {
  return (
    <View style={tw`justify-center`}>
      <View style={tw`absolute w-full h-full opacity-70`} />
      {space.slice(-2) !== '문쪽' && (
        <View style={tw`absolute -left-18 z-10 flex-row items-center gap-0.5`}>
          <Text
            fontSize={15}
            style={tw.style(`
            ${space.includes('냉동') ? 'text-blue-600' : 'text-teal-600'}`)}
          >
            {space.slice(0, 3)}
          </Text>
          <IconChevronsRight
            size={16}
            color={space.includes('냉동') ? '#2563eb' : '#0d9488'}
          />
        </View>
      )}
      <View style={tw`h-full gap-1`}>
        {getCompartments(compartments[space]).map(({ compartmentNum }) => (
          <CompartmentBox
            key={compartmentNum}
            space={space}
            compartmentNum={compartmentNum}
          />
        ))}
      </View>
    </View>
  );
}
