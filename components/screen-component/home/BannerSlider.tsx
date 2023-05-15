import { Image, View } from 'react-native';
import { FontGmarketSansBold } from '../../../constant/fonts';
import { Text } from '../../native-component';
import { Asset } from 'expo-asset';
import { DEEP_INDIGO } from '../../../constant/colors';
import Swiper from 'react-native-web-swiper';
import tw from 'twrnc';

interface Props {
  assets: Asset[];
}

export default function BannerSlider({ assets }: Props) {
  const slidesInfo = [
    {
      image: assets[0],
      contents: '냉장고를 한눈에 관리해보세요.',
    },
    {
      image: assets[2],
      contents: '장보기 리스트에 무엇이 있나요?',
    },
  ];

  return (
    <View style={tw`mb-4`}>
      <Swiper
        loop
        timeout={8}
        innerContainerStyle={tw`h-80`}
        minDistanceForAction={0.1}
        controlsProps={{
          dotsTouchable: true,
          prevTitle: '',
          nextTitle: '',
          dotsPos: 'top-right',
          dotActiveStyle: { backgroundColor: DEEP_INDIGO },
        }}
      >
        {slidesInfo?.map((slide) => (
          <View key={slide.contents} style={tw`justify-center items-center`}>
            {assets && (
              <View style={tw`w-4/5 items-center justify-center`}>
                <Image
                  source={slide.image}
                  style={tw.style('rounded-lg h-68 aspect-square')}
                />
              </View>
            )}
            <Text
              style={tw.style('text-base text-blue-700', FontGmarketSansBold)}
            >
              {slide.contents}
            </Text>
          </View>
        ))}
      </Swiper>
    </View>
  );
}
