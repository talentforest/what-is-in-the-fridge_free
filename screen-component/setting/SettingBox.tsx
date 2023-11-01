import { useNavigation } from '@react-navigation/native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { NavigateProp, RootStackParamList } from '../../navigation/Navigation';
import { GRAY } from '../../constant/colors';

import Icon from '../../components/common/native-component/Icon';
import tw from 'twrnc';
import { View } from 'react-native';

export interface SettingInfo {
  title: string;
  navigate: keyof RootStackParamList | '';
  icon: string;
}

interface Props {
  setting: SettingInfo;
}

export default function SettingBox({ setting }: Props) {
  const navigation = useNavigation<NavigateProp>();

  const { title, navigate, icon } = setting;

  const onNavigatePress = () => {
    if (navigate !== '') {
      navigation.navigate(navigate);
    }
    return;
  };

  return (
    <TouchableOpacity
      disabled={navigate === ''}
      onPress={onNavigatePress}
      style={tw`flex-row items-center justify-between 
      ${title === '버전' ? 'border-t border-slate-300 pt-2' : ''}`}
    >
      <View style={tw`flex-row items-center gap-1`}>
        <Icon
          name={icon}
          color={GRAY}
          size={navigate === 'FridgeSetting' ? 17 : 16}
          type={
            navigate === 'FridgeSetting' ? 'MaterialCommunityIcons' : 'Feather'
          }
        />
        <Text style={tw`text-[17px]`}>{title}</Text>
      </View>

      {navigate === '' &&
        (title === '버전' ? (
          <Text style={tw`text-base text-slate-600`}>1.0.0</Text>
        ) : (
          <Text style={tw`text-sm text-slate-600`}>업데이트 예정</Text>
        ))}
    </TouchableOpacity>
  );
}
