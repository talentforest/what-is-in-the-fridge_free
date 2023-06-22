import { View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import { DEEP_INDIGO } from '../../constant/colors';
import { useRoute } from '@react-navigation/native';
import tw from 'twrnc';
import Icon from '../native-component/Icon';

interface Props {
  title: '나의 냉장고' | '설정' | '장보기 목록';
  iconName?: 'search' | 'heart-plus';
  onPress?: () => void;
}

export default function Header({ title, iconName, onPress }: Props) {
  const route = useRoute();

  return (
    <View style={tw`pb-4 flex-row justify-between items-center`}>
      <Text style={tw`text-slate-700`} fontSize={18}>
        {title}
      </Text>
      {iconName && onPress && (
        <TouchableOpacity onPress={onPress}>
          <Icon
            name={iconName}
            type={iconName === 'search' ? 'Ionicons' : 'MaterialCommunityIcons'}
            size={22}
            color={DEEP_INDIGO}
          />
        </TouchableOpacity>
      )}
      {route.name === 'Setting' && (
        <Text style={tw`text-slate-600`} fontSize={13}>
          v 0.0.0
        </Text>
      )}
    </View>
  );
}
