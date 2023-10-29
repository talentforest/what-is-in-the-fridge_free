import { Image, View } from 'react-native';
import { Text } from './native-component';
import { useImageLoad } from '../../hooks';
import { getImgName } from '../../util';
import tw from 'twrnc';

interface Props {
  message: string;
  assetSize?: number;
}

export default function EmptySign({ message, assetSize }: Props) {
  const splittedMessage = message.split(', ');

  const { isLoaded, assets } = useImageLoad({
    images: [
      require('../../assets/question-face.png'),
      require('../../assets/shoppinglist-food.png'),
      require('../../assets/apple.png'),
      require('../../assets/expired-foods.png'),
      require('../../assets/meat.png'),
    ],
  });

  const assetName = getImgName(message);

  const asset = assets?.find((asset) => asset.name === assetName);

  if (!isLoaded) return null;

  return (
    <View style={tw`items-center justify-center`}>
      <Text style={tw`text-slate-400 text-center`}>{splittedMessage[0]}</Text>

      {message[1] && (
        <Text style={tw`text-slate-400 text-center`}>{splittedMessage[1]}</Text>
      )}

      {assets && assetSize && (
        <Image
          source={{ uri: asset?.localUri }}
          width={assetName === 'apple' ? assetSize * 0.5 : assetSize}
          height={assetName === 'apple' ? assetSize * 0.5 : assetSize}
          style={tw`opacity-50`}
        />
      )}
    </View>
  );
}
