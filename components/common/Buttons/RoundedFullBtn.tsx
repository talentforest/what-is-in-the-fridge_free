import { Text, TouchableOpacity } from '../../native-component';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp, RouteName } from '../../../navigation/Navigation';
import { scaleFont } from '../../../util';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

interface Props {
  title: string;
  iconName?: string;
  route: RouteName;
}

export default function RoundedFullBtn({ title, iconName, route }: Props) {
  const navigate = useNavigation<NavigateProp>();

  return (
    <TouchableOpacity
      onPress={() => navigate.navigate(route)}
      style={tw`flex-row items-center self-end pl-5 pt-5`}
    >
      <Text style={tw`text-white text-[${scaleFont(13)}px] font-bold`}>
        {title}
      </Text>

      {iconName && (
        <Icon
          name={iconName}
          type='MaterialCommunityIcons'
          color='#fff'
          size={20}
        />
      )}
    </TouchableOpacity>
  );
}
