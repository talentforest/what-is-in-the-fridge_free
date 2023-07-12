import { View } from 'react-native';
import { Text } from '../native-component';
import { INACTIVE_COLOR, INDIGO } from '../../constant/colors';
import tw from 'twrnc';
import Icon from '../native-component/Icon';

export default function ExistFoodMark({ exist }: { exist: boolean }) {
  return (
    <>
      <View style={tw`flex-row gap-0.5 items-center`}>
        <Icon
          type='MaterialCommunityIcons'
          name={exist ? 'fridge' : 'fridge-off'}
          size={15}
          color={exist ? INDIGO : INACTIVE_COLOR}
        />
        <Text style={tw`${exist ? 'text-indigo-500' : 'text-slate-400'}`}>
          {exist ? '있음' : '없음'}
        </Text>
      </View>
    </>
  );
}
