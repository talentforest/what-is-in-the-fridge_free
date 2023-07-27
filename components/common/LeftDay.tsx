import { getRelativeTime } from '../../util';
import { Text } from '../native-component';
import { useRoute } from '@react-navigation/native';
import useExpiredFoods from '../../hooks/useExpiredFoods';
import tw from 'twrnc';

interface Props {
  expiredDate: string;
}

function LeftDay({ expiredDate }: Props) {
  const route = useRoute();
  const { checkExpired, checkLeftThreeDays } = useExpiredFoods();

  return (
    <Text
      style={tw`${
        checkExpired(expiredDate)
          ? 'text-red-600'
          : checkLeftThreeDays(expiredDate)
          ? 'text-amber-600'
          : 'text-green-600'
      } ml-1`}
      fontSize={route.name === 'ExpiredFoods' ? 14 : 12}
    >
      {getRelativeTime(expiredDate)}
    </Text>
  );
}

export default LeftDay;
