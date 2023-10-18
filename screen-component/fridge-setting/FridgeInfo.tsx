import { View } from 'react-native';
import { Text } from '../../components/common/native-component';
import { FontGmarketSansBold } from '../../constant/fonts';
import { Space } from '../../constant/fridgeInfo';
import { getCompartments } from '../../util';
import { MaxCompartmentsNumObj } from '../../redux/slice/fridgeInfoSlice';
import { GRAY } from '../../constant/colors';

import CompartmentBox from './CompartmentBox';
import Icon from '../../components/common/native-component/Icon';
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
        <View style={tw`absolute -left-18 z-10 flex-row items-center gap-1.5`}>
          <Text
            style={tw.style(
              `${
                space.includes('냉동') ? 'text-blue-600' : 'text-sky-600'
              } text-sm pb-1`,
              FontGmarketSansBold
            )}
          >
            {space.slice(0, 3)}
          </Text>
          <Icon name='chevrons-right' type='Feather' size={20} color={GRAY} />
        </View>
      )}
      <View style={tw`h-full gap-0.7`}>
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
