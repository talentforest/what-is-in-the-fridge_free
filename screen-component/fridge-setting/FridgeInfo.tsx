import { View } from 'react-native';
import { Text } from '../../components/common/native-component';
import { FontGmarketSansBold } from '../../constant/fonts';
import { Space } from '../../constant/fridgeInfo';
import { getCompartments } from '../../util';
import CompartmentBox from './CompartmentBox';
import tw from 'twrnc';
import Icon from '../../components/common/native-component/Icon';
import { GRAY } from '../../constant/colors';

interface Props {
  space: Space;
  compartments: {
    '냉동실 문쪽': number;
    '냉동실 안쪽': number;
    '냉장실 문쪽': number;
    '냉장실 안쪽': number;
  };
}

export default function FridgeInfo({ space, compartments }: Props) {
  const doorRadius = (space: Space) => {
    return space.includes('문쪽') ? `rounded-r-[4px]` : `rounded-l-[4px]`;
  };

  return (
    <View
      style={tw`border border-slate-400 bg-stone-500 
        ${doorRadius(space)} justify-center`}
    >
      <View
        style={tw`absolute w-full h-full
        ${doorRadius(space)} bg-white opacity-70`}
      />
      {space.slice(-2) !== '문쪽' && (
        <View style={tw`absolute -left-18 z-10 flex-row items-center gap-1.5`}>
          <Text
            style={tw.style(
              `${
                space.includes('냉동') ? 'text-blue-600' : 'text-cyan-600'
              } text-sm pb-1`,
              FontGmarketSansBold
            )}
          >
            {space.slice(0, 3)}
          </Text>
          <Icon name='caretright' type='AntDesign' size={12} color={GRAY} />
        </View>
      )}
      <View style={tw`h-full gap-1 p-1`}>
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
