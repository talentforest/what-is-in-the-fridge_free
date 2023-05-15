import { View } from 'react-native';
import { Text } from '../../native-component';
import { INACTIVE_COLOR } from '../../../constant/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import tw from 'twrnc';

interface Props {
  name: string;
  info?: string;
  favorite?: boolean;
}

export default function InfoBox({ name, info, favorite }: Props) {
  return (
    <View
      style={tw`border border-slate-500 justify-between flex-1 p-2 bg-slate-100 rounded-md`}
    >
      <Text styletw='text-xs text-slate-600'>{name}</Text>
      {info && <Text styletw='self-end text-indigo-600 text-sm'>{info}</Text>}
      {!info && (
        <View style={tw`self-end`}>
          {favorite ? (
            <Icon name='star' size={30} color='gold' />
          ) : (
            <Icon name='staro' size={30} color={INACTIVE_COLOR} />
          )}
        </View>
      )}
    </View>
  );
}
