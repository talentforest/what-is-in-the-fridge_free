import { View } from 'react-native';
import { Food } from '../../constant/foodInfo';
import { getCompartments } from '../../util';
import { useSelector } from '../../redux/hook';
import { Text, TouchableOpacity } from '../common/native-component';
import {
  CompartmentNum,
  SpaceSide,
  SpaceType,
} from '../../constant/fridgeInfo';

import CheckBoxItem from '../common/CheckBoxItem';
import FormLabel from './FormLabel';
import tw from 'twrnc';

interface Props {
  food: Food;
  changeInfo: (newInfo: { [key: string]: string | boolean }) => void;
}

type TabType = '팬트리' | '냉장고';

export default function SpaceItem({ food, changeInfo }: Props) {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);

  const spaceType = food.space.slice(0, 3);
  const spaceSide = food.space.slice(4, 6);

  const maxCompartmentsNum = fridgeInfo.compartments[food.space];
  const compartments = getCompartments(maxCompartmentsNum);

  const onFridgeSpaceTypePress = (spaceType: SpaceType) => {
    changeInfo({ space: `${spaceType} ${spaceSide}` });
  };

  const onFridgeSpaceSidePress = (spaceSide: SpaceSide) => {
    changeInfo({ space: `${spaceType} ${spaceSide}` });
  };

  const onCompartmentNumPress = (compartmentNum: CompartmentNum) => {
    changeInfo({ compartmentNum });
  };

  const onTabPress = (space: TabType) => {
    if (space === '냉장고') {
      return changeInfo({ space: '냉장실 안쪽', compartmentNum: '1번' });
    }
    changeInfo({ space: '팬트리', compartmentNum: '' });
  };

  return (
    <View>
      <FormLabel label='추가할 식료품의 위치' />
      <View style={tw`flex-row items-center`}>
        {['냉장고', '팬트리'].map((space) => (
          <TouchableOpacity
            onPress={() => onTabPress(space as TabType)}
            key={space}
            style={tw`border-b-2 ${
              food.space.includes(space.slice(0, 1))
                ? 'border-blue-600'
                : 'border-slate-300'
            } pr-5 pl-1 pb-0.5 my-2`}
          >
            <Text
              style={tw`text-[15px] ${
                food.space.includes(space.slice(0, 1))
                  ? 'text-slate-700'
                  : 'text-slate-400'
              }`}
            >
              {space}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {food.space !== '팬트리' && (
        <>
          <View style={tw`flex-row gap-5`}>
            {(['냉장실', '냉동실'] as SpaceType[]).map((spaceType) => (
              <CheckBoxItem
                key={spaceType}
                title={spaceType}
                checked={food.space.slice(0, 3) === spaceType}
                onPress={() => onFridgeSpaceTypePress(spaceType)}
              />
            ))}
          </View>
          <View style={tw`flex-row gap-5`}>
            {(['안쪽', '문쪽'] as SpaceSide[]).map((spaceSide) => (
              <CheckBoxItem
                key={spaceSide}
                title={spaceSide}
                checked={food.space.includes(spaceSide)}
                onPress={() => onFridgeSpaceSidePress(spaceSide)}
              />
            ))}
          </View>
          <View style={tw`flex-row flex-wrap gap-x-5 gap-y-2`}>
            {compartments.map(({ compartmentNum }) => (
              <CheckBoxItem
                key={compartmentNum}
                title={`${compartmentNum}칸`}
                checked={food.compartmentNum === compartmentNum}
                onPress={() => onCompartmentNumPress(compartmentNum)}
              />
            ))}
          </View>
        </>
      )}

      {food.space === '팬트리' && (
        <CheckBoxItem
          title='팬트리'
          checked={food.space === '팬트리'}
          onPress={() => onTabPress('팬트리')}
        />
      )}
    </View>
  );
}
