import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from '../common/native-component';
import { NavigateProp } from '../../navigation/Navigation';
import IconChevronLeft from '../svg/arrow/IconChevronLeft';
import IconGear from '../svg/IconGear';
import IconFridge from '../svg/IconFridge';
import tw from 'twrnc';
import { View, useWindowDimensions } from 'react-native';
import { GRAY } from '../../constant/colors';
import Icon from '../common/native-component/Icon';

interface Props {
  btn: 'goBack' | 'setting' | 'tag';
}

export default function HeaderIconBtn({ btn }: Props) {
  const navigation = useNavigation<NavigateProp>();

  const onBackBtnPress = () => navigation.goBack();

  const onSettingBtnPress = () => navigation.navigate('Setting');

  const onTagBtnPress = () => navigation.navigate('FavoriteFoods');

  const { height } = useWindowDimensions();

  const iconSize = height > 900 ? 30 : 21;

  return (
    <View style={tw`p-2`}>
      {btn === 'goBack' ? (
        <TouchableOpacity onPress={onBackBtnPress}>
          <IconChevronLeft size={iconSize} />
        </TouchableOpacity>
      ) : btn === 'setting' ? (
        <TouchableOpacity onPress={onSettingBtnPress}>
          <IconGear size={iconSize} />
        </TouchableOpacity>
      ) : btn === 'tag' ? (
        <TouchableOpacity onPress={onTagBtnPress}>
          <Icon
            name='tag-heart-outline'
            type='MaterialCommunityIcons'
            size={iconSize}
            color={GRAY}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
