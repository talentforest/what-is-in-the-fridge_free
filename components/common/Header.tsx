import { View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import { GRAY } from '../../constant/colors';
import tw from 'twrnc';
import Icon from '../native-component/Icon';

interface Props {
  title: '나의 냉장고' | '설정' | '장보기 목록';
  iconName?: 'search';
  onPress?: () => void;
}

export default function Header({ title, iconName, onPress }: Props) {
  return (
    <View style={tw`pb-4 flex-row justify-between items-center`}>
      <Text style={tw`text-slate-700`} fontSize={18}>
        {title}
      </Text>
      {iconName && onPress && (
        <TouchableOpacity onPress={onPress}>
          <Icon name={iconName} type='Ionicons' size={22} color={GRAY} />
        </TouchableOpacity>
      )}
    </View>
  );
}
