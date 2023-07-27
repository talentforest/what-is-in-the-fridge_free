import { Image, ImageSourcePropType, View } from 'react-native';
import { Text } from '../../native-component';
import { Asset } from 'expo-asset';
import { FontGmarketSansBold } from '../../../constant/fonts';
import tw from 'twrnc';
import Box from '../../common/LayoutBox/Box';

interface Props {
  asset: Asset;
  foodLength: number;
  name: string;
}

export default function FridgeInfoBox({ asset, name, foodLength }: Props) {
  return (
    <Box bgColor='bg-amber-300'>
      <Text
        fontSize={16}
        style={tw.style(`text-blue-600`, FontGmarketSansBold)}
      >
        {name}
      </Text>
      <View style={tw`flex-row items-end justify-between mt-3`}>
        {asset && (
          <Image
            source={asset as ImageSourcePropType}
            style={tw`w-13 h-13 ml-1`}
          />
        )}

        <View style={tw`flex-row items-end gap-0.5 h-full`}>
          <Text style={tw`text-slate-600 mb-0.5`}>총 : </Text>
          <Text
            fontSize={30}
            style={tw.style(`text-blue-600 pt-4`, FontGmarketSansBold)}
          >
            {foodLength}
          </Text>
          <Text style={tw`text-white mb-0.5`}>개</Text>
        </View>
      </View>
    </Box>
  );
}
