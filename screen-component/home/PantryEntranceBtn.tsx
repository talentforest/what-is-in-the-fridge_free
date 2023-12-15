import { useNavigation } from '@react-navigation/native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { NavigateProp } from '../../navigation/Navigation';
import { Image, View } from 'react-native';
import { shadowStyle } from '../../constant/shadowStyle';
import { useImageLoad } from '../../hooks';

import IconChevronRight from '../../components/svg/arrow/IconChevronRight';
import PantryBox from './PantryBox';
import tw from 'twrnc';

export default function PantryEntranceBtn() {
  const { isLoaded, assets } = useImageLoad({
    images: [require('../../assets/food/banana.png')],
  });

  const navigation = useNavigation<NavigateProp>();

  const onNavigatePress = () => navigation.navigate('PantryFoods');

  if (!isLoaded) return null;

  const uri = assets[0].localUri;

  return (
    <View style={tw`-mt-1 mb-5 mr-5 self-end justify-end items-end flex-row`}>
      <PantryBox size={110} color={'#afafaf'} />
      <TouchableOpacity
        onPress={onNavigatePress}
        style={tw.style(
          `absolute items-center justify-between left-0 bottom-0.5 bg-neutral-300 w-21 h-21 p-3 pt-2 rounded-xl`,
          shadowStyle(6)
        )}
      >
        {/* 손잡이 부분 */}
        <View
          style={tw`border border-slate-500 h-2 w-8 rounded-full bg-gray-700`}
        />

        <View style={tw`flex-row self-center`}>
          <Text fontSize={15} style={tw`text-neutral-800`}>
            팬트리
          </Text>
          <IconChevronRight size={14} color={'#333'} />
        </View>
      </TouchableOpacity>

      {assets[0] ? (
        <View style={tw.style(`absolute -top-8 right-4`)}>
          <Image
            source={{ uri }}
            width={60}
            height={60}
            style={{ ...shadowStyle(3) }}
          />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}
