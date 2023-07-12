import { Text } from '../../native-component';
import { caution, getColorByFoodLength } from '../../../constant/caution';
import tw from 'twrnc';

interface Props {
  length: number;
}

export default function ExpiredState({ length }: Props) {
  const getCaution = (num: number) => caution.find((item) => item.max >= num);

  return (
    <Text style={tw`${getColorByFoodLength(length)} pt-3 pb-1`} fontSize={12}>
      {getCaution(length)?.guide}
    </Text>
  );
}
