import { Image, View } from 'react-native';
import { FontGmarketSansRegular } from '../../../constant/fonts';
import { Text } from '../../native-component';
import { Asset } from 'expo-asset';
import Swiper from 'react-native-web-swiper';
import tw from 'twrnc';

interface Props {
  assets: Asset[];
}

export default function BannerSlider({ assets }: Props) {
  const slidesInfo = [
    {
      image: assets[0],
      contents: '사야하는 장바구니 식료품 리스트가 무엇인가요?',
    },
    {
      image: assets[1],
      contents: '냉장고를 한눈에 관리해보세요',
    },
    {
      image: assets[2],
      contents: '오늘은 어떤 재료를 사용해볼까요?',
    },
  ];

  return (
    <View style={tw`my-10`}>
      <Swiper
        loop
        timeout={8}
        containerStyle={{ height: 280 }}
        innerContainerStyle={tw`rounded-lg px-10`}
        minDistanceForAction={0.1}
        controlsProps={{
          dotsTouchable: true,
          prevTitle: '이전',
          nextTitle: '다음',
          nextTitleStyle: { color: '#692eff', ...FontGmarketSansRegular },
          prevTitleStyle: { color: '#692eff', ...FontGmarketSansRegular },
          dotActiveStyle: { borderWidth: 2, backgroundColor: 'orange' },
        }}
      >
        {slidesInfo?.map((slide) => (
          <View
            key={slide.contents}
            style={tw`w-full h-60 justify-center gap-3 items-center`}
          >
            {assets && (
              <Image
                source={slide.image}
                style={tw.style('w-auto h-48', { aspectRatio: 1 })}
              />
            )}
            <Text styletw='text-base'>{slide.contents}</Text>
          </View>
        ))}
      </Swiper>
    </View>
  );
}
