import { View } from 'react-native';
import { INDIGO, ORANGE_RED } from '../../../constant/colors';
import { Text } from '../../native-component';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';
import { scaleH } from '../../../util';
import '../../../tailwind.config';

interface Props {
  iconName: string;
  foodLength: number;
  name: string;
}

export default function FridgeInfoBox({ iconName, name, foodLength }: Props) {
  return (
    <View
      style={tw`flex-row flex-1 border border-slate-300 rounded-lg bg-white px-3 h-[${scaleH(
        12
      )}]`}
    >
      <View style={tw`flex-row items-center`}>
        <Icon
          type='MaterialCommunityIcons'
          name={iconName}
          color={name ? INDIGO : ORANGE_RED}
        />

        <Text style={tw`text-slate-600 mx-1`}>{name} : </Text>
      </View>
      <View style={tw`flex-row items-center`}>
        <Text style={tw`text-amber-600`}>{foodLength}</Text>
        <Text style={tw`text-slate-500`}>개</Text>
      </View>
    </View>
  );
}
