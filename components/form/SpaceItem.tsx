import { View } from 'react-native';
import { Food } from '../../constant/foods';
import { getCompartments } from '../../util';
import { useSelector } from '../../redux/hook';
import { Space, SpaceSide, SpaceType } from '../../constant/fridgeInfo';

import CheckBoxItem from '../common/CheckBoxItem';
import FormLabel from './FormLabel';
import tw from 'twrnc';

interface Props {
  food: Food;
  changeInfo: (newInfo: { [key: string]: string | boolean }) => void;
}

export default function SpaceItem({ food, changeInfo }: Props) {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);

  const totalNum = fridgeInfo.compartments[food.space];
  const compartments = getCompartments(totalNum);

  const onSpaceTypePress = (type: SpaceType) => {
    const currentSpace = `${type} ${food.space.slice(4, 6)}` as Space;
    const largestNum = fridgeInfo.compartments[currentSpace];
    if (+food.compartmentNum.slice(0, 1) > largestNum) {
      return changeInfo({
        space: `${type} ${food.space.slice(4, 6)}`,
        compartmentNum: `${largestNum}번`,
      });
    }
    changeInfo({ space: `${type} ${food.space.slice(4, 6)}` });
  };

  const onSpaceSidePress = (spaceSide: SpaceSide) => {
    changeInfo({ space: `${food.space.slice(0, 3)} ${spaceSide}` });
  };

  return (
    <View>
      <FormLabel label='냉장고 위치 선택' />
      <View style={tw`gap-3 py-2`}>
        <View style={tw`flex-row gap-5`}>
          {(['냉장실', '냉동실'] as SpaceType[]).map((spaceType) => (
            <CheckBoxItem
              key={spaceType}
              title={spaceType}
              checked={spaceType === food.space.slice(0, 3)}
              onPress={() => onSpaceTypePress(spaceType)}
            />
          ))}
        </View>
        <View style={tw`flex-row gap-5`}>
          {(['안쪽', '문쪽'] as SpaceSide[]).map((spaceSide) => (
            <CheckBoxItem
              key={spaceSide}
              title={spaceSide}
              checked={spaceSide === food.space.slice(4, 6)}
              onPress={() => onSpaceSidePress(spaceSide)}
            />
          ))}
        </View>
        <View style={tw`flex-row flex-wrap gap-x-5 gap-y-2`}>
          {compartments.map(({ compartmentNum }) => (
            <CheckBoxItem
              key={compartmentNum}
              title={`${compartmentNum}칸`}
              checked={compartmentNum === food.compartmentNum}
              onPress={() => changeInfo({ compartmentNum })}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
