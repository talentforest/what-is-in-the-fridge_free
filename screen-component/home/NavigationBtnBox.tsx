import { Image, View, useWindowDimensions } from 'react-native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';
import { BtnTitle } from '../../constant/navigationBtn';

import IconChevronRight from '../../components/svg/arrow/IconChevronRight';
import tw from 'twrnc';

interface Props {
  uri: string;
  title: BtnTitle;
  navigatonName: 'ShoppingList' | 'ExpiredFoods' | 'FavoriteFoods';
}

export default function NavigationBtnBox({ uri, title, navigatonName }: Props) {
  const navigation = useNavigation<NavigateProp>();

  const { width } = useWindowDimensions();

  const size = width / 6;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(navigatonName)}
      style={tw`items-center gap-1 justify-center flex-1`}
    >
      <Image source={{ uri }} width={size} height={size} style={tw`mb-9`} />

      <View
        style={tw`py-1 gap-0.5 absolute bottom-0 items-center flex-row pl-2 pr-1 border border-slate-600 bg-white rounded-full`}
      >
        <Text
          fontSize={15}
          style={tw.style(`text-slate-800 -mr-1`, {
            letterSpacing: -0.5,
          })}
        >
          {title}
        </Text>

        <IconChevronRight size={14} />
      </View>
    </TouchableOpacity>
  );
}
