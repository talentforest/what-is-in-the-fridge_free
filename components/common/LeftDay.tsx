import { getRelativeTime } from '../../util';
import { Text } from '../native-component';
import useExpiredFoods from '../../hooks/useExpiredFoods';

interface Props {
  expiredDate: string;
}

function LeftDay({ expiredDate }: Props) {
  const { checkExpired, checkLeftThreeDays } = useExpiredFoods();

  return (
    <Text
      styletw={`${
        checkExpired(expiredDate)
          ? 'text-red-600'
          : checkLeftThreeDays(expiredDate)
          ? 'text-amber-600'
          : 'text-green-600'
      } text-xs`}
    >
      {getRelativeTime(expiredDate)}
    </Text>
  );
}

export default LeftDay;
