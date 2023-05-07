import { View } from 'react-native';
import { Text } from '../../native-component';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/AntDesign';

interface Props {
  name: string;
  info?: string | number | boolean;
  date?: string;
  favorite?: boolean;
}

export default function InfoBox({ name, date, info, favorite }: Props) {
  return (
    <View
      style={tw`border border-slate-500 justify-between flex-1 p-2 bg-white rounded-md h-20`}
    >
      <Text styletw='text-xs text-slate-600'>{name}</Text>
      {info && <Text styletw='text-base self-end text-slate-700'>{info}</Text>}
      {date && (
        <Text styletw='text-base self-end text-slate-700'>
          {new Date(date || '').toLocaleDateString('ko')}
        </Text>
      )}
      {favorite &&
        (info ? (
          <View style={tw`text-base self-end`}>
            <Icon name='star' size={30} color='gold' />
          </View>
        ) : (
          <View style={tw`text-base self-end`}>
            <Icon name='staro' size={30} color='#aaa' />
          </View>
        ))}
    </View>
  );
}
