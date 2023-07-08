import { FontGmarketSansBold } from '../../constant/fonts';
import { Text, TouchableOpacity } from '../native-component';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp, RootStackParamList } from '../../navigation/Navigation';
import Icon from '../native-component/Icon';
import tw from 'twrnc';
import { RootTabParamList } from '../../navigation/MyTabs';

interface Props {
  title: string;
  iconName?: string;
  bgColor?: string;
  route: keyof RootTabParamList | keyof RootStackParamList;
}

export default function RoundedFullBtn({
  title,
  iconName,
  bgColor = 'bg-amber-500',
  route,
}: Props) {
  const navigate = useNavigation<NavigateProp>();
  return (
    <TouchableOpacity
      onPress={() => navigate.navigate(route)}
      style={tw`${bgColor} border border-amber-400 flex-row items-center self-end p-2 ${
        iconName ? 'pl-4' : 'px-3'
      } rounded-full `}
    >
      <Text
        style={tw.style(`text-white text-[${12}px]`, {
          ...FontGmarketSansBold,
        })}
      >
        {title}
      </Text>
      {iconName && (
        <Icon name={iconName} type='MaterialCommunityIcons' color='#fff' />
      )}
    </TouchableOpacity>
  );
}
