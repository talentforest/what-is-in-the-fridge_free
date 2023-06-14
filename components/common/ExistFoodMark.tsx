import { View } from 'react-native';
import { Text } from '../native-component';
import { INACTIVE_COLOR, INDIGO } from '../../constant/colors';
import { useRoute } from '@react-navigation/native';
import tw from 'twrnc';
import Icon from '../native-component/Icon';

export default function ExistFoodMark({ exist }: { exist: boolean }) {
  const route = useRoute();

  return (
    <>
      <View style={tw`flex-row gap-0.5 items-center`}>
        <Icon
          type='MaterialCommunityIcons'
          name={exist ? 'fridge-outline' : 'fridge-off-outline'}
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
