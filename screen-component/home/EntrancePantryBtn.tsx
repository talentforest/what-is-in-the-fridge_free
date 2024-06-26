import { useNavigation } from '@react-navigation/native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { NavigateProp } from '../../navigation/Navigation';
import { Image, View } from 'react-native';
import { useImageLoad } from '../../hooks';
import { LIGHT_GRAY } from '../../constant/colors';

import IconChevronRight from '../../components/svg/arrow/IconChevronRight';
import PantryBox from './PantryBox';
import tw from 'twrnc';

export default function EntrancePantryBtn() {
  const { isLoaded, assets } = useImageLoad({
    images: [
      require('../../assets/food/banana.png'),
      require('../../assets/food/apple.png'),
    ],
  });

  const navigation = useNavigation<NavigateProp>();

  const onNavigatePress = () => navigation.navigate('PantryFoods');

  if (!isLoaded) return null;

  const bananaLocalUri = assets[0]?.localUri;
  const appleLocalUri = assets[1]?.localUri;

  return (
    <TouchableOpacity
      onPress={onNavigatePress}
      style={tw`mr-3 -gap-3 flex-row self-end justify-end items-end`}
    >
      <PantryBox size={90} />

      <View>
        <PantryBox size={105} />

        <View
          style={tw`absolute bottom-1 pb-3 left-0.5 w-19 items-center justify-end h-12`}
        >
          <View style={tw`flex-row items-center`}>
            <Text fontSize={15} style={tw`text-slate-700`}>
              실온보관
            </Text>

            <IconChevronRight size={14} color={LIGHT_GRAY} />
          </View>
        </View>

        {assets.length ? (
          <View
            style={tw.style(
              `flex-row -gap-4 absolute -top-8.5 right-0 self-end items-end`
            )}
          >
            <Image source={{ uri: appleLocalUri }} width={45} height={45} />
            <Image
              source={{ uri: bananaLocalUri }}
              width={65}
              height={65}
              style={{ transform: [{ rotate: '15deg' }] }}
            />
          </View>
        ) : (
          <></>
        )}
      </View>
    </TouchableOpacity>
  );
}
