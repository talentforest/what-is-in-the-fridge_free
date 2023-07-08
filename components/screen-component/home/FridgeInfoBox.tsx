import { Image, ImageSourcePropType, View } from 'react-native';
import { Text } from '../../native-component';
import { scaleFont } from '../../../util';
import { FontGmarketSansBold } from '../../../constant/fonts';
import { Asset } from 'expo-asset';
import tw from 'twrnc';
import Title from '../../common/Title';

interface Props {
  asset: Asset;
  foodLength: number;
  name: string;
}

export default function FridgeInfoBox({ asset, name, foodLength }: Props) {
  return (
    <View
      style={tw`flex-1 gap-4 border-2 border-slate-300 rounded-lg p-3 bg-blue-400`}
    >
      <Title title={name} />
      <View style={tw`flex-row items-end justify-between`}>
        {asset && (
          <Image source={asset as ImageSourcePropType} style={tw`w-13 h-13`} />
        )}

        <View style={tw`flex-row items-end`}>
          <Text
            style={tw.style(`text-white text-[${scaleFont(30)}px]`, {
              ...FontGmarketSansBold,
            })}
          >
            {foodLength}
          </Text>
          <Text style={tw`text-slate-200 mb-0.5`}>개</Text>
        </View>
      </View>
    </View>
  );
}
