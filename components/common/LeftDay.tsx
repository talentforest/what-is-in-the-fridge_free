import { getLeftDays } from '../../util';
import { Text } from '../native-component';

interface Props {
  expiredDate: string;
}

export default function LeftDay({ expiredDate }: Props) {
  return (
    <Text
      styletw={`${
        0 > getLeftDays(expiredDate) ? 'text-red-600' : 'text-amber-600'
      }`}
    >
      {getLeftDays(expiredDate)}일
    </Text>
  );
}
