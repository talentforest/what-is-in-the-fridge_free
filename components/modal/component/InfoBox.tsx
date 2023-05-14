import { View } from 'react-native';
import { Text } from '../../native-component';
import Icon from 'react-native-vector-icons/AntDesign';
import tw from 'twrnc';
import { INACTIVE_COLOR } from '../../../constant/colors';

interface Props {
  name: string;
  info?: string;
  favorite?: boolean;
}

export default function InfoBox({ name, info, favorite }: Props) {
  return (
    <View
      style={tw`border border-slate-500 justify-between flex-1 p-2 bg-white rounded-md h-20`}
    >
      <Text styletw='text-xs text-slate-600'>{name}</Text>
      <Text styletw='text-base self-end text-indigo-700'>{info}</Text>
      {!info &&
        (favorite ? (
          <View style={tw`text-base self-end`}>
            <Icon name='star' size={30} color='gold' />
          </View>
        ) : (
          <View style={tw`text-base self-end`}>
            <Icon name='staro' size={30} color={INACTIVE_COLOR} />
          </View>
        ))}
    </View>
  );
}
