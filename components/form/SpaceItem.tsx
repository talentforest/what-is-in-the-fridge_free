import { View } from 'react-native';
import { Food } from '../../constant/foodInfo';
import { getCompartments } from '../../util';
import { useSelector } from '../../redux/hook';
import { Text, TouchableOpacity } from '../common/native-component';
import {
  CompartmentNum,
  FoodStorageType,
  Space,
  SpaceSide,
  SpaceType,
} from '../../constant/fridgeInfo';
import { isFridgeFood, isPantryFood } from '../../util/checkFoodSpace';

import CheckBoxItem from '../common/CheckBoxItem';
import FormLabel from './FormLabel';
import tw from 'twrnc';

interface Props {
  food: Food;
  changeInfo: (newInfo: { [key: string]: string | boolean }) => void;
}

export default function SpaceItem({ food, changeInfo }: Props) {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);
  const { selectedFood } = useSelector((state) => state.selectedFood);

  const spaceType = food.space.slice(0, 3);
  const spaceSide = food.space.slice(4, 6);

  const maxCompartmentsNum = fridgeInfo.compartments[food.space];
  const compartments = getCompartments(maxCompartmentsNum);

  const getCompartmentNum = (space: Space) => {
    if (food.compartmentNum) {
      const maxCompartmentNum = fridgeInfo.compartments[space];
      const compartmentNum =
        +food.compartmentNum.slice(0, 1) > maxCompartmentNum
          ? `${maxCompartmentNum}번`
          : food.compartmentNum;
      return compartmentNum;
    }
    return '1번';
  };

  const onFridgeSpacePress = (space: Space) =>
    changeInfo({ space, compartmentNum: getCompartmentNum(space) });

  const onCompartmentNumPress = (compartmentNum: CompartmentNum) => {
    changeInfo({ compartmentNum });
  };

  const onTabPress = (storage: FoodStorageType) => {
    if (isPantryFood(food.space) && isPantryFood(storage)) return;
    if (isFridgeFood(food.space) && isFridgeFood(storage)) return;

    return storage === '냉장고'
      ? changeInfo({
          space: selectedFood.space,
          compartmentNum: selectedFood.compartmentNum || '1번',
        })
      : changeInfo({ space: '팬트리' });
  };

  return (
    <View>
      <FormLabel label='추가할 식료품의 위치' />
      <View style={tw`flex-row items-center`}>
        {['냉장고', '팬트리'].map((storage) => (
          <TouchableOpacity
            onPress={() => onTabPress(storage as FoodStorageType)}
            key={storage}
            style={tw`border-b-[3px] ${
              food.space.includes(storage.slice(0, 1))
                ? 'border-blue-600'
                : 'border-slate-300'
            } pr-5 pb-0.5 my-1.5`}
          >
            <Text
              style={tw`text-[15px] ${
                food.space.includes(storage.slice(0, 1))
                  ? 'text-slate-700'
                  : 'text-slate-400'
              }`}
            >
              {storage}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {food.space !== '팬트리' && (
        <View>
          <View style={tw`flex-row gap-4`}>
            {(['냉장실', '냉동실'] as SpaceType[]).map((spaceType) => (
              <View key={spaceType} style={tw`py-1.5`}>
                <CheckBoxItem
                  key={spaceType}
                  title={spaceType}
                  checked={food.space.slice(0, 3) === spaceType}
                  onPress={() =>
                    onFridgeSpacePress(`${spaceType} ${spaceSide}` as Space)
                  }
                />
              </View>
            ))}
          </View>

          <View style={tw`flex-row gap-4 border-b border-t border-slate-300`}>
            {(['안쪽', '문쪽'] as SpaceSide[]).map((spaceSide) => (
              <View key={spaceSide} style={tw`py-1.5`}>
                <CheckBoxItem
                  title={spaceSide}
                  checked={food.space.includes(spaceSide)}
                  onPress={() =>
                    onFridgeSpacePress(`${spaceType} ${spaceSide}` as Space)
                  }
                />
              </View>
            ))}
          </View>

          <View style={tw`flex-row flex-wrap gap-x-4`}>
            {compartments.map(({ compartmentNum }) => (
              <View key={compartmentNum} style={tw`py-1.5`}>
                <CheckBoxItem
                  title={`${compartmentNum}칸`}
                  checked={food.compartmentNum === compartmentNum}
                  onPress={() => onCompartmentNumPress(compartmentNum)}
                />
              </View>
            ))}
          </View>
        </View>
      )}

      {food.space === '팬트리' && (
        <View key={spaceType} style={tw`py-1.5`}>
          <CheckBoxItem
            title='팬트리'
            checked={food.space === '팬트리'}
            onPress={() => onTabPress('팬트리')}
          />
        </View>
      )}
    </View>
  );
}
