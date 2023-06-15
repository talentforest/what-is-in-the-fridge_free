import { getRelativeTime } from '../../util';
import { Text } from '../native-component';
import useExpiredFoods from '../../hooks/useExpiredFoods';
import tw from 'twrnc';

interface Props {
  expiredDate: string;
  fontSize: number;
}

function LeftDay({ expiredDate, fontSize }: Props) {
  const { checkExpired, checkLeftThreeDays } = useExpiredFoods();

  return (
    <Text
      style={tw`${
        checkExpired(expiredDate)
          ? 'text-red-600'
          : checkLeftThreeDays(expiredDate)
          ? 'text-amber-600'
          : 'text-green-600'
      }`}
      fontSize={fontSize}
    >
      {getRelativeTime(expiredDate)}
    </Text>
  );
}

export default LeftDay;
