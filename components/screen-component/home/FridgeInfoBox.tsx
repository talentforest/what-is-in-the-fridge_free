import { View } from 'react-native';
import { INDIGO, ORANGE_RED } from '../../../constant/colors';
import { Text } from '../../native-component';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';

interface Props {
  iconName: string;
  foodLength: number;
  name: string;
}

export default function FridgeInfoBox({ iconName, name, foodLength }: Props) {
  return (
    <View
      style={tw`flex-1 min-h-12 gap-1 flex-row items-center border border-slate-300 rounded-lg bg-white p-3`}
    >
      <Icon name={iconName} size={18} color={name ? INDIGO : ORANGE_RED} />
      <Text styletw='text-slate-600'>{name} : </Text>
      <Text styletw='text-amber-600'>{foodLength}</Text>
      <Text styletw='text-slate-500'>개</Text>
    </View>
  );
}
