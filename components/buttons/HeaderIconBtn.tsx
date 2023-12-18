import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from '../common/native-component';
import { NavigateProp } from '../../navigation/Navigation';
import { View, useWindowDimensions } from 'react-native';
import { GRAY, YELLOW } from '../../constant/colors';

import Icon from '../common/native-component/Icon';
import IconChevronLeft from '../svg/arrow/IconChevronLeft';
import IconGear from '../svg/IconGear';
import tw from 'twrnc';

interface Props {
  btn: 'goBack' | 'setting' | 'goFavoriteList' | 'showList';
  onPress?: () => void;
}

export default function HeaderIconBtn({ btn, onPress }: Props) {
  const navigation = useNavigation<NavigateProp>();

  const onBackBtnPress = () => navigation.goBack();

  const onSettingBtnPress = () => navigation.navigate('Setting');

  const onTagBtnPress = () => navigation.navigate('FavoriteFoods');

  const { height } = useWindowDimensions();

  const iconSize = height > 900 ? 30 : 21;

  return (
    <View style={tw`p-2`}>
      {btn === 'goBack' && (
        <TouchableOpacity onPress={onBackBtnPress}>
          <IconChevronLeft size={iconSize} />
        </TouchableOpacity>
      )}

      {btn === 'setting' && (
        <TouchableOpacity onPress={onSettingBtnPress}>
          <IconGear size={iconSize} />
        </TouchableOpacity>
      )}

      {btn === 'goFavoriteList' && (
        <TouchableOpacity onPress={onTagBtnPress}>
          <Icon
            name='star-fill'
            type='Octicons'
            size={iconSize - 3}
            color={YELLOW}
          />
        </TouchableOpacity>
      )}

      {btn === 'showList' && (
        <TouchableOpacity onPress={onPress}>
          <Icon
            name='list-unordered'
            type='Octicons'
            size={iconSize - 6}
            color={GRAY}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
