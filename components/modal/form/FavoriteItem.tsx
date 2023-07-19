import { View } from 'react-native';
import CheckBoxBtn from './CheckBoxItem';
import tw from 'twrnc';
import { Text } from '../../native-component';
import Icon from '../../native-component/Icon';
import { DEEP_YELLOW } from '../../../constant/colors';

interface Props {
  favorite: boolean;
  changeInfo: (newInfo: { [key: string]: boolean }) => void;
}

export default function FavoriteItem({ favorite, changeInfo }: Props) {
  return (
    <View style={tw`gap-2`}>
      <View style={tw`flex-1 gap-4 flex-row mt-2`}>
        <CheckBoxBtn
          title='맞아요'
          checked={favorite}
          onPress={() => {
            changeInfo({ favorite: true });
          }}
        />
        <CheckBoxBtn
          title='아니에요'
          checked={!favorite}
          onPress={() => {
            changeInfo({ favorite: false });
          }}
        />
      </View>
      {favorite && (
        <View style={tw`flex-row items-center gap-0.5`}>
          <Icon
            type='MaterialCommunityIcons'
            name='information'
            color={DEEP_YELLOW}
            size={14}
          />
          <Text style={tw`text-amber-600`}>
            자주 먹는 식료품 목록에 추가됩니다.
          </Text>
        </View>
      )}
    </View>
  );
}
