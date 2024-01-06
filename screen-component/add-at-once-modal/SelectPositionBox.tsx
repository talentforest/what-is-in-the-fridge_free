import { Animated, View } from 'react-native';
import {
  CompartmentNum,
  Space,
  SpaceSide,
  SpaceType,
} from '../../constant/fridgeInfo';
import { useItemSlideAnimation } from '../../hooks';
import { getCompartments } from '../../util';
import { useSelector } from '../../redux/hook';
import { Position } from '../modal/AddAtOnceModal';
import { shadowStyle } from '../../constant/shadowStyle';
import CheckBoxItem from '../../components/common/CheckBoxItem';
import tw from 'twrnc';

interface Props {
  active: boolean;
  fridgePosition: Position;
  onFridgePositionPress: (position: Position) => void;
}

export default function SelectPositionBox({
  active,
  fridgePosition,
  onFridgePositionPress,
}: Props) {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);

  const currentSpace = fridgePosition.slice(0, 6) as Space;
  const maxCompartmentsNum = fridgeInfo.compartments[currentSpace];
  const compartments = getCompartments(maxCompartmentsNum);

  const { height } = useItemSlideAnimation({
    initialValue: 0,
    toValue: maxCompartmentsNum === 5 ? 170 : 126,
    active,
  });

  const currSpaceType = fridgePosition.slice(0, 3);
  const currSpaceSide = fridgePosition.slice(4, 6);
  const currCompartmentNum = fridgePosition.slice(-2);

  const getCurrPosition = (
    type: 'spaceType' | 'spaceSide' | 'compartmentNum',
    value: SpaceType | SpaceSide | CompartmentNum
  ) => {
    if (type === 'spaceType') {
      return `${value} ${currSpaceSide} ${currCompartmentNum}` as Position;
    }
    if (type === 'spaceSide') {
      return `${currSpaceType} ${value} ${currCompartmentNum}` as Position;
    }
    if (type === 'compartmentNum') {
      return `${currSpaceType} ${currSpaceSide} ${value}` as Position;
    }
    return `${currSpaceType} ${currSpaceSide} ${currCompartmentNum}` as Position;
  };

  return (
    <Animated.View
      style={{
        height,
        marginHorizontal: -4,
        paddingHorizontal: 4,
        overflow: 'hidden',
        borderRadius: 8,
      }}
    >
      <View
        style={tw.style(`px-4 bg-white border border-slate-200 rounded-xl`)}
      >
        <View style={tw`flex-row gap-4 py-1`}>
          {(['냉장실', '냉동실'] as SpaceType[]).map((spaceType) => (
            <View key={spaceType} style={tw`h-8`}>
              <CheckBoxItem
                key={spaceType}
                title={spaceType}
                checked={spaceType === currSpaceType}
                onPress={() =>
                  onFridgePositionPress(
                    getCurrPosition('spaceType', spaceType) as Position
                  )
                }
              />
            </View>
          ))}
        </View>
        <View
          style={tw`flex-row gap-4 py-0.5 border-t border-b border-slate-300`}
        >
          {(['안쪽', '문쪽'] as SpaceSide[]).map((spaceSide) => (
            <View key={spaceSide} style={tw`h-8`}>
              <CheckBoxItem
                key={spaceSide}
                title={spaceSide}
                checked={spaceSide === currSpaceSide}
                onPress={() =>
                  onFridgePositionPress(getCurrPosition('spaceSide', spaceSide))
                }
              />
            </View>
          ))}
        </View>
        <View style={tw`flex-row gap-x-4 py-1 flex-wrap`}>
          {compartments.map(({ compartmentNum }) => (
            <View key={compartmentNum} style={tw`h-8`}>
              <CheckBoxItem
                key={compartmentNum}
                title={`${compartmentNum}칸`}
                checked={compartmentNum === currCompartmentNum}
                onPress={() =>
                  onFridgePositionPress(
                    getCurrPosition('compartmentNum', compartmentNum)
                  )
                }
              />
            </View>
          ))}
        </View>
      </View>
    </Animated.View>
  );
}
