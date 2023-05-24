import { Text, TouchableOpacity } from '../../native-component';
import { View } from 'react-native';
import { INACTIVE_COLOR, ORANGE_RED } from '../../../constant/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import CheckBoxBtn from './CheckBoxBtn';

interface Props {
  favorite: boolean;
  changeInfo: (newInfo: { [key: string]: boolean }) => void;
}

export default function FavoriteItem({ favorite, changeInfo }: Props) {
  return (
    <View style={tw`gap-4 mt-1 flex-row`}>
      <CheckBoxBtn
        title='맞아요'
        check={favorite}
        onPress={() => {
          changeInfo({ favorite: true });
        }}
      />
      <CheckBoxBtn
        title='아니에요'
        check={!favorite}
        onPress={() => {
          changeInfo({ favorite: false });
        }}
      />
    </View>
  );
}
