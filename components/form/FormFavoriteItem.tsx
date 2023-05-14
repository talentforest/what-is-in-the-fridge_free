import { View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import { INACTIVE_COLOR } from '../../constant/colors';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/AntDesign';

interface Props {
  favorite: boolean;
  changeFoodInfo: (newInfo: { [key: string]: boolean }) => void;
}

export default function FormFavoriteItem({ favorite, changeFoodInfo }: Props) {
  return (
    <View
      style={tw`bg-indigo-50 p-2 flex-1 justify-between border rounded-lg border-slate-400`}
    >
      <Text styletw='mb-2 text-indigo-500 text-xs'>자주 먹는 식료품</Text>
      <View style={tw`flex-1 justify-end`}>
        {favorite ? (
          <TouchableOpacity
            style={tw`justify-center flex-1 items-center`}
            onPress={() => changeFoodInfo({ favorite: false })}
          >
            <Icon name='star' size={40} color='gold' />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={tw`justify-center flex-1 items-center`}
            onPress={() => changeFoodInfo({ favorite: true })}
          >
            <Icon name='staro' size={40} color={INACTIVE_COLOR} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
