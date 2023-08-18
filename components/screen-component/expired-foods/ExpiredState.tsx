import { Text } from '../../native-component';
import { caution, getColorByFoodLength } from '../../../constant/caution';
import { View } from 'react-native';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';
import MessageBox from '../../common/boxes/MessageBox';

interface Props {
  length: number;
}

export default function ExpiredState({ length }: Props) {
  const getCaution = (num: number) => caution.find((item) => item.max >= num);

  return (
    <View
      style={tw`border-b-2 border-slate-300 -mx-2 pl-11 py-2 flex-row items-center gap-1.5`}
    >
      <MessageBox
        message={getCaution(length)?.guide || ''}
        color={getColorByFoodLength(length)}
      />
    </View>
  );
}
