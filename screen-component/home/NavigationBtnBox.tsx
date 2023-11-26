import { Image, View, useWindowDimensions } from 'react-native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';
import { NavigationBtns } from '../../constant/navigationBtn';
import { shadowStyle } from '../../constant/shadowStyle';
import { BLUE, GRAY, INDIGO } from '../../constant/colors';

import IconChevronRight from '../../components/svg/arrow/IconChevronRight';
import tw from 'twrnc';

interface Props {
  uri: string;
  btn: NavigationBtns;
}

export default function NavigationBtnBox({ uri, btn }: Props) {
  const navigation = useNavigation<NavigateProp>();

  const { title, navigationName, color } = btn;

  const { width } = useWindowDimensions();

  const size = width / 6;

  const onNavigatePress = () => navigation.navigate(navigationName);

  return (
    <TouchableOpacity
      onPress={onNavigatePress}
      style={tw`items-center gap-1 justify-center flex-1`}
    >
      <View style={tw.style(`bg-white mb-5 rounded-full`, shadowStyle(3))}>
        <View style={tw`bg-white p-4 rounded-full`}>
          <Image source={{ uri }} width={size} height={size} />
        </View>
      </View>
      <View
        style={tw.style(
          `flex-row absolute border border-slate-300 bottom-0 py-1.5 pl-2 pr-0.5 items-center bg-white rounded-xl`,
          shadowStyle(3)
        )}
      >
        <Text
          fontSize={15}
          style={tw.style(`text-${color}-600 text-center`, {
            letterSpacing: -1,
          })}
        >
          {title}
        </Text>

        <IconChevronRight
          size={15}
          color={
            color === 'blue'
              ? BLUE
              : color === 'gray'
              ? GRAY
              : color === 'indigo'
              ? INDIGO
              : color
          }
        />
      </View>
    </TouchableOpacity>
  );
}
