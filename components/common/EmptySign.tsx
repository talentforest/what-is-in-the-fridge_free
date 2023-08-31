import { Text } from './native-component';
import { BoxColor } from '../../screen-component/home/EntranceBox';
import tw from 'twrnc';

interface Props {
  message: string;
  color: BoxColor;
}

export default function EmptySign({ message, color }: Props) {
  return (
    <Text style={tw`text-sm text-${color}-400 text-center`}>{message}</Text>
  );
}
