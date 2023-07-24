import { View } from 'react-native';
import CheckBoxBtn from './CheckBoxItem';
import tw from 'twrnc';
import { Text } from '../../native-component';
import Icon from '../../native-component/Icon';
import { DEEP_YELLOW } from '../../../constant/colors';
import { scaleH } from '../../../util';

interface Props {
  favorite: boolean;
  changeInfo: (newInfo: { [key: string]: boolean }) => void;
}

export default function FavoriteItem({ favorite, changeInfo }: Props) {
  return (
    <View style={tw`gap-4 mt-2`}>
      <View style={tw`flex-row items-center gap-2`}>
        <CheckBoxBtn
          title='맞아요'
          checked={favorite}
          onPress={() => {
            changeInfo({ favorite: true });
          }}
        />
        {favorite && (
          <View style={tw`flex-row items-center gap-1`}>
            <Icon
              name='information'
              type='MaterialCommunityIcons'
              size={14}
              color={DEEP_YELLOW}
            />
            <Text style={tw`text-amber-600`} fontSize={12}>
              자주 먹는 식료품 목록에 추가됩니다.
            </Text>
          </View>
        )}
      </View>
      <CheckBoxBtn
        title='아니에요'
        checked={!favorite}
        onPress={() => {
          changeInfo({ favorite: false });
        }}
      />
    </View>
  );
}
