import { View } from 'react-native';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';
import { AD_MOB_APP_ID } from '@env';
import tw from 'twrnc';

export default function AnchoredBannerAd() {
  const adUnitId = __DEV__ ? TestIds.BANNER : AD_MOB_APP_ID;

  return (
    <View style={tw`w-full items-center overflow-hidden`}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
      />
    </View>
  );
}
