import { getLeftDays, getRelativeDate } from '../../util';
import { Text } from '../native-component';

interface Props {
  expiredDate: string;
}

export default function LeftDay({ expiredDate }: Props) {
  const leftDays = getLeftDays(expiredDate);

  return (
    <Text
      styletw={`${0 > leftDays ? 'text-red-600' : 'text-yellow-600'} text-xs`}
    >
      {leftDays === 0 ? '오늘' : getRelativeDate(leftDays)}
    </Text>
  );
}
