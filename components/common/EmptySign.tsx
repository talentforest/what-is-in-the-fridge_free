import { Image, View } from 'react-native';
import { Text } from './native-component';
import { useImageLoad } from '../../hooks';
import { getImgName } from '../../util';
import { CompartmentNum } from '../../constant/fridgeInfo';
import tw from 'twrnc';

interface Props {
  message: string;
  assetSize?: number;
  compartmentNum?: CompartmentNum;
}

export default function EmptySign({
  message,
  assetSize,
  compartmentNum,
}: Props) {
  const { isLoaded, assets } = useImageLoad({
    images: [
      require('../../assets/empty-shoppinglist.png'),
      require('../../assets/expired-foods.png'),
      require('../../assets/empty-favorite-foods.png'),
      require('../../assets/food/apple.png'),
      require('../../assets/food/meat.png'),
      require('../../assets/food/carrot.png'),
      require('../../assets/food/banana.png'),
      require('../../assets/food/egg.png'),
    ],
  });

  const assetName = getImgName(message, compartmentNum);

  const asset = assets?.find((asset) => asset.name === assetName);

  if (!isLoaded) return null;

  return (
    <View style={tw`items-center justify-center gap-2`}>
      <Text fontSize={15} style={tw`text-slate-400 text-center`}>
        {message}
      </Text>

      {assets && assetSize && (
        <Image
          source={{ uri: asset?.localUri }}
          width={assetSize}
          height={assetSize}
          style={tw`opacity-50`}
        />
      )}
    </View>
  );
}
