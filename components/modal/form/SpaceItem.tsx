import { View } from 'react-native';
import { Food } from '../../../constant/foods';
import { getCompartments } from '../../../util';
import CheckBoxBtn from './CheckBoxItem';
import tw from 'twrnc';

interface Props {
  food: Food;
  changeInfo: (newInfo: { [key: string]: string | boolean }) => void;
}

export default function SpaceItem({ food, changeInfo }: Props) {
  const spaceType = ['냉장실', '냉동실'];
  const spaceSide = ['안쪽', '문쪽'];

  const freezer = food.space.includes('냉동');
  const compartments = freezer ? getCompartments(2) : getCompartments(3);

  return (
    <View style={tw`gap-4`}>
      <View style={tw`flex-row gap-5`}>
        {spaceType.map((type) => (
          <CheckBoxBtn
            key={type}
            title={type}
            check={type === food.space.slice(0, 3)}
            onPress={() => {
              if (type === '냉동실' && food.compartmentNum === '3번') {
                return changeInfo({
                  space: `${type} ${food.space.slice(4, 6)}`,
                  compartmentNum: '2번',
                });
              }
              changeInfo({ space: `${type} ${food.space.slice(4, 6)}` });
            }}
          />
        ))}
      </View>
      <View style={tw`flex-row gap-5`}>
        {spaceSide.map((side) => (
          <CheckBoxBtn
            key={side}
            title={side}
            check={side === food.space.slice(4, 6)}
            onPress={() => {
              changeInfo({ space: `${food.space.slice(0, 3)} ${side}` });
            }}
          />
        ))}
      </View>
      <View style={tw`flex-row gap-5`}>
        {compartments.map(({ compartmentNum }) => (
          <CheckBoxBtn
            key={compartmentNum}
            title={`${compartmentNum}칸`}
            check={compartmentNum === food.compartmentNum}
            onPress={() => changeInfo({ compartmentNum })}
          />
        ))}
      </View>
    </View>
  );
}
