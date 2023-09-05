import { expired, getRelativeTime, leftThreeDays } from '../../util';
import { Text } from './native-component';
import tw from 'twrnc';

interface Props {
  expiredDate: string;
}

function LeftDay({ expiredDate }: Props) {
  const getColor = expired(expiredDate)
    ? 'text-red-600'
    : leftThreeDays(expiredDate)
    ? 'text-amber-700'
    : 'text-green-600';

  return (
    <Text style={tw`${getColor}  ml-1 text-sm`}>
      {getRelativeTime(expiredDate)}
    </Text>
  );
}

export default LeftDay;
