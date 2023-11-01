import { Image, View, useWindowDimensions } from 'react-native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { GRAY } from '../../constant/colors';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';
import { BtnTitle } from '../../constant/navigationBtn';
import Icon from '../../components/common/native-component/Icon';
import tw from 'twrnc';
import { PlatformIOS } from '../../constant/statusBarHeight';

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
      <Image source={{ uri }} width={size} height={size} style={tw`mb-7`} />

      <View
        style={tw`h-8 absolute bottom-0 items-center flex-row pl-2 pr-0.5 border border-slate-600 bg-white rounded-2xl`}
      >
        <Text
          style={tw.style(`text-slate-800 text-base`, {
            letterSpacing: -0.5,
          })}
        >
          {title}
        </Text>
        <Icon name='chevron-right' type='Feather' size={13} color={GRAY} />
      </View>
    </TouchableOpacity>
  );
}
