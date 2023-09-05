import { Text } from './native-component';
import tw from 'twrnc';

interface Props {
  message: string;
}

export default function EmptySign({ message }: Props) {
  return <Text style={tw`text-sm text-slate-400 text-center`}>{message}</Text>;
}
