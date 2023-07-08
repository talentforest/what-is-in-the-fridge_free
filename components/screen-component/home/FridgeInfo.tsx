import { Asset } from 'expo-asset';
import { View } from 'react-native';
import useGetFoodList from '../../../hooks/useGetFoodList';
import FridgeInfoBox from './FridgeInfoBox';
import tw from 'twrnc';

interface Props {
  assets: Asset[];
}

export default function FridgeInfo({ assets }: Props) {
  const { getFoodList } = useGetFoodList();

  const getFridgeFoods = [
    ...getFoodList('냉장실 안쪽'),
    ...getFoodList('냉장실 문쪽'),
  ];
  const getFreezerFoods = [
    ...getFoodList('냉동실 안쪽'),
    ...getFoodList('냉동실 문쪽'),
  ];

  return (
    <View style={tw`gap-2 mt-3 flex-row flex-1`}>
      <FridgeInfoBox
        asset={assets[0]}
        name='냉동실 식료품'
        foodLength={getFreezerFoods.length}
      />
      <FridgeInfoBox
        asset={assets[1]}
        name='냉장실 식료품'
        foodLength={getFridgeFoods.length}
      />
    </View>
  );
}
