import { useNavigation } from '@react-navigation/native';
import { DEEP_GRAY } from '../../constant/colors';
import { TouchableOpacity } from '../common/native-component';

import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  type?: 'MaterialCommunityIcons' | 'Feather';
  iconName: string;
  size: number;
  onPress?: () => void;
  backBtn?: boolean;
}

export default function HeaderBtn({
  iconName,
  onPress,
  type = 'Feather',
  size,
  backBtn,
}: Props) {
  const navigation = useNavigation();

  const onBtnPress = () => {
    if (backBtn) return navigation.goBack();
    if (onPress) return onPress();
  };

  return (
    <TouchableOpacity
      onPress={onBtnPress}
      style={tw`px-${backBtn ? 2 : 4} py-2`}
    >
      <Icon name={iconName} type={type} size={size} color={DEEP_GRAY} />
    </TouchableOpacity>
  );
}
