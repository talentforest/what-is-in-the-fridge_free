import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from '../common/native-component';
import { NavigateProp } from '../../navigation/Navigation';
import { useWindowDimensions } from 'react-native';
import { LIGHT_GRAY, YELLOW } from '../../constant/colors';

import Icon from '../common/native-component/Icon';
import IconChevronLeft from '../svg/arrow/IconChevronLeft';
import IconGear from '../svg/IconGear';
import tw from 'twrnc';

interface Props {
  iconName: string;
  iconSize?: number;
  onPress?: () => void;
}

export default function HeaderIconBtn({
  iconName,
  iconSize = 18,
  onPress,
}: Props) {
  const navigation = useNavigation<NavigateProp>();

  const onBackBtnPress = () => navigation.goBack();

  const onSettingBtnPress = () => navigation.navigate('Setting');

  const onTagBtnPress = () => navigation.navigate('FavoriteFoods');

  const { height } = useWindowDimensions();

  const onIconPress =
    iconName === 'goBack'
      ? onBackBtnPress
      : iconName === 'setting'
      ? onSettingBtnPress
      : iconName === 'star-fill'
      ? onTagBtnPress
      : onPress;

  const size = height > 900 ? iconSize + 12 : iconSize;

  return (
    <TouchableOpacity onPress={onIconPress} style={tw`p-2`}>
      {iconName === 'goBack' ? (
        <IconChevronLeft size={size} />
      ) : iconName === 'setting' ? (
        <IconGear size={size} />
      ) : (
        <Icon
          name={iconName}
          type='Octicons'
          size={size}
          color={iconName === 'star-fill' ? YELLOW : LIGHT_GRAY}
        />
      )}
    </TouchableOpacity>
  );
}
